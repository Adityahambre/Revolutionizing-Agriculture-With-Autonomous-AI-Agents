import { ArrowRight } from "lucide-react";

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>

      <div className="feature-arrow">
        Explore
        <ArrowRight size={15} />
      </div>
    </div>
  );
}

export default FeatureCard;