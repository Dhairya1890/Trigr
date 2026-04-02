# REPLACE WITH REAL API CALL - key location: .env -> OPENAQ_API_KEY
def get_aqi(city: str) -> dict:
    return {
        "city": city,
        "aqi": 180,
        "pm25": 95.4,
        "category": "Unhealthy"
    }

