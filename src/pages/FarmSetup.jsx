import { useMemo, useState } from "react";
import { ArrowRight, LocateFixed, MapPin, Sprout } from "lucide-react";
import area from "@turf/area";
import FarmMap from "../components/FarmMap";
import "../styles/AgriWorkspace.css";

function FarmSetup() {
  const existing = JSON.parse(localStorage.getItem("agrinovaFarm") || "{}");
  const [location, setLocation] = useState(existing.location || "");
  const [farmSize, setFarmSize] = useState(existing.farmSize || "");
  const [soilType, setSoilType] = useState(existing.soilType || "loamy");
  const [water, setWater] = useState(existing.water || "medium");
  const [crop, setCrop] = useState(existing.crop || "tomato");
  const [season, setSeason] = useState(existing.season || "kharif");
  const [mode, setMode] = useState("pin");
  const [mapType, setMapType] = useState("street");
  const [pin, setPin] = useState(existing.pin || null);
  const [boundary, setBoundary] = useState(existing.boundary || []);
  const [soilImageName, setSoilImageName] = useState(existing.soilImageName || "");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const calculatedAcres = useMemo(() => {
    if (boundary.length < 3) return 0;
    const ring = [...boundary, boundary[0]].map(([lat, lng]) => [lng, lat]);
    const squareMetres = area({
      type: "Feature",
      properties: {},
      geometry: { type: "Polygon", coordinates: [ring] },
    });
    return squareMetres / 4046.8564224;
  }, [boundary]);

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Location is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPin([coords.latitude, coords.longitude]);
        setNotice("Current location selected. You can adjust the pin on the map.");
        setError("");
      },
      () => setError("Location permission was not granted. You can select a point manually on the map."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const areaAcres = calculatedAcres > 0 ? calculatedAcres : Number(farmSize);
    if (!location.trim()) return setError("Enter your village, town or farm location.");
    if (!areaAcres || areaAcres <= 0) return setError("Enter farm size or draw a boundary with at least three points.");
    if (mode === "boundary" && boundary.length > 0 && boundary.length < 3) {
      return setError("Add at least three boundary points, or clear the boundary and enter the farm size manually.");
    }

    const boundaryCenter = boundary.length
      ? [
          boundary.reduce((sum, point) => sum + point[0], 0) / boundary.length,
          boundary.reduce((sum, point) => sum + point[1], 0) / boundary.length,
        ]
      : null;
    const farm = {
      location: location.trim(),
      farmSize: Number(areaAcres.toFixed(3)),
      soilType,
      water,
      crop,
      season,
      pin: pin || boundaryCenter,
      boundary,
      soilImageName,
      areaSource: calculatedAcres > 0 ? "map_boundary_estimate" : "manually_entered",
    };
    localStorage.setItem("agrinovaFarm", JSON.stringify(farm));
    window.location.href = "/dashboard";
  };

  return (
    <main className="farm-setup">
      <div className="farm-setup-top">
        <a href="/" className="farm-setup-logo"><span>A</span>AgriNova</a>
        <div className="farm-setup-progress"><span>01</span><div><strong>Farm profile</strong><small>Setup your farm</small></div></div>
      </div>

      <div className="farm-setup-content agr-farm-setup-grid">
        <section className="farm-setup-introduction">
          <div className="farm-setup-icon"><Sprout size={25} /></div>
          <span className="farm-setup-label">YOUR FARM</span>
          <h1>Let's understand your farm.</h1>
          <p>Choose a point or draw your farm boundary. AgriNova will use the saved farm details to prefill the relevant agent forms.</p>
          <div className="farm-setup-note"><span>✓</span><p>You can edit your farm details and map selection later.</p></div>
        </section>

        <section className="farm-setup-card agr-farm-card">
          <form onSubmit={handleSubmit}>
            <div className="farm-field">
              <label>Farm location</label>
              <div className="farm-input-wrapper">
                <MapPin size={18} />
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Village, taluka, district" />
              </div>
            </div>

            <div className="agr-map-toolbar">
              <div>
                <strong>Select farm on map</strong>
                <p>Click the map to place a pin or add boundary points.</p>
              </div>
              <button type="button" className="agr-secondary-button" onClick={useMyLocation}><LocateFixed size={16} /> Use my location</button>
            </div>

            <div className="agr-map-controls">
              <button type="button" className={mode === "pin" ? "active" : ""} onClick={() => setMode("pin")}>Select one point</button>
              <button type="button" className={mode === "boundary" ? "active" : ""} onClick={() => setMode("boundary")}>Draw boundary</button>
              <span className="agr-map-control-spacer" />
              <button type="button" className={mapType === "street" ? "active" : ""} onClick={() => setMapType("street")}>Street</button>
              <button type="button" className={mapType === "satellite" ? "active" : ""} onClick={() => setMapType("satellite")}>Satellite</button>
            </div>

            <FarmMap
              mode={mode}
              pin={pin}
              boundary={boundary}
              mapType={mapType}
              onPin={(point) => { setPin(point); setNotice("Farm pin selected."); }}
              onBoundaryPoint={(point) => { setBoundary((previous) => [...previous, point]); setNotice("Boundary point added."); }}
            />
            <div className="agr-map-footer">
              <span>{pin ? `Pin: ${pin[0].toFixed(5)}, ${pin[1].toFixed(5)}` : "No pin selected"}</span>
              <span>{boundary.length} boundary points</span>
              <button type="button" onClick={() => { setPin(null); setBoundary([]); setNotice("Map selection cleared."); }}>Clear map</button>
              {mode === "boundary" && <button type="button" onClick={() => setNotice(boundary.length >= 3 ? "Boundary ready. Area is calculated below." : "Add at least three points to complete the boundary.")}>Finish boundary</button>}
            </div>
            {calculatedAcres > 0 && (
              <div className="agr-area-result">
                <strong>{calculatedAcres.toFixed(3)} acres</strong>
                <span>Approx. {(calculatedAcres * 0.404686).toFixed(3)} hectares from drawn boundary</span>
              </div>
            )}
            {notice && <p className="agr-notice">{notice}</p>}

            <div className="farm-field">
              <label>Farm size (acres) {calculatedAcres > 0 && <span className="optional">Calculated from boundary</span>}</label>
              <div className="farm-size-wrapper">
                <input type="number" min="0.01" step="0.01" value={calculatedAcres > 0 ? calculatedAcres.toFixed(3) : farmSize} onChange={(e) => setFarmSize(e.target.value)} placeholder="Enter farm size" disabled={calculatedAcres > 0} />
                <span>Acres</span>
              </div>
            </div>

            <div className="farm-field">
              <label>Soil type</label>
              <div className="farm-select-wrapper">
                <select value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                  <option value="black">Black soil</option><option value="clay">Clay soil</option><option value="loamy">Loamy soil</option><option value="sandy">Sandy soil</option>
                </select>
              </div>
            </div>

            <div className="farm-field">
              <label>Water availability</label>
              <div className="water-options">
                <button type="button" className={`water-option ${water === "high" ? "active" : ""}`} onClick={() => setWater("high")}>Good</button>
                <button type="button" className={`water-option ${water === "medium" ? "active" : ""}`} onClick={() => setWater("medium")}>Limited</button>
                <button type="button" className={`water-option ${water === "low" ? "active" : ""}`} onClick={() => setWater("low")}>Rainfed</button>
              </div>
            </div>

            <div className="agr-form-two">
              <div className="farm-field">
                <label>Season</label>
                <div className="farm-select-wrapper"><select value={season} onChange={(e) => setSeason(e.target.value)}><option value="kharif">Kharif</option><option value="rabi">Rabi</option><option value="summer">Summer</option></select></div>
              </div>
              <div className="farm-field">
                <label>Current / planned crop</label>
                <div className="farm-select-wrapper"><select value={crop} onChange={(e) => setCrop(e.target.value)}><option value="tomato">Tomato</option><option value="rice">Rice</option><option value="wheat">Wheat</option><option value="cotton">Cotton</option><option value="soybean">Soybean</option><option value="maize">Maize</option><option value="chickpea">Chickpea</option></select></div>
              </div>
            </div>

            <div className="farm-field">
              <label>Soil image (optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setSoilImageName(e.target.files?.[0]?.name || "")} />
              {soilImageName && <p className="agr-notice">Selected image: {soilImageName}. Image-based soil analysis is not connected yet.</p>}
            </div>

            {error && <p className="farm-setup-error">{error}</p>}
            <button type="submit" className="farm-continue-button">Save farm and open dashboard <ArrowRight size={17} /></button>
          </form>
          <p className="farm-card-footer">Map area is approximate. Confirm land area and soil details locally before making farming decisions.</p>
        </section>
      </div>
    </main>
  );
}
export default FarmSetup;
