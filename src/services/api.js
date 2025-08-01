const API_BASE_URL = "https://fakestoreapi.com"

class ApiService {
  static async fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      if (error.name === "AbortError") {
        throw new Error("Request timeout")
      }
      throw error
    }
  }

  static async getProducts(limit = 20) {
    try {
      const url = `${API_BASE_URL}/products${limit ? `?limit=${limit}` : ""}`
      return await this.fetchWithTimeout(url)
    } catch (error) {
      console.error("Error fetching products:", error)
      throw new Error("Failed to fetch products. Please try again later.")
    }
  }

  static async getProductById(id) {
    try {
      const url = `${API_BASE_URL}/products/${id}`
      return await this.fetchWithTimeout(url)
    } catch (error) {
      console.error("Error fetching product:", error)
      throw new Error("Failed to fetch product details.")
    }
  }

  static async getCategories() {
    try {
      const url = `${API_BASE_URL}/products/categories`
      return await this.fetchWithTimeout(url)
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw new Error("Failed to fetch categories.")
    }
  }
}

export default ApiService
