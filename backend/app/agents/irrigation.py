
from typing import Any

# Simplified daily water requirement in mm.
# These are illustrative planning values, not live agronomic measurements.
CROP_WATER_NEEDS = {
    "rice": 6.0,
    "wheat": 4.5,
    "tomato": 5.0,
    "cotton": 5.5,
    "soybean": 4.5,
    "maize": 5.0,
    "chickpea": 3.5
}

GROWTH_STAGE_FACTORS = {
    "initial": 0.75,
    "vegetative": 1.0,
    "flowering": 1.15,
    "maturity": 0.8
}


def calculate_irrigation(
    crop: str,
    land_area_acres: float,
    growth_stage: str,
    temperature_c: float,
    rainfall_mm: float = 0
) -> dict[str, Any]:

    crop = crop.strip().lower()
    growth_stage = growth_stage.strip().lower()

    if crop not in CROP_WATER_NEEDS:
        raise ValueError(
            "Supported crops: rice, wheat, tomato, cotton, soybean, maize, chickpea."
        )

    if growth_stage not in GROWTH_STAGE_FACTORS:
        raise ValueError(
            "Growth stage must be initial, vegetative, flowering, or maturity."
        )

    if land_area_acres <= 0:
        raise ValueError("Land area must be greater than zero.")

    if temperature_c < -10 or temperature_c > 60:
        raise ValueError("Temperature must be between -10 and 60 Celsius.")

    if rainfall_mm < 0:
        raise ValueError("Rainfall cannot be negative.")

    base_need = CROP_WATER_NEEDS[crop]
    stage_factor = GROWTH_STAGE_FACTORS[growth_stage]

    temperature_factor = 1.0
    if temperature_c >= 35:
        temperature_factor = 1.2
    elif temperature_c >= 30:
        temperature_factor = 1.1
    elif temperature_c < 20:
        temperature_factor = 0.9

    daily_need_mm = base_need * stage_factor * temperature_factor

    # Simplified estimate: subtract supplied rainfall from water need.
    effective_rainfall_mm = min(rainfall_mm, daily_need_mm)
    irrigation_need_mm = max(0, daily_need_mm - effective_rainfall_mm)

    # 1 mm water over 1 acre = approximately 4,046.86 litres.
    total_water_litres = irrigation_need_mm * land_area_acres * 4046.86

    return {
        "agent": "Irrigation Intelligence Agent",
        "status": "success",
        "crop": crop,
        "land_area_acres": land_area_acres,
        "growth_stage": growth_stage,
        "temperature_c": temperature_c,
        "rainfall_mm": rainfall_mm,
        "estimated_daily_crop_water_need_mm": round(daily_need_mm, 2),
        "estimated_irrigation_requirement_mm": round(irrigation_need_mm, 2),
        "estimated_water_required_litres_per_day": round(total_water_litres, 2),
        "recommendation": (
            "Rainfall may be sufficient; check soil moisture before irrigation."
            if irrigation_need_mm == 0
            else "Plan irrigation based on soil moisture and the estimated water requirement."
        ),
        "method": "Simplified rule-based water requirement estimation",
        "disclaimer": (
            "This is an illustrative estimate, not a scientific irrigation prescription. "
            "Actual water needs depend on soil, crop variety, local climate, "
            "evapotranspiration, irrigation efficiency and field conditions. "
            "Consult a local agricultural expert before making irrigation decisions."
        )
    }
