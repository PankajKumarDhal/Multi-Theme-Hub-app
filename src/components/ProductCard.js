import "../styles/ProductCard.css"

const ProductCard = ({ product, index }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <div className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="product-image-container">
        <img
          src={product.image || `https://via.placeholder.com/250x250?text=Product`}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        <div className="product-overlay">
          <button className="quick-view-btn">Quick View</button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{truncateText(product.title, 50)}</h3>
        <p className="product-description">{truncateText(product.description, 100)}</p>

        <div className="product-footer">
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < Math.floor(product.rating?.rate || 0) ? "filled" : ""}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-count">({product.rating?.count || 0})</span>
          </div>

          <div className="product-price">{formatPrice(product.price)}</div>
        </div>

        <button className="add-to-cart-btn">
          <span className="btn-text">Add to Cart</span>
          <span className="btn-icon">🛒</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
