"use client"

import { useTheme } from "../contexts/ThemeContext"
import "../styles/About.css"

const About = () => {
  const { isTransitioning } = useTheme()

  const teamMembers = [
    {
      name: "Pankaj Kumar Dhal",
      role: "Lead Developer",
      image: "https://via.placeholder.com/200x200?text=Alex",
      bio: "Passionate about creating beautiful and functional user interfaces with modern React technologies.",
    },
    {
      name: "PK Dhal",
      role: "UI/UX Designer",
      image: "https://via.placeholder.com/200x200?text=Sarah",
      bio: "Specializes in creating intuitive and visually appealing designs that enhance user experience.",
    },
    {
      name: "Mr. Pankaj",
      role: "Full Stack Engineer",
      image: "https://via.placeholder.com/200x200?text=Mike",
      bio: "Expert in scalable frontend architecture and performance optimization for modern web applications.",
    },
  ]

  const technologies = [
    { name: "React", icon: "⚛️", description: "Modern component-based UI library" },
    { name: "Context API", icon: "🔄", description: "State management for theme switching" },
    { name: "CSS3", icon: "🎨", description: "Advanced styling with custom properties" },
    { name: "React Router", icon: "🛣️", description: "Client-side routing and navigation" },
    { name: "REST API", icon: "🌐", description: "Integration with external data sources" },
    { name: "LocalStorage", icon: "💾", description: "Persistent theme preferences" },
  ]

  return (
    <div className={`page-container about-page ${isTransitioning ? "transitioning" : ""}`}>
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="page-title">About ThemeHub</h1>
          <p className="page-subtitle">A showcase of modern React development with dynamic theming capabilities</p>
        </div>
      </section>

      <section className="mission-section">
        <div className="content-wrapper">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              ThemeHub demonstrates the power of modern web development by showcasing how a single application can
              transform its entire appearance and user experience through dynamic theming. We believe that great design
              should be flexible, accessible, and engaging.
            </p>
            <div className="mission-highlights">
              <div className="highlight">
                <span className="highlight-icon">🎯</span>
                <div>
                  <h3>Innovation</h3>
                  <p>Pushing the boundaries of what's possible with modern CSS and React</p>
                </div>
              </div>
              <div className="highlight">
                <span className="highlight-icon">🤝</span>
                <div>
                  <h3>Accessibility</h3>
                  <p>Ensuring great experiences for users across all devices and abilities</p>
                </div>
              </div>
              <div className="highlight">
                <span className="highlight-icon">⚡</span>
                <div>
                  <h3>Performance</h3>
                  <p>Optimized for speed and smooth interactions without compromising features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="content-wrapper">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="team-card" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="team-image-container">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="team-image" />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tech-section">
        <div className="content-wrapper">
          <h2 className="section-title">Technologies Used</h2>
          <p className="tech-intro">
            This application is built with modern web technologies to ensure performance, maintainability, and an
            excellent user experience.
          </p>
          <div className="tech-grid">
            {technologies.map((tech, index) => (
              <div key={tech.name} className="tech-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="tech-icon">{tech.icon}</div>
                <h3 className="tech-name">{tech.name}</h3>
                <p className="tech-description">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="content-wrapper">
          <h2 className="section-title">Our Values</h2>
          <div className="values-content">
            <div className="value-item">
              <h3>🚀 Innovation First</h3>
              <p>We embrace cutting-edge technologies and methodologies to create exceptional digital experiences.</p>
            </div>
            <div className="value-item">
              <h3>👥 User-Centered Design</h3>
              <p>Every decision we make is guided by what's best for the end user and their experience.</p>
            </div>
            <div className="value-item">
              <h3>🔧 Quality Code</h3>
              <p>We write clean, maintainable, and well-documented code that stands the test of time.</p>
            </div>
            <div className="value-item">
              <h3>🌱 Continuous Learning</h3>
              <p>We stay current with industry trends and continuously improve our skills and processes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
