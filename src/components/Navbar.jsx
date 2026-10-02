import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-navbar">
      <div className="site-navbar-container">

        {/* Logo */}
        <a href="/" className="site-navbar-logo" onClick={closeMenu}>
          <span className="site-logo-mark">A</span>
          <span className="site-logo-text">AgriNova</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="site-navbar-links">
          <a href="/#platform">Platform</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#farmers">For Farmers</a>
          <a href="/#business">For Businesses</a>
        </nav>

        {/* Desktop Actions */}
        <div className="site-navbar-actions">
          <a href="/login" className="site-login-button">
            Login
          </a>

          <a href="/get-started" className="site-start-button">
            <span>Get Started</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="site-mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="site-mobile-menu">

          <a href="/#platform" onClick={closeMenu}>
            Platform
          </a>

          <a href="/#how-it-works" onClick={closeMenu}>
            How It Works
          </a>

          <a href="/#farmers" onClick={closeMenu}>
            For Farmers
          </a>

          <a href="/#business" onClick={closeMenu}>
            For Businesses
          </a>

          <div className="site-mobile-divider" />

          <a href="/login" onClick={closeMenu}>
            Login
          </a>

          <a
            href="/get-started"
            className="site-mobile-start"
            onClick={closeMenu}
          >
            Get Started
            <ArrowRight size={16} />
          </a>

        </div>
      )}
    </header>
  );
}

export default Navbar;