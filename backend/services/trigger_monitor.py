from backend.integrations.newsapi import get_disruption_news
from backend.integrations.openaq import get_aqi
from backend.integrations.openweather import get_weather


def run_trigger_monitor() -> dict:
    return {
        "weather": get_weather("Mumbai"),
        "aqi": get_aqi("Delhi"),
        "news": get_disruption_news("Mumbai")
    }

