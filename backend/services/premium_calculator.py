from backend.services.risk_scorer import score_risk

RISK_MULTIPLIERS = {"LOW": 0.80, "MEDIUM": 1.00, "HIGH": 1.15}
COVERAGE_PCT = {"LOW": 0.70, "MEDIUM": 0.75, "HIGH": 0.80}
TIER_CAPS = {"Tier 1": 2000, "Tier 2": 3500, "Tier 3": 5000}


def calculate_weekly_premium(payload: dict) -> dict:
    risk = score_risk(payload["city"], payload["zone"], payload["platform"], payload["month"])
    base_premium = round(payload["weekly_earnings"] * 0.022, 2)
    season_factor = (
        1.15
        if payload["month"] in {6, 7, 8, 9}
        else 1.10
        if payload["city"] == "Delhi" and payload["month"] in {10, 11, 12, 1, 2}
        else 1.00
    )
    loyalty_discount = 1.00
    weekly_premium = round(base_premium * RISK_MULTIPLIERS[risk["risk_tier"]] * season_factor * loyalty_discount)
    tier = "Tier 2"
    coverage_pct = COVERAGE_PCT[risk["risk_tier"]]
    max_payout = min(round(payload["weekly_earnings"] * coverage_pct), TIER_CAPS[tier])

    return {
        **risk,
        "base_premium": base_premium,
        "risk_multiplier": RISK_MULTIPLIERS[risk["risk_tier"]],
        "season_factor": season_factor,
        "loyalty_discount": loyalty_discount,
        "weekly_premium": weekly_premium,
        "max_payout": max_payout,
        "coverage_pct": coverage_pct,
        "tier": tier,
        "calculation_date": datetime.now().isoformat(),
    }
