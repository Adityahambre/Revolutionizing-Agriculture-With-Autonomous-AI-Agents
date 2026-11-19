
from typing import Any


CROP_PROFILES = {
    "rice": {
        "seasons": ["kharif"],
        "soils": ["clay", "loamy"],
        "water": ["high"],
    },
    "wheat": {
        "seasons": ["rabi"],
        "soils": ["loamy", "clay"],
        "water": ["medium"],
    },
    "soybean": {
        "seasons": ["kharif"],
        "soils": ["loamy", "black"],
        "water": ["medium"],
    },
    "cotton": {
        "seasons": ["kharif"],
        "soils": ["black", "loamy"],
        "water": ["medium", "low"],
    },
    "maize": {
        "seasons": ["kharif", "rabi"],
        "soils": ["loamy", "black"],
        "water": ["medium"],
    },
    "chickpea": {
        "seasons": ["rabi"],
        "soils": ["black", "loamy"],
        "water": ["low", "medium"],
    },
    "tomato": {
        "seasons": ["kharif", "rabi", "summer"],
        "soils": ["loamy"],
        "water": ["medium"],
    },
}


def plan_crops(
    season: str,
    soil_type: str,
    water_availability: str,
    land_area_acres: float,
) -> dict[str, Any]:

    season = season.strip().lower()
    soil_type = soil_type.strip().lower()
    water_availability = water_availability.strip().lower()

    if season not in ["kharif", "rabi", "summer"]:
        raise ValueError("Season must be kharif, rabi, or summer.")

    if soil_type not in ["black", "clay", "loamy", "sandy"]:
        raise ValueError("Soil must be black, clay, loamy, or sandy.")

    if water_availability not in ["low", "medium", "high"]:
        raise ValueError("Water availability must be low, medium, or high.")

    if not 0 < land_area_acres <= 10000:
        raise ValueError("Land area must be greater than 0 and at most 10000 acres.")

    results = []

    for crop, profile in CROP_PROFILES.items():
        score = 0
        reasons = []

        if season in profile["seasons"]:
            score += 40
            reasons.append("Suitable season in the basic crop profile.")
        else:
            reasons.append("Season does not match the basic crop profile.")

        if soil_type in profile["soils"]:
            score += 35
            reasons.append("Soil type matches the basic crop profile.")
        else:
            reasons.append("Soil type does not match the basic crop profile.")

        if water_availability in profile["water"]:
            score += 25
            reasons.append("Water availability matches the basic crop profile.")
        else:
            reasons.append("Water availability needs further assessment.")

        results.append({
            "crop": crop,
            "suitability_score": score,
            "reasons": reasons,
        })

    results.sort(
        key=lambda item: item["suitability_score"],
        reverse=True
    )

    return {
        "agent": "Crop Planning Agent",
        "status": "success",
        "farm_inputs": {
            "season": season,
            "soil_type": soil_type,
            "water_availability": water_availability,
            "land_area_acres": land_area_acres,
        },
        "recommendations": results[:5],
        "method": "Rule-based crop suitability scoring",
        "disclaimer": (
            "Preliminary recommendations only. Scores are heuristic, "
            "not scientifically validated probabilities. Confirm local "
            "climate, soil test, variety, sowing window and agricultural "
            "expert advice before cultivation."
        ),
    }
