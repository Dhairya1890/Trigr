# REPLACE WITH REAL API CALL - key location: .env -> OPENWEATHER_API_KEY
def get_weather(city: str) -> dict:
    return {
        "city": city,
        "rainfall_3h": 62.4,
        "wind_speed": 18.2,
        "visibility": 4500,
        "description": "heavy rain",
        "temp_c": 27
    }

