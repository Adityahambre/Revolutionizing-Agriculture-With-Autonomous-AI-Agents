
from typing import Any


def analyze_market(
    crop: str,
    land_area_acres: float,
    expected_yield_quintals_per_acre: float,
    market_price_per_quintal: float,
    cultivation_cost_per_acre: float
) -> dict[str, Any]:

    crop = crop.strip().lower()

    if not crop:
        raise ValueError("Crop name is required.")

    if land_area_acres <= 0:
        raise ValueError("Land area must be greater than zero.")

    if expected_yield_quintals_per_acre <= 0:
        raise ValueError("Expected yield must be greater than zero.")

    if market_price_per_quintal < 0:
        raise ValueError("Market price cannot be negative.")

    if cultivation_cost_per_acre < 0:
        raise ValueError("Cultivation cost cannot be negative.")

    total_yield = land_area_acres * expected_yield_quintals_per_acre

    total_revenue = total_yield * market_price_per_quintal

    total_cost = land_area_acres * cultivation_cost_per_acre

    estimated_profit = total_revenue - total_cost

    break_even_price = total_cost / total_yield

    profit_margin = (
        (estimated_profit / total_revenue) * 100
        if total_revenue > 0 else 0
    )

    if estimated_profit > 0:
        assessment = "Estimated profitable outcome"
        recommendation = (
            "Compare prices from multiple buyers and account for "
            "transport, storage and other selling expenses."
        )
    elif estimated_profit == 0:
        assessment = "Estimated break-even outcome"
        recommendation = (
            "Review production costs and compare alternative buyers "
            "before selling."
        )
    else:
        assessment = "Estimated loss"
        recommendation = (
            "Review cultivation costs, expected yield and available "
            "selling prices. Consult local agricultural market experts."
        )

    return {
        "agent": "Market Intelligence Agent",
        "status": "success",
        "crop": crop,
        "land_area_acres": land_area_acres,
        "estimated_total_yield_quintals": round(total_yield, 2),
        "user_provided_market_price_per_quintal": market_price_per_quintal,
        "estimated_total_revenue": round(total_revenue, 2),
        "estimated_total_cultivation_cost": round(total_cost, 2),
        "estimated_profit_or_loss": round(estimated_profit, 2),
        "estimated_break_even_price_per_quintal": round(break_even_price, 2),
        "estimated_profit_margin_percent": round(profit_margin, 2),
        "assessment": assessment,
        "recommendation": recommendation,
        "method": "Rule-based farm economics calculation",
        "data_source": "User-provided yield, price and cost values",
        "disclaimer": (
            "These are estimates based on user-provided figures. "
            "They are not live mandi prices or guaranteed profits. "
            "Actual results depend on quality, market fluctuations, "
            "transport, storage, commissions and other expenses."
        )
    }
