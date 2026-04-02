# REPLACE WITH REAL API CALL - key location: .env -> NEWSAPI_KEY
def get_disruption_news(city: str) -> dict:
    return {
        "city": city,
        "curfew_score": 0.1,
        "strike_score": 0.08,
        "source_credibility": 0.9
    }

