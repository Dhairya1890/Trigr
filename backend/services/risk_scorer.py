CITY_RISK = {"Mumbai": 35, "Delhi": 30, "Chennai": 28, "Bangalore": 20, "Kolkata": 25, "Hyderabad": 22}


def score_risk(city: str, zone: str, platform: str, month: int, shift_start: str | None = None) -> dict:
    score = CITY_RISK.get(city, 20)

    zone_lower = zone.lower()
    if "dharavi" in zone_lower or "kurla" in zone_lower or "sion" in zone_lower:
        score += 20
    elif "industrial" in zone_lower:
        score += 15
    else:
        score += 5

    platform_lower = platform.lower()
    if platform_lower in {"swiggy", "zomato"}:
        score += 10
    elif platform_lower in {"blinkit", "zepto", "instamart"}:
        score += 8
    else:
        score += 5

    if month in {6, 7, 8, 9}:
        score += 15
    elif city == "Delhi" and month in {10, 11, 12, 1, 2}:
        score += 12

    if shift_start and shift_start >= "20:00":
        score += 8
    else:
        score -= 5

    score = max(0, min(100, score))
    if score < 40:
        tier = "LOW"
    elif score < 70:
        tier = "MEDIUM"
    else:
        tier = "HIGH"

    return {"risk_score": score, "risk_tier": tier}
