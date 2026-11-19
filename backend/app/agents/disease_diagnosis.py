
from typing import Any


DISEASE_DATABASE = {
    "tomato": [
        {
            "name": "Early Blight",
            "symptoms": ["brown spots", "yellow leaves", "concentric rings"],
            "actions": [
                "Remove heavily affected leaves.",
                "Avoid overhead irrigation.",
                "Improve air circulation.",
                "Consult a local agricultural expert about suitable treatment."
            ],
            "prevention": "Use healthy seeds and avoid prolonged leaf wetness."
        },
        {
            "name": "Leaf Curl",
            "symptoms": ["curled leaves", "yellow leaves", "stunted growth"],
            "actions": [
                "Inspect plants for whiteflies.",
                "Remove severely affected plants if viral infection is confirmed.",
                "Control weeds around the field.",
                "Seek local agricultural guidance before applying pesticides."
            ],
            "prevention": "Use resistant varieties and monitor insect vectors."
        },
        {
            "name": "Possible Nutrient Deficiency",
            "symptoms": ["yellow leaves", "slow growth", "pale leaves"],
            "actions": [
                "Get a soil test.",
                "Check irrigation and drainage.",
                "Review fertilizer application with an agricultural expert."
            ],
            "prevention": "Maintain balanced nutrition based on soil test results."
        }
    ],
    "rice": [
        {
            "name": "Possible Rice Blast",
            "symptoms": ["diamond shaped spots", "brown spots", "leaf lesions"],
            "actions": [
                "Inspect nearby plants for similar symptoms.",
                "Avoid excessive nitrogen application.",
                "Consult an agricultural expert for confirmation and treatment."
            ],
            "prevention": "Use locally recommended resistant varieties."
        },
        {
            "name": "Possible Bacterial Leaf Blight",
            "symptoms": ["yellow leaf edges", "wilting", "leaf drying"],
            "actions": [
                "Inspect the field for spreading symptoms.",
                "Maintain proper field water management.",
                "Seek expert confirmation before treatment."
            ],
            "prevention": "Use healthy seed and locally recommended varieties."
        }
    ],
    "cotton": [
        {
            "name": "Possible Alternaria Leaf Spot",
            "symptoms": ["brown spots", "leaf spots", "concentric rings"],
            "actions": [
                "Remove severely affected plant debris where practical.",
                "Monitor disease spread.",
                "Consult a local agricultural expert."
            ],
            "prevention": "Maintain field sanitation and appropriate crop spacing."
        },
        {
            "name": "Possible Nutrient Deficiency",
            "symptoms": ["yellow leaves", "pale leaves", "slow growth"],
            "actions": [
                "Conduct soil testing.",
                "Check irrigation and root health.",
                "Adjust nutrients only according to test results."
            ],
            "prevention": "Follow a soil-test-based nutrient management plan."
        }
    ]
}


def diagnose_disease(
    crop: str,
    symptoms: list[str]
) -> dict[str, Any]:

    crop = crop.strip().lower()

    if crop not in DISEASE_DATABASE:
        return {
            "agent": "Disease Diagnosis Agent",
            "status": "needs_review",
            "crop": crop,
            "possible_issues": [],
            "message": "No diagnosis profile is available for this crop yet.",
            "recommendation": "Consult a local agricultural expert."
        }

    normalized_symptoms = {
        symptom.strip().lower()
        for symptom in symptoms
        if symptom.strip()
    }

    if not normalized_symptoms:
        raise ValueError("Please provide at least one crop symptom.")

    results = []

    for disease in DISEASE_DATABASE[crop]:
        matched = [
            symptom
            for symptom in disease["symptoms"]
            if symptom in normalized_symptoms
        ]

        if matched:
            score = len(matched) / len(disease["symptoms"]) * 100

            results.append({
                "possible_issue": disease["name"],
                "matched_symptoms": matched,
                "symptom_match_score": round(score, 2),
                "recommended_actions": disease["actions"],
                "prevention": disease["prevention"]
            })

    results.sort(
        key=lambda item: item["symptom_match_score"],
        reverse=True
    )

    return {
        "agent": "Disease Diagnosis Agent",
        "status": "success" if results else "needs_review",
        "crop": crop,
        "reported_symptoms": list(normalized_symptoms),
        "possible_issues": results[:3],
        "method": "Rule-based symptom matching",
        "disclaimer": (
            "This is preliminary symptom matching, not a confirmed diagnosis. "
            "Different diseases and nutrient problems can have similar symptoms. "
            "Get expert confirmation before applying treatment."
        )
    }

