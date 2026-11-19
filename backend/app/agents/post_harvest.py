from typing import Any


def advise_post_harvest(
    crop: str,
    quantity_quintals: float,
    quality: str,
    storage_available: bool
) -> dict[str, Any]:
    crop = crop.strip().lower()
    quality = quality.strip().lower()

    if not crop:
        raise ValueError("Crop name is required.")
    if quantity_quintals <= 0:
        raise ValueError("Quantity must be greater than zero.")
    if quality not in {"good", "overripe", "damaged"}:
        raise ValueError("Quality must be good, overripe, or damaged.")

    suggestions = []
    value_add = []

    if quality == "good":
        suggestions.extend([
            "Sort and grade produce by size, maturity and visible quality.",
            "Use clean, ventilated, food-grade crates instead of overfilled sacks.",
            "Compare buyer prices and transport costs before dispatch."
        ])
        if storage_available:
            suggestions.append("Store in crop-appropriate, clean conditions and avoid temperature or humidity changes.")
        else:
            suggestions.append("Prioritise timely sale because long storage without suitable facilities can increase losses.")
    elif quality == "overripe":
        suggestions.extend([
            "Separate overripe produce from fresh-grade produce.",
            "Sell or process quickly; avoid mixing overripe produce with good-quality lots.",
            "Check food safety and local processing requirements before reuse."
        ])
    else:
        suggestions.extend([
            "Separate damaged or spoiled produce from healthy produce.",
            "Do not sell unsafe or spoiled produce for human consumption.",
            "Compost suitable plant waste only when it is safe and disease-free; dispose of contaminated material responsibly."
        ])

    crop_uses = {
        "tomato": ["Explore licensed processing options such as puree, pulp or sauce for suitable, safe-grade tomatoes."],
        "mango": ["Explore pulp, dried mango or pickle processing for suitable-grade fruit."],
        "banana": ["Explore chips, flour or animal-feed routes only where food safety and local rules allow."],
        "onion": ["Consider grading, curing and ventilated storage before sale."],
        "potato": ["Consider grading, curing and suitable ventilated storage."],
    }
    value_add.extend(crop_uses.get(crop, [
        "Explore local processors, farmer producer organisations or food businesses that accept this crop.",
        "Check processing quality standards and buyer requirements before committing produce."
    ]))

    return {
        "agent": "Post-harvest Advisor",
        "status": "success",
        "crop": crop,
        "quantity_quintals": round(quantity_quintals, 2),
        "quality": quality,
        "storage_available": storage_available,
        "handling_and_selling_suggestions": suggestions,
        "possible_value_add_options": value_add,
        "method": "Rule-based post-harvest guidance",
        "disclaimer": "Suggestions are general. Confirm crop-specific storage temperature, food safety, processing permissions and buyer requirements with local experts."
    }
