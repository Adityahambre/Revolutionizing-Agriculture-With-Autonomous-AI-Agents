
import httpx
from app.core.config import settings

MANDI_API_URL = (
    "https://api.data.gov.in/resource/"
    "9ef84268-d588-465a-a308-a864a43d0070"
)


async def get_mandi_prices(
    state: str,
    commodity: str | None = None,
    limit: int = 20,
    offset: int = 0
):
    api_key = settings.data_gov_in_api_key

    if not api_key:
        raise ValueError("DATA.GOV.IN API key is not configured.")

    if not state.strip():
        raise ValueError("State is required.")

    limit = max(1, min(limit, 100))
    offset = max(0, offset)

    params = {
        "api-key": api_key,
        "format": "json",
        "limit": limit,
        "offset": offset,
        "filters[state.keyword]": state.strip()
    }

    if commodity and commodity.strip():
        params["filters[commodity]"] = commodity.strip()

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(
                MANDI_API_URL,
                params=params
            )

            print("MANDI API STATUS:", response.status_code)
            response.raise_for_status()

            try:
                data = response.json()
            except ValueError as error:
                print("MANDI JSON ERROR:", repr(error))
                print("MANDI RESPONSE:", response.text[:1000])
                raise ValueError(
                    "Mandi API returned invalid JSON."
                ) from error

    except httpx.HTTPStatusError as error:
        print("MANDI HTTP ERROR:", error.response.status_code)
        print("MANDI ERROR RESPONSE:", error.response.text[:1000])

        raise ValueError(
            f"Mandi API returned HTTP {error.response.status_code}."
        ) from error

    except httpx.RequestError as error:
        print("MANDI CONNECTION ERROR:", repr(error))

        raise ValueError(
            "Could not connect to the data.gov.in Mandi API."
        ) from error

    except ValueError as error:
        print("MANDI VALUE ERROR:", repr(error))
        raise

    records = []

    for item in data.get("records", []):
        try:
            min_price = float(item["min_price"])
            max_price = float(item["max_price"])
            modal_price = float(item["modal_price"])
        except (KeyError, TypeError, ValueError):
            continue

        records.append({
            "state": item.get("state"),
            "district": item.get("district"),
            "market": item.get("market"),
            "commodity": item.get("commodity"),
            "variety": item.get("variety"),
            "grade": item.get("grade"),
            "arrival_date": item.get("arrival_date"),
            "minimum_price": min_price,
            "maximum_price": max_price,
            "modal_price": modal_price,
            "price_unit": "INR per quintal"
        })

    return {
        "status": "success",
        "agent": "Market Intelligence Agent",
        "source": "data.gov.in - AGMARKNET Mandi Prices",
        "total_records_available": data.get("total"),
        "records_returned": len(records),
        "state_filter": state,
        "commodity_filter": commodity,
        "prices": records,
        "data_note": (
            "These are reported wholesale mandi prices, "
            "not guaranteed prices for the farmer. "
            "Prices may vary by market, variety, grade and date."
        )
    }
