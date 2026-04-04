from __future__ import annotations

from copy import deepcopy
from datetime import UTC, datetime, timedelta
from itertools import count
from uuid import uuid4

from seed import get_seed_data

from backend.integrations.razorpay import initiate_payout
from backend.services.fraud_detector import evaluate_fraud
from backend.services.payout_engine import calculate_payout

_EVENT_COUNTER = count(1)
_CLAIM_COUNTER = count(1)
_PAYOUT_COUNTER = count(1)


def _now() -> datetime:
    return datetime.now(UTC)


def _iso_to_datetime(value: str | None) -> datetime | None:
    if not value:
        return None
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def _bootstrap_state() -> dict:
    data = deepcopy(get_seed_data())
    data["fraud_queue"] = []
    data["simulated_events"] = []
    return data


_STATE = _bootstrap_state()


def _resolve_worker_id(worker_id: str) -> str:
    if worker_id == "me":
        return _STATE["workers"][0]["id"]
    return worker_id


def _get_worker_record(worker_id: str) -> dict | None:
    resolved = _resolve_worker_id(worker_id)
    return next((worker for worker in _STATE["workers"] if worker["id"] == resolved), None)


def _get_policy_record(worker_id: str) -> dict | None:
    resolved = _resolve_worker_id(worker_id)
    return next((policy for policy in _STATE["policies"] if policy["worker_id"] == resolved), None)


def register_worker(worker_payload: dict, quote: dict) -> dict:
    existing_worker = next(
        (worker for worker in _STATE["workers"] if worker["upi_id"] == worker_payload["upi_id"]),
        None,
    )
    created_at = _now().isoformat()

    worker_record = {
        "id": existing_worker["id"] if existing_worker else f"wrk_{uuid4().hex[:10]}",
        "name": worker_payload["name"],
        "phone": worker_payload.get("phone"),
        "platform": worker_payload["platform"],
        "city": worker_payload["city"],
        "zone": worker_payload["zone"],
        "shift_start": worker_payload["shift_start"],
        "shift_end": worker_payload["shift_end"],
        "working_days": worker_payload["working_days"],
        "weekly_earnings": worker_payload["weekly_earnings"],
        "upi_id": worker_payload["upi_id"],
        "upi_verified": True,
        "role": worker_payload.get("role", "worker"),
        "risk_score": quote["risk_score"],
        "risk_tier": quote["risk_tier"],
        "verification_tier": 2,
        "device_id": existing_worker.get("device_id") if existing_worker else f"dev_{uuid4().hex[:8]}",
        "created_at": created_at,
    }

    if existing_worker:
        _STATE["workers"] = [worker for worker in _STATE["workers"] if worker["id"] != existing_worker["id"]]
        _STATE["policies"] = [policy for policy in _STATE["policies"] if policy["worker_id"] != existing_worker["id"]]

    _STATE["workers"].insert(0, worker_record)

    week_start = _now().date()
    week_start = week_start - timedelta(days=week_start.weekday())
    week_end = week_start + timedelta(days=6)

    policy_record = {
        "id": f"pol_{uuid4().hex[:10]}",
        "worker_id": worker_record["id"],
        "week_start": week_start.isoformat(),
        "week_end": week_end.isoformat(),
        "premium_paid": quote["weekly_premium"],
        "max_payout": quote["max_payout"],
        "coverage_pct": quote["coverage_pct"],
        "verification_tier": 2,
        "status": "ACTIVE",
        "created_at": created_at,
    }
    _STATE["policies"].insert(0, policy_record)

    return deepcopy(worker_record)


def _event_label(event_type: str) -> str:
    label_map = {
        "HEAVY_RAIN": "Heavy Rain",
        "SEVERE_AQI": "Severe AQI",
        "LOCAL_CURFEW": "Local Curfew",
    }
    return label_map.get(event_type, event_type.replace("_", " ").title())


def _event_meta(event_type: str) -> tuple[float, str]:
    meta = {
        "HEAVY_RAIN": (62.4, "openweather"),
        "SEVERE_AQI": (328.0, "openaq"),
        "LOCAL_CURFEW": (0.82, "newsapi"),
    }
    return meta.get(event_type, (50.0, "oracle"))


def _advance_pending_claims() -> None:
    now = _now()
    for claim in _STATE["claims"]:
        process_after = _iso_to_datetime(claim.get("process_after"))
        if claim.get("status") == "PROCESSING" and process_after and now >= process_after:
            claim["status"] = "PAID"
            claim["fraud_verdict"] = claim.get("fraud_verdict") or "CLEAN"
            claim["paid_at"] = now.isoformat()
            claim["process_after"] = None

            payout = next((item for item in _STATE["payouts"] if item["claim_id"] == claim["id"]), None)
            if payout:
                payout["status"] = "COMPLETED"
                payout["completed_at"] = now.isoformat()


def get_worker(worker_id: str) -> dict | None:
    worker = _get_worker_record(worker_id)
    return deepcopy(worker) if worker else None


def get_policy_lookup(worker_id: str) -> dict:
    policy = _get_policy_record(worker_id)
    resolved = _resolve_worker_id(worker_id)
    history = [item for item in _STATE["policies"] if item["worker_id"] == resolved]
    return {
        "worker_id": resolved,
        "policy": deepcopy(policy) if policy else None,
        "history": deepcopy(history),
    }


def get_claims(worker_id: str) -> list[dict]:
    _advance_pending_claims()
    resolved = _resolve_worker_id(worker_id)
    claims = [claim for claim in _STATE["claims"] if claim["worker_id"] == resolved]
    claims.sort(key=lambda item: item.get("paid_at") or item.get("created_at") or "", reverse=True)
    return deepcopy(claims)


def get_active_events() -> list[dict]:
    _advance_pending_claims()
    events = [event for event in _STATE["disruption_events"] if event["status"] == "ACTIVE"]
    events.sort(key=lambda item: item.get("started_at") or "", reverse=True)
    return deepcopy(events)


def get_pool_health() -> dict:
    _advance_pending_claims()
    premium_collected = sum(policy["premium_paid"] for policy in _STATE["policies"])
    payouts_issued = sum(
        payout["amount"] for payout in _STATE["payouts"] if payout["status"] in {"COMPLETED", "PAID", "processed"}
    )
    reserve_buffer = max(premium_collected * 0.55, premium_collected - payouts_issued)
    loss_ratio = round((payouts_issued / premium_collected) * 100, 1) if premium_collected else 0.0
    return {
        "premium_collected": round(premium_collected, 2),
        "payouts_issued": round(payouts_issued, 2),
        "loss_ratio": loss_ratio,
        "reserve_buffer": round(reserve_buffer, 2),
        "active_workers": len([worker for worker in _STATE["workers"] if worker["role"] == "worker"]),
        "solvent": reserve_buffer >= payouts_issued * 0.4,
    }


def get_fraud_queue() -> list[dict]:
    queue = []
    for claim in _STATE["claims"]:
        if claim.get("status") not in {"UNDER_REVIEW", "REJECTED"}:
            continue

        worker = _get_worker_record(claim["worker_id"])
        queue.append(
            {
                "id": claim["id"],
                "workerId": claim["worker_id"],
                "workerName": worker["name"] if worker else "Unknown Worker",
                "type": claim.get("type", "CLAIM_REVIEW"),
                "score": claim.get("fraud_score", 0),
                "signals": claim.get("fraud_signals", []),
                "confidence": round((claim.get("fraud_score", 0) / 100), 2),
                "status": claim["status"],
            }
        )

    queue.extend(_STATE["fraud_queue"])
    return deepcopy(queue)


def get_payout_ledger() -> list[dict]:
    _advance_pending_claims()
    ledger = []
    for payout in sorted(_STATE["payouts"], key=lambda item: item.get("initiated_at") or "", reverse=True):
        claim = next((item for item in _STATE["claims"] if item["id"] == payout["claim_id"]), None)
        ledger.append(
            {
                "id": payout["id"],
                "workerId": payout["worker_id"],
                "eventType": claim.get("type", "Disruption") if claim else "Disruption",
                "amount": payout["amount"],
                "utr": payout.get("razorpay_ref") or payout["id"],
                "date": (payout.get("completed_at") or payout.get("initiated_at") or "")[:10],
                "status": "PAID" if payout["status"] == "COMPLETED" else payout["status"],
            }
        )
    return ledger


def update_fraud_verdict(claim_id: str, verdict: str) -> dict:
    for claim in _STATE["claims"]:
        if claim["id"] != claim_id:
            continue
        claim["fraud_verdict"] = verdict
        if verdict in {"CLEAN", "APPROVED"}:
            claim["status"] = "PAID"
            claim["paid_at"] = _now().isoformat()
        elif verdict in {"REJECTED", "AUTO_REJECT"}:
            claim["status"] = "REJECTED"
        return deepcopy(claim)
    return {"id": claim_id, "fraud_verdict": verdict}


def simulate_event(event_type: str, city: str, zones: list[str], severity: str) -> dict:
    _advance_pending_claims()
    normalized_type = event_type.upper().replace(" ", "_")
    now = _now()
    trigger_value, trigger_source = _event_meta(normalized_type)

    event = {
        "id": f"evt_sim_{next(_EVENT_COUNTER):03d}",
        "event_type": normalized_type,
        "city": city,
        "zones": zones,
        "trigger_value": trigger_value,
        "trigger_source": trigger_source,
        "started_at": now.isoformat(),
        "ended_at": None,
        "workers_affected": 0,
        "total_payout": 0.0,
        "status": "ACTIVE",
        "severity": severity.upper(),
    }

    _STATE["disruption_events"].insert(0, event)

    affected_workers = [
        worker
        for worker in _STATE["workers"]
        if worker["role"] == "worker" and worker["city"].lower() == city.lower() and worker["zone"] in zones
    ]

    if not affected_workers:
        city_workers = [
            worker
            for worker in _STATE["workers"]
            if worker["role"] == "worker" and worker["city"].lower() == city.lower()
        ]
        if city_workers:
            affected_workers = [city_workers[0]]

    new_claims = []

    for index, worker in enumerate(affected_workers):
        policy = _get_policy_record(worker["id"])
        prior_payouts = sum(
            claim["payout_amount"]
            for claim in _STATE["claims"]
            if claim["worker_id"] == worker["id"] and claim.get("status") == "PAID"
        )

        payout_result = calculate_payout(
            {
                "shift_start": worker["shift_start"],
                "shift_end": worker["shift_end"],
                "disruption_start": "14:00",
                "disruption_end": "19:00",
                "weekly_earnings": worker["weekly_earnings"],
                "working_days": worker["working_days"],
                "coverage_pct": policy["coverage_pct"] if policy else 0.75,
                "max_payout": policy["max_payout"] if policy else 3500.0,
                "current_week_payouts_total": prior_payouts,
            }
        )

        fraud_input = {
            "gps_matches_zone": index == 0,
            "app_active_before": True,
            "worker_moving": True,
            "account_age_days": 45 if index == 0 else 4,
            "device_has_duplicate_accounts": index > 0,
            "recent_claims_count": 1 if index == 0 else 4,
        }
        fraud_result = evaluate_fraud(fraud_input)

        if index == 0:
            fraud_result = {"fraud_score": 12, "signals": [], "verdict": "CLEAN"}

        claim_status = "PROCESSING"
        process_after = (now + timedelta(seconds=5)).isoformat()
        if fraud_result["verdict"] == "HARD_FLAG":
            claim_status = "UNDER_REVIEW"
            process_after = None
        elif fraud_result["verdict"] == "AUTO_REJECT":
            claim_status = "REJECTED"
            process_after = None

        claim = {
            "id": f"CLM_SIM_{next(_CLAIM_COUNTER):03d}",
            "worker_id": worker["id"],
            "policy_id": policy["id"] if policy else "",
            "disruption_id": event["id"],
            "shift_overlap_hours": payout_result["overlap_hours"],
            "lost_income": payout_result["lost_income"],
            "payout_amount": payout_result["payout"],
            "fraud_score": fraud_result["fraud_score"],
            "fraud_signals": fraud_result["signals"],
            "fraud_verdict": fraud_result["verdict"],
            "status": claim_status,
            "reviewer_action": None,
            "created_at": now.isoformat(),
            "paid_at": None,
            "process_after": process_after,
            "type": _event_label(normalized_type),
            "date": now.date().isoformat(),
            "amount": payout_result["payout"],
        }
        _STATE["claims"].insert(0, claim)
        new_claims.append(claim)

        payout_response = initiate_payout(worker["upi_id"], payout_result["payout"], claim["id"])
        payout = {
            "id": f"PAY_SIM_{next(_PAYOUT_COUNTER):03d}",
            "claim_id": claim["id"],
            "worker_id": worker["id"],
            "upi_id": worker["upi_id"],
            "amount": payout_result["payout"],
            "razorpay_ref": payout_response["payout_id"],
            "status": (
                "PENDING" if claim_status == "PROCESSING" else "HELD" if claim_status == "UNDER_REVIEW" else "REJECTED"
            ),
            "initiated_at": now.isoformat(),
            "completed_at": None,
        }
        _STATE["payouts"].insert(0, payout)

    event["workers_affected"] = len(affected_workers)
    event["total_payout"] = round(sum(claim["payout_amount"] for claim in new_claims), 2)

    return {
        "status": "processed",
        "message": (
            f"{_event_label(normalized_type)} simulated for {city}. {len(new_claims)} claim(s) created."
            if new_claims
            else (
                f"{_event_label(normalized_type)} simulated for {city}, "
                "but no active worker matched the selected zone."
            )
        ),
        "event": deepcopy(event),
        "claims_created": len(new_claims),
    }
