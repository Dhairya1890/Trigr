from copy import deepcopy

WEATHER_MOCKS = {
    "mumbai": {
        "city": "Mumbai",
        "rainfall_3h": 62.4,
        "wind_speed": 18.2,
        "visibility": 4500,
        "description": "heavy rain",
        "temp_c": 27,
        "humidity": 91,
        "alert_level": "ELEVATED",
        "source": "OpenWeatherMap (mock)",
    },
    "delhi": {
        "city": "Delhi",
        "rainfall_3h": 0.0,
        "wind_speed": 11.7,
        "visibility": 1800,
        "description": "dust haze",
        "temp_c": 33,
        "humidity": 44,
        "alert_level": "WATCH",
        "source": "OpenWeatherMap (mock)",
    },
    "bangalore": {
        "city": "Bangalore",
        "rainfall_3h": 8.1,
        "wind_speed": 10.9,
        "visibility": 6000,
        "description": "light rain",
        "temp_c": 24,
        "humidity": 72,
        "alert_level": "CLEAR",
        "source": "OpenWeatherMap (mock)",
    },
    "chennai": {
        "city": "Chennai",
        "rainfall_3h": 14.6,
        "wind_speed": 26.5,
        "visibility": 5200,
        "description": "coastal winds",
        "temp_c": 31,
        "humidity": 79,
        "alert_level": "WATCH",
        "source": "OpenWeatherMap (mock)",
    },
    "kolkata": {
        "city": "Kolkata",
        "rainfall_3h": 22.8,
        "wind_speed": 14.3,
        "visibility": 5800,
        "description": "moderate rain",
        "temp_c": 29,
        "humidity": 84,
        "alert_level": "WATCH",
        "source": "OpenWeatherMap (mock)",
    },
    "hyderabad": {
        "city": "Hyderabad",
        "rainfall_3h": 3.2,
        "wind_speed": 9.4,
        "visibility": 7000,
        "description": "partly cloudy",
        "temp_c": 30,
        "humidity": 57,
        "alert_level": "CLEAR",
        "source": "OpenWeatherMap (mock)",
    },
}

DEFAULT_WEATHER = {
    "city": "Unknown",
    "rainfall_3h": 4.2,
    "wind_speed": 12.0,
    "visibility": 5000,
    "description": "scattered clouds",
    "temp_c": 28,
    "humidity": 60,
    "alert_level": "CLEAR",
    "source": "OpenWeatherMap (mock)",
}


def _normalize_city(city: str) -> str:
    return city.strip().lower()


def get_weather(city: str) -> dict:
    weather = deepcopy(WEATHER_MOCKS.get(_normalize_city(city), DEFAULT_WEATHER))
    weather["city"] = weather["city"] if weather["city"] != "Unknown" else city.title()

    # REPLACE WITH REAL API CALL - key location: .env -> OPENWEATHER_API_KEY
    return weather
