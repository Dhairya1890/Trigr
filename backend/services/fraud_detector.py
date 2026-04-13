"""Fraud evaluation service based on the Trigr anti-spoofing strategy."""

from __future__ import annotations


def evaluate_fraud(claim_data: dict) -> dict:
    """
    Evaluates a claim based on a 1-100 score and returns a tier and signals.
    claim_data expects:
        - gps_matches_zone: bool
        - cell_tower_matches_zone: bool | None
        - wifi_matches_zone: bool | None
        - app_active_before: bool
        - app_activity_pattern_normal: bool
        - worker_moving: bool
        - accelerometer_active: bool
        - account_age_days: int
        - device_has_duplicate_accounts: bool
        - recent_claims_count: int
        - historical_trigger_match: bool
        - zone_in_affected_history: bool
        - within_trigger_window: bool
        - sync_cluster_size: int
        - claim_velocity_anomaly: bool
    """
    score = 0
    signals = []

    # Layer 1: Multi-signal location consensus. GPS alone is not trusted.
    if not claim_data.get("gps_matches_zone", True):
        score += 35
        signals.append("GPS_ZONE_MISMATCH")

    cell_tower_matches_zone = claim_data.get("cell_tower_matches_zone")
    if cell_tower_matches_zone is False:
        score += 30
        signals.append("CELL_TOWER_MISMATCH")

    wifi_matches_zone = claim_data.get("wifi_matches_zone")
    if wifi_matches_zone is False:
        score += 20
        signals.append("WIFI_BSSID_CONFLICT")

    if claim_data.get("gps_matches_zone", True) and cell_tower_matches_zone is False:
        score += 15
        signals.append("GPS_CELL_CONFLICT")

    if cell_tower_matches_zone is False and wifi_matches_zone is False:
        score += 20
        signals.append("TRIPLE_SIGNAL_LOCATION_FAILURE")

    # Layer 2: Behavioural signals.
    if not claim_data.get("app_active_before", True):
        score += 20
        signals.append("APP_INACTIVE_PRE_TRIGGER")

    if not claim_data.get("app_activity_pattern_normal", True):
        score += 10
        signals.append("ABNORMAL_ACTIVITY_PATTERN")

    if not claim_data.get("worker_moving", True):
        score += 15
        signals.append("NO_MOVEMENT_DETECTED")

    if not claim_data.get("accelerometer_active", True):
        score += 15
        signals.append("STATIONARY_SENSOR")

    sync_cluster_size = claim_data.get("sync_cluster_size", 1)
    if sync_cluster_size >= 5:
        score += 30
        signals.append("SYNC_CLUSTER_DETECTED")

    if claim_data.get("claim_velocity_anomaly", False):
        score += 25
        signals.append("CLAIM_VELOCITY_SPIKE")

    # Historical validation blocks fake weather / fake trigger claims.
    if not claim_data.get("historical_trigger_match", True):
        score += 35
        signals.append("NO_HISTORICAL_TRIGGER_MATCH")

    if not claim_data.get("zone_in_affected_history", True):
        score += 25
        signals.append("ZONE_NOT_AFFECTED")

    if not claim_data.get("within_trigger_window", True):
        score += 20
        signals.append("CLAIM_OUTSIDE_TRIGGER_WINDOW")

    # Layer 3: account / device network signals.
    account_age_days = claim_data.get("account_age_days", 30)
    if account_age_days < 3:
        score += 25
        signals.append("ACCOUNT_AGE_LT_3_DAYS")
    elif account_age_days < 7:
        score += 10
        signals.append("NEW_ACCOUNT")

    if claim_data.get("recent_claims_count", 0) > 3:
        score += 15
        signals.append("HIGH_CLAIM_VELOCITY")

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
