
from typing import Optional


def analyze_soil(
    soil_type: Optional[str] = None,
    ph: Optional[float] = None,
    nitrogen: Optional[float] = None,
    phosphorus: Optional[float] = None,
    potassium: Optional[float] = None,
    organic_carbon: Optional[float] = None,
    electrical_conductivity: Optional[float] = None,
    moisture_percent: Optional[float] = None
):
    observations = []
    missing_parameters = []

    values = {
        "soil_type": soil_type,
        "ph": ph,
        "nitrogen": nitrogen,
        "phosphorus": phosphorus,
        "potassium": potassium,
        "organic_carbon": organic_carbon,
        "electrical_conductivity": electrical_conductivity,
        "moisture_percent": moisture_percent
    }

    for name, value in values.items():
        if value is None:
            missing_parameters.append(name)

    if soil_type:
        observations.append({
            "parameter": "Soil type",
            "value": soil_type,
            "interpretation": (
                "Soil texture classification supplied by the farmer. "
                "Verify with a soil test if possible."
            )
        })

    if ph is not None:
        if ph < 0 or ph > 14:
            raise ValueError("Soil pH must be between 0 and 14.")

        if ph < 5.5:
            interpretation = "Strongly acidic soil; expert assessment recommended."
        elif ph < 6.5:
            interpretation = "Slightly acidic soil."
        elif ph <= 7.5:
            interpretation = "Approximately neutral soil."
        elif ph <= 8.5:
            interpretation = "Alkaline soil."
        else:
            interpretation = "Strongly alkaline soil; expert assessment recommended."

        observations.append({
            "parameter": "pH",
            "value": ph,
            "interpretation": interpretation
        })

    nutrient_ranges = {
        "nitrogen": (280, 560),
        "phosphorus": (10, 25),
        "potassium": (110, 280)
    }

    for nutrient, limits in nutrient_ranges.items():
        value = values[nutrient]

        if value is None:
            continue

        if value < 0:
            raise ValueError(f"{nutrient} cannot be negative.")

        observations.append({
            "parameter": nutrient,
            "value": value,
            "interpretation": (
                "Below the illustrative reference range."
                if value < limits[0]
                else "Within the illustrative reference range."
                if value <= limits[1]
                else "Above the illustrative reference range."
            ),
            "reference_range": list(limits),
            "unit": "kg/ha"
        })

    if organic_carbon is not None:
        if organic_carbon < 0:
            raise ValueError("Organic carbon cannot be negative.")

        observations.append({
            "parameter": "Organic carbon",
            "value": organic_carbon,
            "interpretation": (
                "Low organic carbon; assess organic matter management."
                if organic_carbon < 0.5
                else "Moderate organic carbon."
                if organic_carbon <= 0.75
                else "Higher organic carbon."
            ),
            "unit": "percent"
        })

    if electrical_conductivity is not None:
        if electrical_conductivity < 0:
            raise ValueError("Electrical conductivity cannot be negative.")

        observations.append({
            "parameter": "Electrical conductivity",
            "value": electrical_conductivity,
            "interpretation": (
                "Elevated salinity indicator; verify using laboratory guidance."
                if electrical_conductivity > 2
                else "No high salinity flag from this simple screening."
            ),
            "unit": "dS/m"
        })

    if moisture_percent is not None:
        if not 0 <= moisture_percent <= 100:
            raise ValueError("Moisture must be between 0 and 100 percent.")

        observations.append({
            "parameter": "Soil moisture",
            "value": moisture_percent,
            "interpretation": "Farmer-provided moisture reading.",
            "unit": "percent"
        })

    return {
        "status": "success",
        "agent": "Soil Intelligence",
        "observations": observations,
        "missing_parameters": missing_parameters,
        "source": "Farmer-provided soil test values",
        "data_quality": (
            "Partial analysis"
            if missing_parameters
            else "All supported parameters supplied"
        ),
        "important_note": (
            "Nutrient reference ranges are illustrative screening "
            "ranges, not universal Indian soil fertility standards. "
            "Units and extraction methods must be confirmed against "
            "the laboratory report. Do not use this result alone "
            "to prescribe fertiliser quantities."
        )
    }
