import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import Journey from "./components/Journey";
import Footer from "./components/Footer";
import GetStarted from "./pages/GetStarted";
import OTPVerification from "./pages/OTPVerification";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmSetup from "./pages/FarmSetup";
import {
  CloudSun,
  ScanLine,
  Sprout,
  TrendingUp,
} from "lucide-react";

import "./index.css";

function App() {
  const currentPath = window.location.pathname;
  if (currentPath === "/login") {
    return (
      <div className="app">
        <Navbar />
        <Login />
        <Footer />
      </div>
    );
  }
  if (currentPath === "/verify-otp") {
    return (
      <div className="app">
        <Navbar />
        <OTPVerification />
        <Footer />
      </div>
    );
  }
  if (currentPath === "/get-started") {
    return (
      <div className="app">
        <Navbar />
        <GetStarted />
        <Footer />
      </div>
    );
  }
  if (currentPath === "/farm-setup") {
    return (
      <div className="app">
        <FarmSetup />
      </div>
    );
  }
  if (currentPath === "/farm-setup") {
    return (
      <div className="app">
        <FarmSetup />
      </div>
    );
  }
  if (currentPath === "/dashboard") {
    return (
      <div className="app">
        <FarmerDashboard />
      </div>
    );
  }
  return (
    <div className="app">

      <Navbar />

      <main>

        <Hero />

        <section className="platform-section" id="platform">

          <div className="section-heading platform-heading">

            <div>
              <span className="eyebrow">
                ONE INTELLIGENT PLATFORM
              </span>

              <h2>
                Everything your farm
                <br />
                needs to make better decisions.
              </h2>
            </div>

            <p>
              From understanding your soil to finding market opportunities,
              AgriNova brings agricultural intelligence together in one place.
            </p>

          </div>

          <div className="feature-grid">

            <FeatureCard
              icon={<Sprout />}
              title="Crop Intelligence"
              text="Understand which crops fit your farm using soil, climate, resources, yield and market signals."
            />

            <FeatureCard
              icon={<ScanLine />}
              title="Crop Health"
              text="Identify potential crop health and disease risks using intelligent image-based analysis."
            />

            <FeatureCard
              icon={<CloudSun />}
              title="Weather Intelligence"
              text="Turn weather information into useful decisions for your farming cycle."
            />

            <FeatureCard
              icon={<TrendingUp />}
              title="Market Intelligence"
              text="Understand market conditions and opportunities before deciding when and where to sell."
            />

          </div>

        </section>

        <Journey />

      </main>

      <Footer />

    </div>
  );
}

export default App;