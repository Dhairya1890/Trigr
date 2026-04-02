from fastapi import APIRouter

router = APIRouter()


@router.get("/{worker_id}")
def get_claims(worker_id: str):
    return {
        "worker_id": worker_id,
        "claims": []
    }


@router.get("/admin/fraud-queue")
def get_fraud_queue():
    return {"claims": []}

