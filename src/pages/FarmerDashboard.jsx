import {
    CloudSun,
    Leaf,
    MapPin,
    TrendingUp,
    Droplets,
    Activity,
    ArrowRight,
    Bell,
    UserRound,
  } from "lucide-react";
  
  function FarmerDashboard() {
    return (
      <main className="farmer-dashboard">
  
        {/* Dashboard Header */}
        <section className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">
              FARMER DASHBOARD
            </span>
  
            <h1>
              Good morning, Aditya.
            </h1>
  
            <p>
              Here's what is happening with your farm today.
            </p>
          </div>
  
          <div className="dashboard-header-actions">
            <button className="dashboard-icon-button">
              <Bell size={19} />
            </button>
  
            <button className="dashboard-profile-button">
              <span className="dashboard-profile-icon">
                <UserRound size={17} />
              </span>
  
              <span>My Profile</span>
            </button>
          </div>
        </section>
  
  
        {/* Farm Location */}
        <section className="farm-location-card">
  
          <div className="farm-location-left">
            <div className="farm-location-icon">
              <MapPin size={20} />
            </div>
  
            <div>
              <span>YOUR FARM</span>
              <h3>Pune, Maharashtra</h3>
            </div>
          </div>
  
          <div className="farm-location-details">
            <div>
              <span>Farm Size</span>
              <strong>5 Acres</strong>
            </div>
  
            <div>
              <span>Current Crop</span>
              <strong>Tomato</strong>
            </div>
  
            <div>
              <span>Season</span>
              <strong>Kharif</strong>
            </div>
          </div>
  
        </section>
  
  
        {/* Main Overview */}
        <section className="dashboard-overview">
  
          <div className="dashboard-section-title">
            <div>
              <span className="dashboard-eyebrow">
                FARM OVERVIEW
              </span>
  
              <h2>
                Your farm at a glance.
              </h2>
            </div>
  
            <a href="/farm">
              View Farm
              <ArrowRight size={15} />
            </a>
          </div>
  
  
          <div className="dashboard-card-grid">
  
            {/* Weather */}
            <div className="dashboard-card">
  
              <div className="dashboard-card-top">
                <div className="dashboard-card-icon">
                  <CloudSun size={20} />
                </div>
  
                <span className="dashboard-status">
                  Today
                </span>
              </div>
  
              <h3>28°C</h3>
  
              <p>
                Partly cloudy
              </p>
  
              <div className="dashboard-card-info">
                <span>Humidity</span>
                <strong>68%</strong>
              </div>
  
            </div>
  
  
            {/* Soil */}
            <div className="dashboard-card">
  
              <div className="dashboard-card-top">
                <div className="dashboard-card-icon">
                  <Leaf size={20} />
                </div>
  
                <span className="dashboard-status">
                  Good
                </span>
              </div>
  
              <h3>Healthy Soil</h3>
  
              <p>
                Soil conditions look suitable.
              </p>
  
              <div className="dashboard-card-info">
                <span>Soil pH</span>
                <strong>6.5</strong>
              </div>
  
            </div>
  
  
            {/* Water */}
            <div className="dashboard-card">
  
              <div className="dashboard-card-top">
                <div className="dashboard-card-icon">
                  <Droplets size={20} />
                </div>
  
                <span className="dashboard-status">
                  Normal
                </span>
              </div>
  
              <h3>Good</h3>
  
              <p>
                Water availability is normal.
              </p>
  
              <div className="dashboard-card-info">
                <span>Next irrigation</span>
                <strong>Tomorrow</strong>
              </div>
  
            </div>
  
  
            {/* Crop Health */}
            <div className="dashboard-card">
  
              <div className="dashboard-card-top">
                <div className="dashboard-card-icon">
                  <Activity size={20} />
                </div>
  
                <span className="dashboard-status">
                  Healthy
                </span>
              </div>
  
              <h3>92%</h3>
  
              <p>
                Current crop health score.
              </p>
  
              <div className="dashboard-card-info">
                <span>Crop</span>
                <strong>Tomato</strong>
              </div>
  
            </div>
  
          </div>
        </section>
  
  
        {/* AI Recommendation */}
        <section className="ai-recommendation">
  
          <div className="ai-recommendation-icon">
            <Leaf size={22} />
          </div>
  
          <div className="ai-recommendation-content">
  
            <span>
              AGRINOVA AI RECOMMENDATION
            </span>
  
            <h2>
              Your tomato crop is currently in good condition.
            </h2>
  
            <p>
              Based on your farm information, weather conditions
              and current crop status, AgriNova recommends
              monitoring soil moisture before the next irrigation.
            </p>
  
            <button>
              View Recommendation
              <ArrowRight size={16} />
            </button>
  
          </div>
  
        </section>
  
  
        {/* Lower Dashboard */}
        <section className="dashboard-lower-grid">
  
          {/* Market */}
          <div className="dashboard-large-card">
  
            <div className="large-card-header">
  
              <div>
                <span className="dashboard-eyebrow">
                  MARKET
                </span>
  
                <h2>
                  Tomato market
                </h2>
              </div>
  
              <TrendingUp size={22} />
  
            </div>
  
            <div className="market-price">
              <strong>₹2,850</strong>
              <span> / quintal</span>
            </div>
  
            <p className="market-change">
              Current market information
            </p>
  
            <a href="/market">
              View market intelligence
              <ArrowRight size={15} />
            </a>
  
          </div>
  
  
          {/* Today's Actions */}
          <div className="dashboard-large-card">
  
            <div className="large-card-header">
  
              <div>
                <span className="dashboard-eyebrow">
                  TODAY
                </span>
  
                <h2>
                  What you can do
                </h2>
              </div>
  
            </div>
  
            <div className="today-action">
              <span>01</span>
              <p>
                Check soil moisture
              </p>
            </div>
  
            <div className="today-action">
              <span>02</span>
              <p>
                Monitor crop health
              </p>
            </div>
  
            <div className="today-action">
              <span>03</span>
              <p>
                Check market prices
              </p>
            </div>
  
          </div>
  
        </section>
  
      </main>
    );
  }
  
  export default FarmerDashboard;