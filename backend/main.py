from contextlib import asynccontextmanager

from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import claims, policies, premium, triggers, workers
from backend.services.trigger_monitor import run_trigger_monitor

scheduler = BackgroundScheduler()


@asynccontextmanager
async def lifespan(_: FastAPI):
    scheduler.add_job(run_trigger_monitor, "interval", minutes=15, id="trigger-monitor", replace_existing=True)
    scheduler.start()
    try:
        yield
    finally:
        scheduler.shutdown(wait=False)


app = FastAPI(title="Trigr API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://trigr.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workers.router, prefix="/api/workers", tags=["workers"])
app.include_router(policies.router, prefix="/api/policies", tags=["policies"])
app.include_router(claims.router, prefix="/api/claims", tags=["claims"])
app.include_router(triggers.router, prefix="/api/triggers", tags=["triggers"])
app.include_router(premium.router, prefix="/api/premium", tags=["premium"])


@app.get("/health")
def healthcheck():
    return {"status": "ok"}
