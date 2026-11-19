from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.agents.crop_planning import plan_crops
from app.agents.disease_diagnosis import diagnose_disease
from app.agents.organic_farming import recommend_organic_practices
from app.agents.irrigation import calculate_irrigation
from app.agents.weather_intelligence import analyze_weather
from app.agents.market_intelligence import analyze_market
from app.agents.post_harvest import advise_post_harvest

router = APIRouter(prefix="/api/agents", tags=["AI Agents"])


class CropPlanningRequest(BaseModel):
    season: str
    soil_type: str
    water_availability: str
    land_area_acres: float = Field(gt=0, le=10000)


class DiseaseDiagnosisRequest(BaseModel):
    crop: str
    symptoms: list[str] = Field(min_length=1, max_length=20)


class OrganicFarmingRequest(BaseModel):
    crop: str = Field(min_length=1, max_length=50)
    problem: str = Field(min_length=1, max_length=30)


class IrrigationRequest(BaseModel):
    crop: str = Field(min_length=1, max_length=50)
    land_area_acres: float = Field(gt=0, le=10000)
    growth_stage: str
    temperature_c: float
    rainfall_mm: float = Field(default=0, ge=0)


class WeatherRequest(BaseModel):
    crop: str = Field(min_length=1, max_length=50)
    temperature_c: float
    humidity_percent: float = Field(ge=0, le=100)
    rainfall_mm: float = Field(ge=0)
    wind_speed_kmh: float = Field(ge=0, le=300)


class MarketIntelligenceRequest(BaseModel):
    crop: str = Field(min_length=1, max_length=50)
    land_area_acres: float = Field(gt=0, le=10000)
    expected_yield_quintals_per_acre: float = Field(gt=0)
    market_price_per_quintal: float = Field(ge=0)
    cultivation_cost_per_acre: float = Field(ge=0)


class PostHarvestRequest(BaseModel):
    crop: str = Field(min_length=1, max_length=50)
    quantity_quintals: float = Field(gt=0)
    quality: str
    storage_available: bool = False


@router.post("/crop-planning")
def crop_planning(request: CropPlanningRequest):
    try:
        return plan_crops(**request.model_dump())
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.post("/disease-diagnosis")
def disease_diagnosis(request: DiseaseDiagnosisRequest):
    try:
        return diagnose_disease(**request.model_dump())
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.post("/organic-farming")
def organic_farming(request: OrganicFarmingRequest):
    try:
        return recommend_organic_practices(**request.model_dump())
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.post("/irrigation")
def irrigation(request: IrrigationRequest):
    try:
        return calculate_irrigation(**request.model_dump())
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.post("/weather-intelligence")
def weather_intelligence(request: WeatherRequest):
    try:
        return analyze_weather(**request.model_dump())
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.post("/market-intelligence")
def market_intelligence(request: MarketIntelligenceRequest):
    try:
        return analyze_market(**request.model_dump())
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.post("/post-harvest")
def post_harvest(request: PostHarvestRequest):
    try:
        return advise_post_harvest(**request.model_dump())
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
