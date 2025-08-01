"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("theme1");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const themes = {
    theme1: {
      name: "Minimalist",
      colors: {
        primary: "#2c3e50",
        secondary: "#3498db",
        background: "#ffffff",
        surface: "#f8f9fa",
        text: "#2c3e50",
        textSecondary: "#7f8c8d",
        accent: "#e74c3c",
        border: "#ecf0f1",
      },
      fonts: {
        primary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        secondary: "'Inter', sans-serif",
      },
      layout: "default",
      spacing: {
        small: "0.5rem",
        medium: "1rem",
        large: "2rem",
        xlarge: "3rem",
      },
    },
    theme2: {
      name: "Dark Professional",
      colors: {
        primary: "#18fafaff",
        secondary: "#bb86fc",
        background: "#121212",
        surface: "#1e1e1e",
        text: "#ffffff",
        textSecondary: "#b3b3b3",
        accent: "#03dac6",
        border: "#333333",
      },
      fonts: {
        primary: "'Playfair Display', Georgia, serif",
        secondary: "'Source Sans Pro', sans-serif",
      },
      layout: "sidebar",
      spacing: {
        small: "0.75rem",
        medium: "1.5rem",
        large: "2.5rem",
        xlarge: "4rem",
      },
    },
    theme3: {
      name: "Colorful Creative",
      colors: {
        primary: "#ff6b6b",
        secondary: "#4ecdc4",
        background: "#fff8e1",
        surface: "#ffffff",
        text: "#2d3436",
        textSecondary: "#636e72",
        accent: "#fd79a8",
        border: "#fab1a0",
      },
      fonts: {
        primary: "'Pacifico', cursive",
        secondary: "'Poppins', sans-serif",
      },
      layout: "grid",
      spacing: {
        small: "0.8rem",
        medium: "1.2rem",
        large: "2rem",
        xlarge: "3.5rem",
      },
    },



    // theme3: {
    //   name: "Colorful Creative",
    //   colors: {
    //     primary: "#ff4d6d",
    //     secondary: "#00b4d8",
    //     background: "#fffaf0",
    //     surface: "#ffffff",
    //     text: "#1e1e1e",
    //     textSecondary: "#555",
    //     accent: "#f9c74f",
    //     border: "#90e0ef",
    //   },
    //   fonts: {
    //     primary: "'Pacifico', cursive",
    //     secondary: "'Poppins', sans-serif",
    //   },
    //   layout: "grid",
    //   spacing: {
    //     small: "0.8rem",
    //     medium: "1.2rem",
    //     large: "2rem",
    //     xlarge: "3.5rem",
    //   },
    // },
  };

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const theme = themes[currentTheme];
    const root = document.documentElement;

    // Apply CSS custom properties
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    root.style.setProperty("--font-primary", theme.fonts.primary);
    root.style.setProperty("--font-secondary", theme.fonts.secondary);
    root.className = `theme-${currentTheme} layout-${theme.layout}`;
  }, [currentTheme, themes, isClient]);

  const switchTheme = (themeKey) => {
    if (themeKey === currentTheme || !isClient) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentTheme(themeKey);
      localStorage.setItem("selectedTheme", themeKey);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
  };

  const value = {
    currentTheme,
    themes,
    switchTheme,
    isTransitioning,
    theme: themes[currentTheme],
    isClient,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
