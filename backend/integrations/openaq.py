from copy import deepcopy

AQI_MOCKS = {
    "mumbai": {
        "city": "Mumbai",
        "aqi": 186,
        "pm25": 95.4,
        "pm10": 141.2,
        "category": "Unhealthy",
        "alert_level": "WATCH",
        "source": "OpenAQ (mock)",
    },
    "delhi": {
        "city": "Delhi",
        "aqi": 328,
        "pm25": 218.7,
        "pm10": 301.5,
        "category": "Hazardous",
        "alert_level": "ACTIVE_TRIGGER",
        "source": "OpenAQ (mock)",
    },
    "bangalore": {
        "city": "Bangalore",
        "aqi": 112,
        "pm25": 48.1,
        "pm10": 74.8,
        "category": "Unhealthy for Sensitive Groups",
        "alert_level": "CLEAR",
        "source": "OpenAQ (mock)",
    },
    "chennai": {
        "city": "Chennai",
        "aqi": 134,
        "pm25": 59.6,
        "pm10": 88.4,
        "category": "Unhealthy for Sensitive Groups",
        "alert_level": "WATCH",
        "source": "OpenAQ (mock)",
    },
    "kolkata": {
        "city": "Kolkata",
        "aqi": 154,
        "pm25": 81.9,
        "pm10": 116.4,
        "category": "Unhealthy",
        "alert_level": "WATCH",
        "source": "OpenAQ (mock)",
    },
    "hyderabad": {
        "city": "Hyderabad",
        "aqi": 97,
        "pm25": 37.5,
        "pm10": 63.9,
        "category": "Moderate",
        "alert_level": "CLEAR",
        "source": "OpenAQ (mock)",
    },
}

DEFAULT_AQI = {
    "city": "Unknown",
    "aqi": 120,
    "pm25": 52.0,
    "pm10": 80.0,
    "category": "Unhealthy for Sensitive Groups",
    "alert_level": "WATCH",
    "source": "OpenAQ (mock)",
}


def _normalize_city(city: str) -> str:
    return city.strip().lower()


def get_aqi(city: str) -> dict:
    air_quality = deepcopy(AQI_MOCKS.get(_normalize_city(city), DEFAULT_AQI))
    air_quality["city"] = air_quality["city"] if air_quality["city"] != "Unknown" else city.title()

    # REPLACE WITH REAL API CALL - key location: .env -> OPENAQ_API_KEY
    return air_quality
