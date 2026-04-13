"""Trigr backend models – re-export all domain models for convenience."""

from backend.models.claim import (
    Claim,
    ClaimsListResponse,
    ClaimSummary,
    FraudQueueItem,
    FraudQueueResponse,
    FraudVerdictRequest,
    FraudVerdictResponse,
)
from backend.models.disruption import (
    ActiveTriggersResponse,
    ActiveTriggerSummary,
    DisruptionEvent,
    PoolHealthResponse,
    SimulateTriggerRequest,
    SimulateTriggerResponse,
    WeatherResponse,
)
from backend.models.payout import Payout, PayoutLedgerItem, PayoutLedgerResponse
from backend.models.policy import (
    Policy,
    PolicyLookupResponse,
    PurchasePolicyRequest,
    PurchasePolicyResponse,
)
from backend.models.premium import PremiumCalculationRequest, PremiumCalculationResponse
from backend.models.worker import (
    LocationAttestationRequest,
    LocationAttestationResponse,
    VerifyUpiRequest,
    VerifyUpiResponse,
    Worker,
    WorkerProfileResponse,
    WorkerRegistrationRequest,
    WorkerRegistrationResponse,
)

__all__ = [
    # Worker
    "Worker",
    "WorkerRegistrationRequest",
    "WorkerRegistrationResponse",
    "LocationAttestationRequest",
    "LocationAttestationResponse",
    "VerifyUpiRequest",
    "VerifyUpiResponse",
    "WorkerProfileResponse",
    # Policy
    "Policy",
    "PurchasePolicyRequest",
    "PurchasePolicyResponse",
    "PolicyLookupResponse",
    # Claim
    "Claim",
    "ClaimSummary",
    "ClaimsListResponse",
    "FraudQueueItem",
    "FraudQueueResponse",
    "FraudVerdictRequest",
    "FraudVerdictResponse",
    # Disruption
    "DisruptionEvent",
    "SimulateTriggerRequest",
    "SimulateTriggerResponse",
    "ActiveTriggerSummary",
    "ActiveTriggersResponse",
    "PoolHealthResponse",
    "WeatherResponse",
    # Payout
    "Payout",
    "PayoutLedgerItem",
    "PayoutLedgerResponse",
    # Premium
    "PremiumCalculationRequest",
    "PremiumCalculationResponse",
]
