from backend.integrations.newsapi import get_disruption_news
from backend.integrations.openaq import get_aqi
from backend.integrations.openweather import get_weather


import logging

logger = logging.getLogger(__name__)

def run_trigger_monitor() -> dict:
    """
    Polls active integrations and synthesizes data into actionable triggers.
    Returns a unified disruption state dict suitable for demo persistence parsing.
    """
    logger.info("Running trigger monitor task...")
    
    # 1. Fetch raw points
    weather_data = get_weather("Mumbai")
    aqi_data = get_aqi("Delhi")
    news_data = get_disruption_news("Mumbai")

    active_events = []
    
    # 2. Rule evaluation
    # Check Weather triggers
    if weather_data and weather_data.get("main") == "Rain":
        active_events.append({
            "type": "Heavy Rain",
            "city": "Mumbai",
            "severity": "HIGH" if weather_data.get("rainfall_mm", 0) > 50 else "MEDIUM",
            "source": "OpenWeather",
        })

    # Check AQI triggers
    if aqi_data and aqi_data.get("aqi", 0) > 300:
        active_events.append({
            "type": "AQI Hazard",
            "city": "Delhi",
            "severity": "CRITICAL",
            "source": "OpenAQ",
        })

    # 3. Compile output
    status = {
        "events_detected": len(active_events),
        "active_events": active_events,
        "raw_signals": {
            "weather": weather_data,
            "aqi": aqi_data,
            "news": news_data
        }
    }
    
    logger.info(f"Trigger monitor yielded {len(active_events)} active events.")
    return status
