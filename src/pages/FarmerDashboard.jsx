import { useMemo, useState } from "react";
import { Activity, CloudSun, Droplets, Leaf, MapPin, Sprout, TrendingUp, ScanLine, Recycle, ArrowRight, Pencil, LoaderCircle } from "lucide-react";
import { apiPost } from "../services/api";
import "../styles/AgriWorkspace.css";

const agentDefinitions = [
  {
    id: "crop-planning", title: "Crop Planning", subtitle: "Find suitable crops for your farm", icon: Sprout,
    endpoint: "/api/agents/crop-planning",
    fields: [
      { name: "season", label: "Season", type: "select", options: ["kharif", "rabi", "summer"] },
      { name: "soil_type", label: "Soil type", type: "select", options: ["black", "clay", "loamy", "sandy"] },
      { name: "water_availability", label: "Water availability", type: "select", options: ["low", "medium", "high"] },
      { name: "land_area_acres", label: "Land area (acres)", type: "number" },
    ],
  },
  {
    id: "disease-diagnosis", title: "Disease Diagnosis", subtitle: "Check reported crop symptoms", icon: ScanLine,
    endpoint: "/api/agents/disease-diagnosis",
    fields: [
      { name: "crop", label: "Crop", type: "select", options: ["tomato", "rice", "cotton"] },
      { name: "symptoms", label: "Symptoms (separate with commas)", type: "textarea", placeholder: "brown spots, yellow leaves" },
    ],
  },
  {
    id: "organic-farming", title: "Organic Farming", subtitle: "Get organic practice suggestions", icon: Leaf,
    endpoint: "/api/agents/organic-farming",
    fields: [
      { name: "crop", label: "Crop", type: "text" },
      { name: "problem", label: "Problem", type: "select", options: ["pest", "soil", "fungal", "weed", "general"] },
    ],
  },
  {
    id: "irrigation", title: "Irrigation", subtitle: "Estimate water requirement", icon: Droplets,
    endpoint: "/api/agents/irrigation",
    fields: [
      { name: "crop", label: "Crop", type: "text" },
      { name: "land_area_acres", label: "Land area (acres)", type: "number" },
      { name: "growth_stage", label: "Growth stage", type: "select", options: ["initial", "vegetative", "flowering", "maturity"] },
      { name: "temperature_c", label: "Temperature (°C)", type: "number" },
      { name: "rainfall_mm", label: "Rainfall (mm)", type: "number" },
    ],
  },
  {
    id: "weather-intelligence", title: "Weather Intelligence", subtitle: "Analyse weather risks you enter", icon: CloudSun,
    endpoint: "/api/agents/weather-intelligence",
    fields: [
      { name: "crop", label: "Crop", type: "text" },
      { name: "temperature_c", label: "Temperature (°C)", type: "number" },
      { name: "humidity_percent", label: "Humidity (%)", type: "number" },
      { name: "rainfall_mm", label: "Rainfall (mm)", type: "number" },
      { name: "wind_speed_kmh", label: "Wind speed (km/h)", type: "number" },
    ],
  },
  {
    id: "market-intelligence", title: "Market Intelligence", subtitle: "Estimate revenue, cost and profit", icon: TrendingUp,
    endpoint: "/api/agents/market-intelligence",
    fields: [
      { name: "crop", label: "Crop", type: "text" },
      { name: "land_area_acres", label: "Land area (acres)", type: "number" },
      { name: "expected_yield_quintals_per_acre", label: "Expected yield (quintals/acre)", type: "number" },
      { name: "market_price_per_quintal", label: "Price (₹/quintal)", type: "number" },
      { name: "cultivation_cost_per_acre", label: "Cultivation cost (₹/acre)", type: "number" },
    ],
  },
];

const harvestFields = [
  { name: "crop", label: "Harvested crop", type: "text" },
  { name: "quantity_quintals", label: "Quantity (quintals)", type: "number" },
  { name: "quality", label: "Produce condition", type: "select", options: ["good", "overripe", "damaged"] },
  { name: "storage_available", label: "Cold / safe storage available?", type: "select", options: ["yes", "no"] },
];

function initialValues(agent, farm) {
  const values = {};
  agent.fields.forEach((field) => {
    if (field.name === "crop") values[field.name] = farm.crop || "tomato";
    else if (field.name === "season") values[field.name] = farm.season || "kharif";
    else if (field.name === "soil_type") values[field.name] = ["black", "clay", "loamy", "sandy"].includes(farm.soilType) ? farm.soilType : "loamy";
    else if (field.name === "water_availability") values[field.name] = ["low", "medium", "high"].includes(farm.water) ? farm.water : "medium";
    else if (field.name === "land_area_acres") values[field.name] = farm.farmSize || 1;
    else if (field.name === "symptoms") values[field.name] = "";
    else if (field.name === "problem") values[field.name] = "pest";
    else if (field.name === "growth_stage") values[field.name] = "vegetative";
    else if (field.name === "temperature_c") values[field.name] = 30;
    else if (field.name === "humidity_percent") values[field.name] = 65;
    else if (field.name === "rainfall_mm") values[field.name] = 0;
    else if (field.name === "wind_speed_kmh") values[field.name] = 10;
    else if (field.name === "expected_yield_quintals_per_acre") values[field.name] = 50;
    else if (field.name === "market_price_per_quintal") values[field.name] = 2000;
    else if (field.name === "cultivation_cost_per_acre") values[field.name] = 40000;
    else values[field.name] = "";
  });
  return values;
}

function Field({ field, value, onChange }) {
  if (field.type === "select") {
    return <label className="agr-agent-field"><span>{field.label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
  }
  if (field.type === "textarea") {
    return <label className="agr-agent-field"><span>{field.label}</span><textarea rows="3" value={value} placeholder={field.placeholder || ""} onChange={(e) => onChange(e.target.value)} /></label>;
  }
  return <label className="agr-agent-field"><span>{field.label}</span><input type={field.type} min={field.type === "number" ? "0" : undefined} step={field.type === "number" ? "any" : undefined} value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}

function FarmerDashboard() {
  const farm = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("agrinovaFarm") || "{}"); }
    catch { return {}; }
  }, []);
  const [activeId, setActiveId] = useState("crop-planning");
  const [values, setValues] = useState(() => initialValues(agentDefinitions[0], farm));
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [diseaseImageName, setDiseaseImageName] = useState("");

  const activeAgent = agentDefinitions.find((agent) => agent.id === activeId);
  const activeFields = activeAgent?.fields || harvestFields;

  const selectAgent = (agent) => {
    setActiveId(agent.id);
    setValues(initialValues(agent, farm));
    setResult(null);
    setError("");
    setDiseaseImageName("");
  };

  const runAgent = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      let payload = { ...values };
      if (activeId === "disease-diagnosis") {
        payload.symptoms = String(payload.symptoms || "").split(",").map((item) => item.trim()).filter(Boolean);
        if (!payload.symptoms.length) throw new Error("Enter at least one symptom, separated by commas.");
      }
      for (const key of Object.keys(payload)) {
        if (key !== "crop" && key !== "season" && key !== "soil_type" && key !== "water_availability" && key !== "growth_stage" && key !== "problem" && key !== "symptoms") {
          payload[key] = Number(payload[key]);
        }
      }
      const response = await apiPost(activeAgent.endpoint, payload);
      setResult(response);
    } catch (err) {
      setError(err.message || "Unable to run this agent.");
    } finally {
      setLoading(false);
    }
  };

  const runHarvestAdvisor = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const payload = {
        crop: String(values.crop || farm.crop || "tomato"),
        quantity_quintals: Number(values.quantity_quintals),
        quality: values.quality || "good",
        storage_available: values.storage_available === "yes",
      };
      const response = await apiPost("/api/agents/post-harvest", payload);
      setResult(response);
    } catch (err) {
      setError(err.message || "Unable to run post-harvest advisor.");
    } finally {
      setLoading(false);
    }
  };

  const openHarvest = () => {
    setActiveId("post-harvest");
    setValues({ crop: farm.crop || "tomato", quantity_quintals: 10, quality: "good", storage_available: "no" });
    setResult(null);
    setError("");
  };

  const isHarvest = activeId === "post-harvest";
  const activeTitle = isHarvest ? "Post-harvest Advisor" : activeAgent.title;

  return (
    <main className="farmer-dashboard agr-dashboard">
      <header className="agr-dashboard-header">
        <div>
          <span className="dashboard-eyebrow">AGRINOVA FARMER WORKSPACE</span>
          <h1>Your farm intelligence</h1>
          <p>Run the six decision-support agents using your farm information.</p>
        </div>
        <a className="agr-edit-farm" href="/farm-setup"><Pencil size={16} /> Edit farm</a>
      </header>

      <section className="farm-location-card">
        <div className="farm-location-left">
          <div className="farm-location-icon"><MapPin size={20} /></div>
          <div><span>YOUR FARM</span><h3>{farm.location || "Farm location not added"}</h3></div>
        </div>
        <div className="farm-location-details">
          <div><span>Farm size</span><strong>{farm.farmSize ? `${farm.farmSize} acres` : "Not set"}</strong></div>
          <div><span>Soil</span><strong>{farm.soilType || "Not set"}</strong></div>
          <div><span>Crop</span><strong>{farm.crop || "Not set"}</strong></div>
          <div><span>Season</span><strong>{farm.season || "Not set"}</strong></div>
        </div>
      </section>

      <section className="agr-agents-section">
        <div className="dashboard-section-title">
          <div><span className="dashboard-eyebrow">AGRINOVA AI SUITE</span><h2>Choose an agent</h2></div>
          <span className="agr-agent-count">6 agents available</span>
        </div>
        <div className="agr-agent-grid">
          {agentDefinitions.map((agent) => {
            const Icon = agent.icon;
            return (
              <button type="button" key={agent.id} className={`agr-agent-card ${activeId === agent.id ? "selected" : ""}`} onClick={() => selectAgent(agent)}>
                <span className="agr-agent-icon"><Icon size={21} /></span>
                <strong>{agent.title}</strong>
                <small>{agent.subtitle}</small>
                <span className="agr-agent-open">Open agent <ArrowRight size={14} /></span>
              </button>
            );
          })}
          <button type="button" className={`agr-agent-card agr-harvest-card ${isHarvest ? "selected" : ""}`} onClick={openHarvest}>
            <span className="agr-agent-icon"><Recycle size={21} /></span>
            <strong>Post-harvest Advisor</strong>
            <small>Storage, selling and value-add suggestions</small>
            <span className="agr-agent-open">Open advisor <ArrowRight size={14} /></span>
          </button>
        </div>
      </section>

      <section className="agr-agent-workspace">
        <div className="agr-workspace-heading">
          <div><span className="dashboard-eyebrow">AGENT WORKSPACE</span><h2>{activeTitle}</h2></div>
          <span className="agr-rule-badge">Rule-based decision support</span>
        </div>
        <form className="agr-agent-form" onSubmit={isHarvest ? runHarvestAdvisor : runAgent}>
          <div className="agr-agent-fields">
            {activeFields.map((field) => (
              <Field key={field.name} field={field} value={values[field.name] ?? ""} onChange={(value) => setValues((previous) => ({ ...previous, [field.name]: value }))} />
            ))}
            {activeId === "disease-diagnosis" && (
              <label className="agr-agent-field agr-upload-field">
                <span>Optional crop image (preview only)</span>
                <input type="file" accept="image/*" onChange={(e) => setDiseaseImageName(e.target.files?.[0]?.name || "")} />
                {diseaseImageName && <small>{diseaseImageName} selected. Current backend diagnoses from text symptoms, not image pixels.</small>}
              </label>
            )}
          </div>
          <button className="agr-run-button" type="submit" disabled={loading}>
            {loading ? <><LoaderCircle className="agr-spin" size={17} /> Analysing...</> : <>Run {activeTitle} <ArrowRight size={16} /></>}
          </button>
        </form>
        {error && <div className="agr-error">{error}</div>}
        {result && (
          <div className="agr-result-panel">
            <div className="agr-result-heading"><div><span className="dashboard-eyebrow">AGENT RESPONSE</span><h3>{result.agent || activeTitle}</h3></div><span className={`agr-status ${result.status === "success" ? "ok" : "review"}`}>{result.status || "completed"}</span></div>
            {result.recommendations && Array.isArray(result.recommendations) && result.recommendations.length > 0 && typeof result.recommendations[0] === "object" ? (
              <div className="agr-crop-results">{result.recommendations.map((item, index) => <article key={item.crop || index}><strong>{index + 1}. {item.crop || "Recommendation"}</strong><span>{item.suitability_score !== undefined ? `Suitability score: ${item.suitability_score}/100` : ""}</span>{item.reasons?.map((reason) => <small key={reason}>• {reason}</small>)}</article>)}</div>
            ) : null}
            <pre className="agr-json-result">{JSON.stringify(result, null, 2)}</pre>
            <p className="agr-result-note">Review the method and disclaimer in the response. These current agents use rule-based estimates, not trained image models or live market/weather feeds.</p>
          </div>
        )}
      </section>

      <section className="agr-farm-cycle">
        <div><Activity size={19} /><strong>Farm lifecycle</strong></div>
        <p>After crop selection, use Disease Diagnosis, Organic Farming, Irrigation and Weather Intelligence during cultivation. At harvest, use Market Intelligence and the Post-harvest Advisor for selling, storage and value-add planning.</p>
      </section>
    </main>
  );
}
export default FarmerDashboard;
