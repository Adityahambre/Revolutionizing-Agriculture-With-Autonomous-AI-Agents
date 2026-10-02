import {
    Building2,
    Users,
    PackageCheck,
    ArrowUpRight,
  } from "lucide-react";
  
  function BusinessSection() {
    return (
      <section className="business-section">
        <div className="business-visual">
          <div className="business-card">
            <div className="business-card-top">
              <span className="business-label">INDUSTRY NETWORK</span>
              <ArrowUpRight size={20} />
            </div>
  
            <div className="business-stat">
              <span>Connected supply</span>
              <strong>Farm → Industry</strong>
            </div>
  
            <div className="business-flow">
              <div className="flow-item">
                <Users size={20} />
                <span>Farmers</span>
              </div>
  
              <div className="flow-line"></div>
  
              <div className="flow-item">
                <PackageCheck size={20} />
                <span>Produce</span>
              </div>
  
              <div className="flow-line"></div>
  
              <div className="flow-item">
                <Building2 size={20} />
                <span>Industry</span>
              </div>
            </div>
          </div>
        </div>
  
        <div className="business-content">
          <span className="eyebrow">FOR BUSINESSES</span>
  
          <h2>
            Build a smarter
            <br />
            agricultural supply chain.
          </h2>
  
          <p>
            Connect agricultural businesses with relevant farmers and
            production opportunities using structured farm and market
            intelligence.
          </p>
  
          <div className="business-points">
            <div>
              <strong>Discover supply</strong>
              <span>Find relevant agricultural production based on your requirements.</span>
            </div>
  
            <div>
              <strong>Match opportunities</strong>
              <span>Connect farmers and businesses using crop, location and requirement data.</span>
            </div>
  
            <div>
              <strong>Improve visibility</strong>
              <span>Build a clearer picture of agricultural supply and demand.</span>
            </div>
          </div>
  
          <button className="business-button">
            Explore for Businesses
            <ArrowUpRight size={17} />
          </button>
        </div>
      </section>
    );
  }
  
  export default BusinessSection;