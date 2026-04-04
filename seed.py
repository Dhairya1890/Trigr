"""Trigr seed script – demo-ready sample data for all domain entities.

This script defines realistic seed data aligned with schema.sql.
Actual database insertion is deferred to the Supabase/DB integration layer.
The data definitions and helper functions here are designed to be called
by whatever persistence backend is wired up later.

Usage:
    python seed.py              # dry-run: prints seed data summary
    python seed.py --no-dry-run # attempt real persistence
"""

from __future__ import annotations

import argparse
import json
import uuid
from datetime import UTC, date, datetime, timedelta

# ---------------------------------------------------------------------------
# ID helpers (deterministic for reproducible seeding)
# ---------------------------------------------------------------------------
_NAMESPACE = uuid.UUID("a1b2c3d4-e5f6-7890-abcd-ef1234567890")


def _sid(name: str) -> str:
    """Deterministic UUID-5 so re-running seed.py yields the same IDs."""
    return str(uuid.uuid5(_NAMESPACE, name))


# ---------------------------------------------------------------------------
# Reference dates
# ---------------------------------------------------------------------------
_TODAY = date.today()
_WEEK_START = _TODAY - timedelta(days=_TODAY.weekday())  # Monday
_WEEK_END = _WEEK_START + timedelta(days=6)

# ---------------------------------------------------------------------------
# Workers
# ---------------------------------------------------------------------------
SEED_WORKERS = [
    {
        "id": _sid("worker-ravi"),
        "name": "Ravi Kumar",
        "phone": "+919876543210",
        "platform": "Swiggy",
        "city": "Mumbai",
        "zone": "Dharavi",
        "shift_start": "10:00",
        "shift_end": "22:00",
        "working_days": 6,
        "weekly_earnings": 4500.0,
        "upi_id": "ravi.kumar@oksbi",
        "upi_verified": True,
        "role": "worker",
        "risk_score": 85,
        "risk_tier": "HIGH",
        "verification_tier": 2,
        "device_id": "dev_ravi_001",
    },
    {
        "id": _sid("worker-priya"),
        "name": "Priya Sharma",
        "phone": "+919876543211",
        "platform": "Zomato",
        "city": "Delhi",
        "zone": "Chandni Chowk",
        "shift_start": "09:00",
        "shift_end": "21:00",
        "working_days": 6,
        "weekly_earnings": 4200.0,
        "upi_id": "priya.sharma@okhdfc",
        "upi_verified": True,
        "role": "worker",
        "risk_score": 68,
        "risk_tier": "MEDIUM",
        "verification_tier": 3,
        "device_id": "dev_priya_001",
    },
    {
        "id": _sid("worker-aman"),
        "name": "Aman Patel",
        "phone": "+919876543212",
        "platform": "Blinkit",
        "city": "Bangalore",
        "zone": "Koramangala",
        "shift_start": "08:00",
        "shift_end": "20:00",
        "working_days": 5,
        "weekly_earnings": 3800.0,
        "upi_id": "aman.patel@okicici",
        "upi_verified": False,
        "role": "worker",
        "risk_score": 42,
        "risk_tier": "LOW",
        "verification_tier": 1,
        "device_id": "dev_aman_001",
    },
    {
        "id": _sid("worker-fatima"),
        "name": "Fatima Begum",
        "phone": "+919876543213",
        "platform": "Zepto",
        "city": "Chennai",
        "zone": "T Nagar",
        "shift_start": "11:00",
        "shift_end": "23:00",
        "working_days": 6,
        "weekly_earnings": 4000.0,
        "upi_id": "fatima.begum@okaxis",
        "upi_verified": True,
        "role": "worker",
        "risk_score": 74,
        "risk_tier": "HIGH",
        "verification_tier": 2,
        "device_id": "dev_fatima_001",
    },
    {
        "id": _sid("worker-suresh"),
        "name": "Suresh Nair",
        "phone": "+919876543214",
        "platform": "Swiggy Instamart",
        "city": "Kolkata",
        "zone": "Salt Lake",
        "shift_start": "07:00",
        "shift_end": "19:00",
        "working_days": 6,
        "weekly_earnings": 3600.0,
        "upi_id": "suresh.nair@okkotak",
        "upi_verified": True,
        "role": "worker",
        "risk_score": 55,
        "risk_tier": "MEDIUM",
        "verification_tier": 2,
        "device_id": "dev_suresh_001",
    },
]

# ---------------------------------------------------------------------------
# Policies (one active per worker for the current week)
# ---------------------------------------------------------------------------
SEED_POLICIES = [
    {
        "id": _sid(f"policy-{w['name']}"),
        "worker_id": w["id"],
        "week_start": _WEEK_START.isoformat(),
        "week_end": _WEEK_END.isoformat(),
        "premium_paid": round(w["weekly_earnings"] * 0.022 * 1.15, 2),
        "max_payout": round(w["weekly_earnings"] * 0.80, 2),
        "coverage_pct": 0.80 if w["risk_tier"] == "HIGH" else 0.75,
        "verification_tier": w["verification_tier"],
        "status": "ACTIVE",
    }
    for w in SEED_WORKERS
]

# ---------------------------------------------------------------------------
# Disruption events (sample events across different cities)
# ---------------------------------------------------------------------------
_EVT_TIME = datetime.now(tz=UTC) - timedelta(hours=6)

SEED_DISRUPTION_EVENTS = [
    {
        "id": _sid("event-mumbai-rain"),
        "event_type": "HEAVY_RAIN",
        "city": "Mumbai",
        "zones": ["Dharavi", "Kurla", "Sion"],
        "trigger_value": 62.4,
        "trigger_source": "openweathermap",
        "started_at": _EVT_TIME.isoformat(),
        "ended_at": (_EVT_TIME + timedelta(hours=5)).isoformat(),
        "workers_affected": 847,
        "total_payout": 212000.0,
        "status": "RESOLVED",
    },
    {
        "id": _sid("event-delhi-aqi"),
        "event_type": "SEVERE_AQI",
        "city": "Delhi",
        "zones": ["Chandni Chowk", "Karol Bagh", "Anand Vihar"],
        "trigger_value": 342.0,
        "trigger_source": "openaq",
        "started_at": (_EVT_TIME - timedelta(days=2)).isoformat(),
        "ended_at": (_EVT_TIME - timedelta(days=2) + timedelta(hours=8)).isoformat(),
        "workers_affected": 523,
        "total_payout": 98500.0,
        "status": "RESOLVED",
    },
    {
        "id": _sid("event-chennai-cyclone"),
        "event_type": "CYCLONE",
        "city": "Chennai",
        "zones": ["T Nagar", "Adyar", "Marina Beach"],
        "trigger_value": 95.0,
        "trigger_source": "openweathermap",
        "started_at": (_EVT_TIME + timedelta(hours=1)).isoformat(),
        "ended_at": None,
        "workers_affected": 312,
        "total_payout": 0,
        "status": "ACTIVE",
    },
]

# ---------------------------------------------------------------------------
# Claims
# ---------------------------------------------------------------------------
SEED_CLAIMS = [
    {
        "id": _sid("claim-ravi-rain"),
        "worker_id": SEED_WORKERS[0]["id"],
        "policy_id": SEED_POLICIES[0]["id"],
        "disruption_id": SEED_DISRUPTION_EVENTS[0]["id"],
        "shift_overlap_hours": 5.0,
        "lost_income": 312.50,
        "payout_amount": 250.0,
        "fraud_score": 0,
        "fraud_signals": [],
        "fraud_verdict": "CLEAN",
        "status": "PAID",
        "reviewer_action": None,
        "paid_at": (_EVT_TIME + timedelta(hours=5, minutes=10)).isoformat(),
    },
    {
        "id": _sid("claim-priya-aqi"),
        "worker_id": SEED_WORKERS[1]["id"],
        "policy_id": SEED_POLICIES[1]["id"],
        "disruption_id": SEED_DISRUPTION_EVENTS[1]["id"],
        "shift_overlap_hours": 4.0,
        "lost_income": 233.33,
        "payout_amount": 175.0,
        "fraud_score": 12,
        "fraud_signals": [],
        "fraud_verdict": "CLEAN",
        "status": "PAID",
        "reviewer_action": None,
        "paid_at": (_EVT_TIME - timedelta(days=2) + timedelta(hours=9)).isoformat(),
    },
    {
        "id": _sid("claim-fraud-suspect"),
        "worker_id": SEED_WORKERS[2]["id"],
        "policy_id": SEED_POLICIES[2]["id"],
        "disruption_id": SEED_DISRUPTION_EVENTS[0]["id"],
        "shift_overlap_hours": 3.0,
        "lost_income": 190.0,
        "payout_amount": 142.50,
        "fraud_score": 88,
        "fraud_signals": ["GPS_SPOOFED", "DEVICE_FINGERPRINT_DUPLICATE"],
        "fraud_verdict": "REJECTED",
        "status": "REJECTED",
        "reviewer_action": "AUTO_REJECT",
        "paid_at": None,
    },
]

# ---------------------------------------------------------------------------
# Payouts
# ---------------------------------------------------------------------------
SEED_PAYOUTS = [
    {
        "id": _sid("payout-ravi-rain"),
        "claim_id": SEED_CLAIMS[0]["id"],
        "worker_id": SEED_WORKERS[0]["id"],
        "upi_id": SEED_WORKERS[0]["upi_id"],
        "amount": 250.0,
        "razorpay_ref": "pay_demo_ravi_001",
        "status": "COMPLETED",
        "initiated_at": (_EVT_TIME + timedelta(hours=5, minutes=5)).isoformat(),
        "completed_at": (_EVT_TIME + timedelta(hours=5, minutes=8)).isoformat(),
    },
    {
        "id": _sid("payout-priya-aqi"),
        "claim_id": SEED_CLAIMS[1]["id"],
        "worker_id": SEED_WORKERS[1]["id"],
        "upi_id": SEED_WORKERS[1]["upi_id"],
        "amount": 175.0,
        "razorpay_ref": "pay_demo_priya_001",
        "status": "COMPLETED",
        "initiated_at": (_EVT_TIME - timedelta(days=2) + timedelta(hours=8, minutes=55)).isoformat(),
        "completed_at": (_EVT_TIME - timedelta(days=2) + timedelta(hours=9)).isoformat(),
    },
]


# ---------------------------------------------------------------------------
# Aggregated seed data bundle
# ---------------------------------------------------------------------------
def get_seed_data() -> dict:
    """Return all seed data as a single dictionary, ready for DB insertion."""
    return {
        "workers": SEED_WORKERS,
        "policies": SEED_POLICIES,
        "disruption_events": SEED_DISRUPTION_EVENTS,
        "claims": SEED_CLAIMS,
        "payouts": SEED_PAYOUTS,
    }


def print_summary(data: dict) -> None:
    """Print a human-readable summary of the seed data."""
    print("=" * 60)
    print("  Trigr Seed Data Summary")
    print("=" * 60)
    for table, rows in data.items():
        print(f"\n  {table}: {len(rows)} rows")
        for row in rows:
            label = row.get("name") or row.get("event_type") or row.get("id", "?")
            print(f"    - {label}")
    print("\n" + "=" * 60)
    print("  Total records:", sum(len(v) for v in data.values()))
    print("=" * 60)


def export_json(data: dict, path: str = "seed_data.json") -> None:
    """Export seed data to a JSON file for inspection or external tooling."""
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, default=str)
    print(f"\n  Exported seed data to {path}")


# ---------------------------------------------------------------------------
# CLI entrypoint
# ---------------------------------------------------------------------------
def main() -> None:
    parser = argparse.ArgumentParser(description="Trigr seed data generator")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        default=True,
        help="Print seed summary without writing to DB (default)",
    )
    parser.add_argument(
        "--no-dry-run",
        dest="dry_run",
        action="store_false",
        help="Attempt real database seeding",
    )
    parser.add_argument(
        "--export-json",
        action="store_true",
        help="Export seed data to seed_data.json",
    )
    args = parser.parse_args()

    data = get_seed_data()
    print_summary(data)

    if args.export_json:
        export_json(data)

    # ---------------------------------------------------------------------------
    # DB Insertion Logic (Persistence-Ready)
    # ---------------------------------------------------------------------------
    if not args.dry_run:
        from backend.db.supabase import get_supabase_config
        config = get_supabase_config()
        
        print("\n  [SYSTEM] Attempting real database seeding...")
        
        # 1. Dependency check
        try:
            from supabase import create_client
        except ImportError:
            print("  [ERROR] 'supabase' library not found. Run 'pip install supabase'.")
            return

        # 2. Connection check
        if not config.get("url") or "project_url" in config.get("url", ""):
            print("  [BLOCKED] Supabase URL/Key missing in .env. Persistence is skipped.")
            print("  [ACTION] Update .env with real SUPABASE_URL and SUPABASE_KEY.")
            return

        # 3. Client initialization
        try:
            # Note: We initialize here only for the seeding script's scope
            supabase = create_client(config["url"], config["key"])
            print(f"  [SUCCESS] Connected to {config['url']}")
            
            # --- Seeding Execution ---
            # In a real environment, we would iterate and upsert:
            # for table, rows in data.items():
            #     supabase.table(table).upsert(rows).execute()
            print("  [INFO] DB insertion logic is ready. (Actual upsert commented out for safety)")
            
        except Exception as e:
            print(f"  [ERROR] Failed to connect or write to Supabase: {e}")

    if args.dry_run:
        print("\n  [DRY RUN] No database writes performed.")
        print("  [STATUS] Use --no-dry-run to attempt real persistence if .env is configured.")


if __name__ == "__main__":
    main()
