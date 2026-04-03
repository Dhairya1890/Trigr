from copy import deepcopy

NEWS_SIGNAL_MOCKS = {
    "mumbai": {
        "city": "Mumbai",
        "curfew_score": 0.12,
        "strike_score": 0.74,
        "geopolitical_risk_score": 0.21,
        "source_credibility": 0.90,
        "dominant_signal": "strike",
        "articles": [
            {
                "headline": "Union groups call for partial delivery slowdown in Andheri",
                "signal_type": "strike",
                "confidence": 0.74,
            },
            {
                "headline": "Traffic restrictions announced in central Mumbai after heavy rain",
                "signal_type": "operations",
                "confidence": 0.52,
            },
        ],
        "source": "NewsAPI (mock)",
    },
    "delhi": {
        "city": "Delhi",
        "curfew_score": 0.18,
        "strike_score": 0.22,
        "geopolitical_risk_score": 0.33,
        "source_credibility": 0.88,
        "dominant_signal": "geopolitical_risk",
        "articles": [
            {
                "headline": "Cross-border tensions raise logistics and checkpoint delays in NCR",
                "signal_type": "geopolitical_risk",
                "confidence": 0.33,
            },
            {
                "headline": "Air quality emergency measures continue across key delivery zones",
                "signal_type": "operations",
                "confidence": 0.61,
            },
        ],
        "source": "NewsAPI (mock)",
    },
    "bangalore": {
        "city": "Bangalore",
        "curfew_score": 0.04,
        "strike_score": 0.07,
        "geopolitical_risk_score": 0.09,
        "source_credibility": 0.91,
        "dominant_signal": "none",
        "articles": [
            {
                "headline": "Normal operations reported across Whitefield and Koramangala",
                "signal_type": "none",
                "confidence": 0.93,
            }
        ],
        "source": "NewsAPI (mock)",
    },
    "chennai": {
        "city": "Chennai",
        "curfew_score": 0.06,
        "strike_score": 0.11,
        "geopolitical_risk_score": 0.14,
        "source_credibility": 0.87,
        "dominant_signal": "none",
        "articles": [
            {
                "headline": "Port-side delays remain limited despite coastal weather watch",
                "signal_type": "operations",
                "confidence": 0.44,
            }
        ],
        "source": "NewsAPI (mock)",
    },
    "kolkata": {
        "city": "Kolkata",
        "curfew_score": 0.08,
        "strike_score": 0.28,
        "geopolitical_risk_score": 0.16,
        "source_credibility": 0.86,
        "dominant_signal": "strike",
        "articles": [
            {
                "headline": "Local transport unions warn of service interruptions this weekend",
                "signal_type": "strike",
                "confidence": 0.28,
            }
        ],
        "source": "NewsAPI (mock)",
    },
    "hyderabad": {
        "city": "Hyderabad",
        "curfew_score": 0.03,
        "strike_score": 0.05,
        "geopolitical_risk_score": 0.11,
        "source_credibility": 0.89,
        "dominant_signal": "none",
        "articles": [
            {
                "headline": "Delivery operations remain stable across major corridors",
                "signal_type": "none",
                "confidence": 0.92,
            }
        ],
        "source": "NewsAPI (mock)",
    },
}

DEFAULT_NEWS_SIGNALS = {
    "city": "Unknown",
    "curfew_score": 0.05,
    "strike_score": 0.06,
    "geopolitical_risk_score": 0.10,
    "source_credibility": 0.85,
    "dominant_signal": "none",
    "articles": [],
    "source": "NewsAPI (mock)",
}


def _normalize_city(city: str) -> str:
    return city.strip().lower()


def get_disruption_news(city: str) -> dict:
    news_signals = deepcopy(NEWS_SIGNAL_MOCKS.get(_normalize_city(city), DEFAULT_NEWS_SIGNALS))
    news_signals["city"] = news_signals["city"] if news_signals["city"] != "Unknown" else city.title()

    # REPLACE WITH REAL API CALL - key location: .env -> NEWSAPI_KEY
    return news_signals
