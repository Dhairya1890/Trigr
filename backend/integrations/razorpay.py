# REPLACE WITH REAL API CALL - key location: .env -> RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
def send_penny_drop(upi_id: str) -> dict:
    return {
        "success": True,
        "reference_id": "RZP_MOCK_001",
        "amount": 1,
        "upi_id": upi_id
    }


# REPLACE WITH REAL API CALL - key location: .env -> RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
def initiate_payout(upi_id: str, amount: float, reference: str) -> dict:
    return {
        "success": True,
        "payout_id": f"POUT_MOCK_{reference}",
        "status": "processed",
        "upi_id": upi_id,
        "amount": amount
    }

