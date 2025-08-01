"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Header.css";
import image from "../images/PKD_LOGO.png";

const Header = () => {
  const { currentTheme, themes, switchTheme, isTransitioning} = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleThemeChange = (themeKey) => {
    switchTheme(themeKey);
    setIsDropdownOpen(false);
  };

  const isActivePage = (path) => location.pathname === path;

  return (
    <header className={`header ${isTransitioning ? "transitioning" : ""}`}>
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <span className="logo-icon">
              <img
                src={image}
                alt="PK Logo"
                className="logo-image"
              />
            </span>
            <span className="logo-text">ThemeHub</span>
          </Link>
        </div>

        <nav className={`nav ${isMobileMenuOpen ? "nav-open" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${isActivePage("/") ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActivePage("/about") ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${isActivePage("/contact") ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        <div className="header-right">
          <div className="theme-selector">
            <button
              className="theme-dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Select theme"
            >
              <span className="theme-icon">🎭</span>
              <span className="theme-name">{themes[currentTheme].name}</span>
              <span
                className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
              >
                ▼
              </span>
            </button>

            {isDropdownOpen && (
              <div className="theme-dropdown">
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    className={`theme-option ${
                      key === currentTheme ? "active" : ""
                    }`}
                    onClick={() => handleThemeChange(key)}
                  >
                    <span className="theme-preview" data-theme={key}></span>
                    <span className="theme-option-name">{theme.name}</span>
                    {key === currentTheme && (
                      <span className="check-mark">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
