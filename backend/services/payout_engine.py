"""Payout calculation engine to determine lost income and final payout amounts."""

from __future__ import annotations


def _parse_time(t_str: str) -> float:
    """Convert HH:MM to decimal hours for easy overlap math."""
    h, m = map(int, t_str.split(":"))
    return h + m / 60.0


def calculate_payout(claim_params: dict) -> dict:
    """
    Calculates overlap hours and the final payout.
    claim_params expects:
        - shift_start: str (HH:MM)
        - shift_end: str (HH:MM)
        - disruption_start: str (HH:MM)
        - disruption_end: str (HH:MM)
        - weekly_earnings: float
        - working_days: int
        - coverage_pct: float
        - max_payout: float
        - current_week_payouts_total: float  (to enforce weekly cap)
    """
    s_start = _parse_time(claim_params["shift_start"])
    s_end = _parse_time(claim_params["shift_end"])
    # Handle shifts crossing midnight (simplification: assume no midnight shift crossing for this logic level,
    # or handle with simple modulo, but typically shifts are same-day for these demo examples)
    if s_end < s_start:
        s_end += 24.0

    d_start = _parse_time(claim_params["disruption_start"])
    d_end = _parse_time(claim_params["disruption_end"])
    if d_end < d_start:
        d_end += 24.0

    # Calculate overlap window
    overlap_start = max(s_start, d_start)
    overlap_end = min(s_end, d_end)

    overlap_hours = max(0.0, overlap_end - overlap_start)

    # Calculate hourly rate explicitly
    shift_duration = s_end - s_start
    if shift_duration <= 0:
        shift_duration = 12.0  # Fallback

    weekly_hours = claim_params.get("working_days", 6) * shift_duration
    hourly_rate = claim_params["weekly_earnings"] / weekly_hours if weekly_hours > 0 else 0

    lost_income = overlap_hours * hourly_rate
    proposed_payout = lost_income * claim_params["coverage_pct"]

    # Enforce weekly cap
    remaining_cap = max(0.0, claim_params["max_payout"] - claim_params.get("current_week_payouts_total", 0.0))
    final_payout = min(proposed_payout, remaining_cap)

    return {
        "overlap_hours": round(overlap_hours, 2),
        "hourly_rate": round(hourly_rate, 2),
        "lost_income": round(lost_income, 2),
        "proposed_payout": round(proposed_payout, 2),
        "payout": round(final_payout, 2),
    }
