import {
    Brain,
    Database,
    Lightbulb,
    ShieldCheck,
  } from "lucide-react";
  
  function AISection() {
    const capabilities = [
      {
        icon: <Brain size={22} />,
        title: "Understands your farm",
        text: "AI combines your farm information with crop, weather and market intelligence.",
      },
      {
        icon: <Database size={22} />,
        title: "Connects the data",
        text: "Multiple sources of agricultural information work together to create a complete picture.",
      },
      {
        icon: <Lightbulb size={22} />,
        title: "Explains every recommendation",
        text: "Get clear reasons behind crop, yield, risk and profitability recommendations.",
      },
      {
        icon: <ShieldCheck size={22} />,
        title: "Helps reduce uncertainty",
        text: "Identify potential risks and explore better decisions before taking action.",
      },
    ];
  
    return (
      <section className="ai-section">
        <div className="ai-content">
          <span className="eyebrow">INTELLIGENT AGRICULTURE</span>
  
          <h2>
            AI that understands
            <br />
            your farm.
          </h2>
  
          <p className="ai-description">
            AgriNova brings multiple agricultural intelligence systems together
            to help farmers make informed decisions throughout the farming cycle.
          </p>
  
          <div className="ai-capabilities">
            {capabilities.map((item) => (
              <div className="ai-capability" key={item.title}>
                <div className="ai-capability-icon">{item.icon}</div>
  
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="ai-visual">
          <div className="ai-orbit">
            <div className="ai-center">
              <Brain size={38} />
              <span>AgriNova AI</span>
            </div>
  
            <div className="ai-node node-one">Soil</div>
            <div className="ai-node node-two">Weather</div>
            <div className="ai-node node-three">Market</div>
            <div className="ai-node node-four">Crop</div>
          </div>
        </div>
      </section>
    );
  }
  
  export default AISection;
  