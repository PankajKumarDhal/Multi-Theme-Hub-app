"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../contexts/ThemeContext"
import ProductCard from "../components/ProductCard"
import ApiService from "../services/api"
import "../styles/Home.css"

const Home = () => {
  const { theme, isTransitioning } = useTheme()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [productsData, categoriesData] = await Promise.all([
          ApiService.getProducts(12),
          ApiService.getCategories(),
        ])

        setProducts(productsData)
        setCategories(["all", ...categoriesData])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  if (loading) {
    return (
      <div className={`page-container ${isTransitioning ? "transitioning" : ""}`}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`page-container ${isTransitioning ? "transitioning" : ""}`}>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`page-container home-page ${isTransitioning ? "transitioning" : ""}`}>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-highlight">ThemeHub</span>
          </h1>
          <p className="hero-description">
            Experience the power of dynamic theming with our multi-theme showcase. Switch between themes and watch the
            entire interface transform!
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Unique Themes</span>
            </div>
            <div className="stat">
              <span className="stat-number">{products.length}</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Responsive</span>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-description">
            Discover our curated collection of products, beautifully displayed across all themes
          </p>
        </div>

        <div className="filters-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">📦</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>

      <section className="features-section">
        <h2 className="section-title">Theme Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Dynamic Styling</h3>
            <p>Complete visual transformation with colors, fonts, and layouts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Perfect experience across all devices and screen sizes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Smooth Animations</h3>
            <p>Seamless transitions and engaging micro-interactions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Persistent Themes</h3>
            <p>Your theme preference is saved and restored automatically</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
