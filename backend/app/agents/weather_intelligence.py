
from typing import Any


def analyze_weather(
    crop: str,
    temperature_c: float,
    humidity_percent: float,
    rainfall_mm: float,
    wind_speed_kmh: float
) -> dict[str, Any]:

    crop = crop.strip().lower()

    if not crop:
        raise ValueError("Crop name is required.")

    if not -10 <= temperature_c <= 60:
        raise ValueError("Temperature must be between -10 and 60 Celsius.")

    if not 0 <= humidity_percent <= 100:
        raise ValueError("Humidity must be between 0 and 100.")

    if rainfall_mm < 0:
        raise ValueError("Rainfall cannot be negative.")

    if wind_speed_kmh < 0 or wind_speed_kmh > 300:
        raise ValueError("Wind speed must be between 0 and 300 km/h.")

    alerts = []
    recommendations = []

    if temperature_c >= 38:
        alerts.append("Very high temperature")
        recommendations.append(
            "Monitor crops for heat stress and check soil moisture regularly."
        )
    elif temperature_c >= 32:
        alerts.append("High temperature")
        recommendations.append(
            "Check irrigation requirements and avoid unnecessary water stress."
        )
    elif temperature_c <= 10:
        alerts.append("Low temperature")
        recommendations.append(
            "Monitor crops for cold stress and protect sensitive plants where practical."
        )

    if humidity_percent >= 85:
        alerts.append("Very high humidity")
        recommendations.append(
            "Monitor crops for fungal disease and improve air circulation."
        )
    elif humidity_percent <= 30:
        alerts.append("Low humidity")
        recommendations.append(
            "Check soil moisture and monitor crops for moisture stress."
        )

    if rainfall_mm >= 50:
        alerts.append("Heavy rainfall")
        recommendations.append(
            "Check field drainage and inspect crops for waterlogging."
        )
    elif rainfall_mm == 0:
        recommendations.append(
            "No rainfall reported; check soil moisture before irrigation."
        )

    if wind_speed_kmh >= 40:
        alerts.append("Strong wind")
        recommendations.append(
            "Secure vulnerable structures and inspect crops for wind damage."
        )

    if not alerts:
        alerts.append("No major weather risk identified by these simple rules.")

    if not recommendations:
        recommendations.append(
            "Continue regular crop monitoring and follow local agricultural advice."
        )

    return {
        "agent": "Weather Intelligence Agent",
        "status": "success",
        "crop": crop,
        "weather_input": {
            "temperature_c": temperature_c,
            "humidity_percent": humidity_percent,
            "rainfall_mm": rainfall_mm,
            "wind_speed_kmh": wind_speed_kmh
        },
        "weather_alerts": alerts,
        "recommendations": recommendations,
        "method": "Rule-based weather risk analysis",
        "data_source": "User-provided weather values",
        "disclaimer": (
            "This analysis uses values supplied by the user. "
            "It is not a live weather forecast and does not replace "
            "official weather alerts or local agricultural advice."
        )
    }
