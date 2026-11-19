from app.data_sources.market import get_mandi_prices
from pydantic import BaseModel, Field
from typing import Optional
from app.data_sources.soil import analyze_soil
from fastapi import APIRouter, HTTPException, Query
import httpx
from app.data_sources.weather import get_weather_forecast

router = APIRouter(
    prefix="/api/intelligence",
    tags=["Location Intelligence"]
)


@router.get("/location")
async def get_location_details(
    latitude: float = Query(ge=-90, le=90),
    longitude: float = Query(ge=-180, le=180)
):
    """
    Convert map coordinates into geographical information.
    Uses OpenStreetMap Nominatim reverse geocoding.
    """

    url = "https://nominatim.openstreetmap.org/reverse"

    params = {
        "format": "jsonv2",
        "lat": latitude,
        "lon": longitude,
        "zoom": 18,
        "addressdetails": 1
    }

    headers = {
        "User-Agent": "AgriNova-Agricultural-Intelligence/1.0"
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(
                url,
                params=params,
                headers=headers
            )

        if response.status_code == 429:
            raise HTTPException(
                status_code=429,
                detail="Location service rate limit reached. Please wait and try again."
            )

        response.raise_for_status()
        data = response.json()

    except HTTPException:
        raise

    except httpx.HTTPError:
        raise HTTPException(
            status_code=502,
            detail="Unable to retrieve location information. Please try again."
        )

    address = data.get("address", {})

    return {
        "status": "success",
        "coordinates": {
            "latitude": latitude,
            "longitude": longitude
        },
        "location": {
            "display_name": data.get("display_name"),
            "village": (
                address.get("village")
                or address.get("hamlet")
                or address.get("town")
                or address.get("suburb")
            ),
            "district": (
                address.get("state_district")
                or address.get("county")
            ),
            "state": address.get("state"),
            "country": address.get("country"),
            "country_code": address.get("country_code"),
            "pincode": address.get("postcode")
        },
        "source": "OpenStreetMap Nominatim",
        "data_quality": "Geocoded address; not verified land ownership or soil information"
    }
@router.get("/weather")
async def weather_intelligence(
    latitude: float = Query(ge=-90, le=90),
    longitude: float = Query(ge=-180, le=180)
):
    try:
        return await get_weather_forecast(
            latitude=latitude,
            longitude=longitude
        )

    except ValueError as error:
        raise HTTPException(
            status_code=502,
            detail=str(error)
        )
class SoilAnalysisRequest(BaseModel):
    soil_type: Optional[str] = None
    ph: Optional[float] = Field(default=None, ge=0, le=14)
    nitrogen: Optional[float] = Field(default=None, ge=0)
    phosphorus: Optional[float] = Field(default=None, ge=0)
    potassium: Optional[float] = Field(default=None, ge=0)
    organic_carbon: Optional[float] = Field(default=None, ge=0)
    electrical_conductivity: Optional[float] = Field(default=None, ge=0)
    moisture_percent: Optional[float] = Field(default=None, ge=0, le=100)


@router.post("/soil")
def soil_intelligence(request: SoilAnalysisRequest):
    try:
        return analyze_soil(**request.model_dump())
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
@router.get("/market")
async def market_intelligence(
    state: str = Query(min_length=2),
    commodity: Optional[str] = Query(default=None),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0)
):
    """
    Retrieve real mandi prices from the data.gov.in AGMARKNET dataset.
    """

    try:
        return await get_mandi_prices(
            state=state,
            commodity=commodity,
            limit=limit,
            offset=offset
        )

    except ValueError as error:
        raise HTTPException(
            status_code=502,
            detail=str(error)
        )