import {
    ArrowRight,
    MapPin,
    Sprout,
    Droplets,
    Mountain,
  } from "lucide-react";
  import { useState } from "react";
  
  function FarmSetup() {
    const [location, setLocation] = useState("");
    const [farmSize, setFarmSize] = useState("");
    const [soilType, setSoilType] = useState("");
    const [water, setWater] = useState("");
    const [crop, setCrop] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!location.trim()) {
        setError("Please enter your farm location.");
        return;
      }
  
      if (!farmSize) {
        setError("Please enter your farm size.");
        return;
      }
  
      if (!soilType) {
        setError("Please select your soil type.");
        return;
      }
  
      if (!water) {
        setError("Please select your water availability.");
        return;
      }
  
      const farmData = {
        location,
        farmSize,
        soilType,
        water,
        crop,
      };
  
      localStorage.setItem(
        "agrinovaFarm",
        JSON.stringify(farmData)
      );
  
      setError("");
  
      window.location.href = "/dashboard";
    };
  
    return (
      <main className="farm-setup">
  
        {/* TOP BAR */}
  
        <div className="farm-setup-top">
  
          <a href="/" className="farm-setup-logo">
            <span>A</span>
            AgriNova
          </a>
  
          <div className="farm-setup-progress">
            <span>01</span>
  
            <div>
              <strong>Farm profile</strong>
              <small>Step 1 of 2</small>
            </div>
          </div>
  
        </div>
  
  
        {/* MAIN CONTENT */}
  
        <div className="farm-setup-content">
  
          {/* LEFT */}
  
          <div className="farm-setup-introduction">
  
            <div className="farm-setup-icon">
              <Sprout size={25} />
            </div>
  
            <span className="farm-setup-label">
              YOUR FARM
            </span>
  
            <h1>
              Let's understand
              <br />
              your farm.
            </h1>
  
            <p>
              Tell us a few simple things about your farm.
              AgriNova will use this information to understand
              your conditions and recommend suitable crops.
            </p>
  
            <div className="farm-setup-note">
              <span>✓</span>
  
              <p>
                You can update your farm information anytime.
              </p>
            </div>
  
          </div>
  
  
          {/* RIGHT FORM */}
  
          <div className="farm-setup-card">
  
            <form onSubmit={handleSubmit}>
  
              {/* LOCATION */}
  
              <div className="farm-field">
  
                <label>
                  Where is your farm?
                </label>
  
                <div className="farm-input-wrapper">
  
                  <MapPin size={18} />
  
                  <input
                    type="text"
                    placeholder="Village, city or district"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setError("");
                    }}
                  />
  
                </div>
  
              </div>
  
  
              {/* FARM SIZE */}
  
              <div className="farm-field">
  
                <label>
                  How large is your farm?
                </label>
  
                <div className="farm-size-wrapper">
  
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Enter farm size"
                    value={farmSize}
                    onChange={(e) => {
                      setFarmSize(e.target.value);
                      setError("");
                    }}
                  />
  
                  <span>Acres</span>
  
                </div>
  
              </div>
  
  
              {/* SOIL */}
  
              <div className="farm-field">
  
                <label>
                  What type of soil do you have?
                </label>
  
                <div className="farm-select-wrapper">
  
                  <Mountain size={18} />
  
                  <select
                    value={soilType}
                    onChange={(e) => {
                      setSoilType(e.target.value);
                      setError("");
                    }}
                  >
  
                    <option value="">
                      Select soil type
                    </option>
  
                    <option value="black">
                      Black Soil
                    </option>
  
                    <option value="red">
                      Red Soil
                    </option>
  
                    <option value="alluvial">
                      Alluvial Soil
                    </option>
  
                    <option value="sandy">
                      Sandy Soil
                    </option>
  
                    <option value="loamy">
                      Loamy Soil
                    </option>
  
                    <option value="unknown">
                      I don't know
                    </option>
  
                  </select>
  
                </div>
  
              </div>
  
  
              {/* WATER */}
  
              <div className="farm-field">
  
                <label>
                  How is your water availability?
                </label>
  
                <div className="water-options">
  
                  <button
                    type="button"
                    className={
                      water === "good"
                        ? "water-option active"
                        : "water-option"
                    }
                    onClick={() => {
                      setWater("good");
                      setError("");
                    }}
                  >
                    <Droplets size={16} />
                    Good
                  </button>
  
                  <button
                    type="button"
                    className={
                      water === "limited"
                        ? "water-option active"
                        : "water-option"
                    }
                    onClick={() => {
                      setWater("limited");
                      setError("");
                    }}
                  >
                    Limited
                  </button>
  
                  <button
                    type="button"
                    className={
                      water === "rainfed"
                        ? "water-option active"
                        : "water-option"
                    }
                    onClick={() => {
                      setWater("rainfed");
                      setError("");
                    }}
                  >
                    Rainfed
                  </button>
  
                </div>
  
              </div>
  
  
              {/* CROP */}
  
              <div className="farm-field">
  
                <label>
                  Have you decided what to grow?
                  <span className="optional">
                    Optional
                  </span>
                </label>
  
                <div className="farm-select-wrapper">
  
                  <Sprout size={18} />
  
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                  >
  
                    <option value="">
                      I haven't decided yet
                    </option>
  
                    <option value="rice">
                      Rice
                    </option>
  
                    <option value="wheat">
                      Wheat
                    </option>
  
                    <option value="cotton">
                      Cotton
                    </option>
  
                    <option value="soybean">
                      Soybean
                    </option>
  
                    <option value="tomato">
                      Tomato
                    </option>
  
                    <option value="onion">
                      Onion
                    </option>
  
                    <option value="sugarcane">
                      Sugarcane
                    </option>
  
                    <option value="other">
                      Other
                    </option>
  
                  </select>
  
                </div>
  
              </div>
  
  
              {/* ERROR */}
  
              {error && (
                <p className="farm-setup-error">
                  {error}
                </p>
              )}
  
  
              {/* BUTTON */}
  
              <button
                type="submit"
                className="farm-continue-button"
              >
                Continue
                <ArrowRight size={17} />
              </button>
  
            </form>
  
  
            <p className="farm-card-footer">
              Your information helps AgriNova personalize your farming journey.
            </p>
  
          </div>
  
        </div>
  
      </main>
    );
  }
  
  export default FarmSetup;