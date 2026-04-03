from itertools import count

PENNY_DROP_COUNTER = count(1)
PAYOUT_COUNTER = count(1)


def _mask_upi(upi_id: str) -> str:
    if "@" not in upi_id:
        return upi_id
    handle, provider = upi_id.split("@", 1)
    if len(handle) <= 2:
        masked_handle = f"{handle[0]}*"
    else:
        masked_handle = f"{handle[:2]}{'*' * max(1, len(handle) - 2)}"
    return f"{masked_handle}@{provider}"


def send_penny_drop(upi_id: str) -> dict:
    reference_number = next(PENNY_DROP_COUNTER)

    # REPLACE WITH REAL API CALL - key location: .env -> RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
    return {
        "success": True,
        "reference_id": f"RZP_MOCK_{reference_number:03d}",
        "amount": 1,
        "currency": "INR",
        "upi_id": upi_id,
        "upi_masked": _mask_upi(upi_id),
        "status": "processed",
        "provider": "Razorpay (mock)",
    }


def initiate_payout(upi_id: str, amount: float, reference: str) -> dict:
    payout_number = next(PAYOUT_COUNTER)

    # REPLACE WITH REAL API CALL - key location: .env -> RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
    return {
        "success": True,
        "payout_id": f"POUT_MOCK_{payout_number:03d}",
        "status": "processed",
        "upi_id": upi_id,
        "upi_masked": _mask_upi(upi_id),
        "amount": round(amount, 2),
        "currency": "INR",
        "reference": reference,
        "provider": "Razorpay (mock)",
    }
