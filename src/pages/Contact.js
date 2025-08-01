"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Contact.css";
import portfolio from "../images/portfolio.png";
import QRScanner from "../images/portfolio-scanner.png"

const Contact = () => {
  const { isTransitioning } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, subject, message } = formData;

    if (!name.trim() || name.length < 2) {
      return "Please enter a valid name (at least 2 characters)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    if (!subject.trim() || subject.length < 5) {
      return "Please enter a subject (at least 5 characters)";
    }

    if (!message.trim() || message.length < 10) {
      return "Please enter a message (at least 10 characters)";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus({ type: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Sorry, there was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "pankaj25dhal@gmail.com",
      link: "mailto:hello@themehub.com",
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+91 89172-37614",
      link: "tel:8917237614",
    },
    {
      icon: "📍",
      title: "Address",
      value: "Bengaluru, HSR Layout, 560040",
      link: "https://maps.google.com",
    },
    {
      icon: "🕒",
      title: "Business Hours",
      value: "Mon-Fri: 9AM-6PM ",
      link: null,
    },
  ];

  const socialLinks = [
    { name: "GitHub", icon: "🐙", url: "https://github.com/PankajKumarDhal" },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://www.linkedin.com/in/pankaj-kumar-dhal-206131229/",
    },
    {
      name: "Portfolio",
      src: portfolio,
      url: "https://pankaj-portfolio-rho.vercel.app/",
    },
    { name: "Twitter", icon: "🐦", url: "https://twitter.com" },
  ];

  return (
    <div
      className={`page-container contact-page ${
        isTransitioning ? "transitioning" : ""
      }`}
    >
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-container">
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  required
                ></textarea>
              </div>

              {submitStatus && (
                <div className={`form-status ${submitStatus.type}`}>
                  <span className="status-icon">
                    {submitStatus.type === "success" ? "✅" : "❌"}
                  </span>
                  <span className="status-message">{submitStatus.message}</span>
                </div>
              )}

              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="btn-icon">📤</span>
                  </>
                )}
              </button>
            </form>
            <div className="qr-section">
              <h3 style={{ color: "#0df2f6ff" }}>QR Code About Me</h3>

              <img
                src={QRScanner}
                alt="portfolio Scanner"
                className="qr-image"
              />
            </div>
          </div>

          <div className="contact-info-section">
            <div className="info-header">
              <h2>Contact Information</h2>
              <p>Reach out to us through any of these channels.</p>
            </div>

            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="info-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <h3>{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="info-link">
                        {info.value}
                      </a>
                    ) : (
                      <p>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <span className="social-icon">
                      {typeof social.icon === "string" ? (
                        social.icon
                      ) : (
                        <img
                          src={portfolio}
                          alt={social.name}
                          className="social-img-icon"
                        />
                      )}
                    </span>

                    {/* <span className="social-icon">{social.icon}</span> */}
                    <span className="social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="response-time">
              <div className="response-icon">⚡</div>
              <div className="response-content">
                <h3>Quick Response</h3>
                <p>
                  We typically respond to all inquiries within 24 hours during
                  business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
