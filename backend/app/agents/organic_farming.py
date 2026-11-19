
from typing import Any


ORGANIC_PRACTICES = {
    "pest": {
        "title": "Organic Pest Management",
        "recommendations": [
            "Monitor crops regularly for pest activity.",
            "Use physical traps and barriers where suitable.",
            "Encourage beneficial insects and natural predators.",
            "Consider locally approved neem-based products after checking the label.",
            "Remove heavily infested plant parts where practical."
        ],
        "prevention": "Practice crop rotation, field sanitation and regular pest monitoring."
    },
    "soil": {
        "title": "Organic Soil Fertility Management",
        "recommendations": [
            "Use mature, well-decomposed compost.",
            "Consider vermicompost to improve soil organic matter.",
            "Use suitable green manure crops.",
            "Retain healthy crop residues where appropriate.",
            "Conduct soil testing before changing nutrient applications."
        ],
        "prevention": "Maintain organic matter and avoid unnecessary soil disturbance."
    },
    "fungal": {
        "title": "Organic Fungal Disease Management",
        "recommendations": [
            "Remove severely infected plant material where practical.",
            "Avoid overhead irrigation when possible.",
            "Improve crop spacing and air circulation.",
            "Use healthy seeds and disease-resistant varieties.",
            "Consider only locally approved biological products after expert guidance."
        ],
        "prevention": "Maintain field sanitation and avoid prolonged leaf wetness."
    },
    "weed": {
        "title": "Organic Weed Management",
        "recommendations": [
            "Use organic mulch where suitable.",
            "Practice timely manual or mechanical weeding.",
            "Use crop rotation to disrupt weed cycles.",
            "Consider suitable cover crops.",
            "Prevent weeds from producing and spreading seeds."
        ],
        "prevention": "Combine preventive measures with timely field monitoring."
    },
    "general": {
        "title": "General Organic Farming Practices",
        "recommendations": [
            "Increase soil organic matter using mature compost.",
            "Practice crop rotation.",
            "Use mulching to conserve moisture and suppress weeds.",
            "Encourage beneficial insects.",
            "Monitor crops regularly for pests and disease."
        ],
        "prevention": "Combine soil health, biodiversity and integrated pest management."
    }
}


def recommend_organic_practices(
    crop: str,
    problem: str
) -> dict[str, Any]:

    crop = crop.strip().lower()
    problem = problem.strip().lower()

    if not crop:
        raise ValueError("Crop name is required.")

    if problem not in ORGANIC_PRACTICES:
        raise ValueError(
            "Problem must be pest, soil, fungal, weed, or general."
        )

    practice = ORGANIC_PRACTICES[problem]

    return {
        "agent": "Organic Farming Agent",
        "status": "success",
        "crop": crop,
        "problem": problem,
        "recommendation_category": practice["title"],
        "recommendations": practice["recommendations"],
        "prevention": practice["prevention"],
        "method": "Rule-based organic farming knowledge base",
        "disclaimer": (
            "Recommendations are general guidance, not crop-specific "
            "treatment prescriptions. Check local regulations and consult "
            "an agricultural expert before applying any product. "
            "Organic practices alone do not guarantee organic certification."
        )
    }
