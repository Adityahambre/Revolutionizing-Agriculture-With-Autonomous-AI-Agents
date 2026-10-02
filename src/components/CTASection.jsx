import { ArrowRight } from "lucide-react";

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <span className="eyebrow">THE FUTURE OF FARMING</span>

        <h2>
          Make every farming
          <br />
          decision smarter.
        </h2>

        <p>
          Bring your farm, data and decisions together with intelligent
          agricultural technology.
        </p>

        <div className="cta-actions">
          <button className="primary-button">
            Get Started
            <ArrowRight size={17} />
          </button>

          <button className="secondary-button">
            Explore Platform
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;