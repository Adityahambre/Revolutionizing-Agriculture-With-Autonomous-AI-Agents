
import httpx


WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast"


async def get_weather_forecast(latitude: float, longitude: float):
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": (
            "temperature_2m,"
            "relative_humidity_2m,"
            "apparent_temperature,"
            "precipitation,"
            "rain,"
            "weather_code,"
            "wind_speed_10m"
        ),
        "daily": (
            "temperature_2m_max,"
            "temperature_2m_min,"
            "precipitation_sum,"
            "precipitation_probability_max,"
            "wind_speed_10m_max,"
            "et0_fao_evapotranspiration"
        ),
        "forecast_days": 7,
        "timezone": "auto"
    }

    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            response = await client.get(
                WEATHER_API_URL,
                params=params
            )

            response.raise_for_status()
            data = response.json()

    except httpx.HTTPError as error:
        raise ValueError(
            "Unable to retrieve weather data. Please try again."
        ) from error

    current = data.get("current", {})
    daily = data.get("daily", {})

    forecast = []

    dates = daily.get("time", [])

    for index, date in enumerate(dates):
        forecast.append({
            "date": date,
            "maximum_temperature_c": daily["temperature_2m_max"][index],
            "minimum_temperature_c": daily["temperature_2m_min"][index],
            "rainfall_mm": daily["precipitation_sum"][index],
            "rain_probability_percent": (
                daily["precipitation_probability_max"][index]
            ),
            "maximum_wind_speed_kmh": (
                daily["wind_speed_10m_max"][index]
            ),
            "reference_evapotranspiration_mm": (
                daily["et0_fao_evapotranspiration"][index]
            )
        })

    return {
        "status": "success",
        "agent": "Weather Intelligence Agent",
        "location": {
            "latitude": latitude,
            "longitude": longitude
        },
        "timezone": data.get("timezone"),
        "current_weather": {
            "observation_time": current.get("time"),
            "temperature_c": current.get("temperature_2m"),
            "feels_like_c": current.get("apparent_temperature"),
            "humidity_percent": current.get("relative_humidity_2m"),
            "precipitation_mm": current.get("precipitation"),
            "rain_mm": current.get("rain"),
            "wind_speed_kmh": current.get("wind_speed_10m"),
            "weather_code": current.get("weather_code")
        },
        "seven_day_forecast": forecast,
        "source": "Open-Meteo Forecast API",
        "data_note": (
            "Weather model estimates for the selected coordinates. "
            "These are not measurements from the individual farm."
        )
    }
