import { ArrowUpRight } from "lucide-react";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="site-footer-container">

        {/* Brand */}
        <div className="site-footer-brand">
          <a href="/" className="site-footer-logo">
            <span className="site-footer-logo-mark">A</span>
            <span>AgriNova</span>
          </a>

          <p>
            Intelligent agricultural technology
            for better decisions, better farming
            and better outcomes.
          </p>
        </div>

        {/* Links */}
        <div className="site-footer-links">

          <div className="site-footer-column">
            <h4>Platform</h4>

            <a href="/#platform">
              Crop Intelligence
            </a>

            <a href="/#platform">
              Crop Health
            </a>

            <a href="/#platform">
              Weather Intelligence
            </a>

            <a href="/#platform">
              Market Intelligence
            </a>
          </div>

          <div className="site-footer-column">
            <h4>Company</h4>

            <a href="/#how-it-works">
              How It Works
            </a>

            <a href="/#farmers">
              For Farmers
            </a>

            <a href="/#business">
              For Businesses
            </a>

            <a href="/#about">
              About AgriNova
            </a>
          </div>

          <div className="site-footer-column">
            <h4>Get Started</h4>

            <a href="/login">
              Login
            </a>

            <a href="/get-started">
              Create Account
              <ArrowUpRight size={14} />
            </a>

            <a href="/get-started">
              Start Farming
              <ArrowUpRight size={14} />
            </a>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="site-footer-bottom">

        <span>
          © 2026 AgriNova. All rights reserved.
        </span>

        <div className="site-footer-legal">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>

      </div>

    </footer>
  );
}

export default Footer;