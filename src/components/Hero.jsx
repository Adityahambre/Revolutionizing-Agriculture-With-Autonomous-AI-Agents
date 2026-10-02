import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="simple-hero" id="home">
      <div className="simple-hero-content">

        <span className="simple-eyebrow">
          AI FOR MODERN AGRICULTURE
        </span>

        <h1>
          Better decisions.
          <br />
          Better farming.
        </h1>

        <p>
          AgriNova helps farmers make smarter decisions about crops,
          weather, crop health and markets — all in one simple platform.
        </p>

        <div className="simple-hero-actions">

          <a href="/get-started" className="simple-primary-button">
            Get Started
            <ArrowRight size={17} />
          </a>

          <a href="/#how-it-works" className="simple-text-button">
            How it works
          </a>

        </div>

      </div>
    </section>
  );
}

export default Hero;