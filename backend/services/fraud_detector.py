"""Fraud evaluation service based on the Trigr anti-spoofing strategy."""

from __future__ import annotations


def evaluate_fraud(claim_data: dict) -> dict:
    """
    Evaluates a claim based on a 1-100 score and returns a tier and signals.
    claim_data expects:
        - gps_matches_zone: bool
        - app_active_before: bool
        - worker_moving: bool
        - account_age_days: int
        - device_has_duplicate_accounts: bool
        - recent_claims_count: int
    """
    score = 0
    signals = []

    # 1. Location Consistency (GPS vs Zone)
    if not claim_data.get("gps_matches_zone", True):
        score += 35
        signals.append("GPS_ZONE_MISMATCH")

    # 2. Behavioral Signals
    if not claim_data.get("app_active_before", True):
        score += 20
        signals.append("APP_INACTIVE_PRE_TRIGGER")

    if not claim_data.get("worker_moving", True):
        score += 15
        signals.append("NO_MOVEMENT_DETECTED")

    # 3. Account History
    if claim_data.get("account_age_days", 30) < 7:
        score += 10
        signals.append("NEW_ACCOUNT")

    if claim_data.get("recent_claims_count", 0) > 3:
        score += 15
        signals.append("HIGH_CLAIM_VELOCITY")

    # 4. Device Fingerprint (Syndicate Defense)
    if claim_data.get("device_has_duplicate_accounts", False):
        score += 40
        signals.append("DEVICE_FINGERPRINT_DUPLICATE")

    score = min(100, score)

    # Resolve Verdict based on README tiers
    if score <= 30:
        verdict = "CLEAN"
    elif score <= 60:
        verdict = "SOFT_FLAG"
    elif score <= 85:
        verdict = "HARD_FLAG"
    else:
        verdict = "AUTO_REJECT"

    return {"fraud_score": score, "signals": signals, "verdict": verdict}
