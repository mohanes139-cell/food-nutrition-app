import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodList from "./components/FoodList";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(query) {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setProducts([]);

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          query
        )}&search_simple=1&action=process&json=1&page_size=20`
      );

      const data = await response.json();

      const validProducts = data.products.filter(
        (product) =>
          product?.product_name?.trim() &&
          product?.brands?.trim() &&
          (product?.image_front_url || product?.image_url)
      );

      setProducts(validProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <h1>Food Nutrition Search</h1>

      <SearchBar onSearch={handleSearch} />

      {!hasSearched && !loading && (
        <p className="message">Search for a food product to get started.</p>
      )}

      {loading && <p className="message">Loading products...</p>}

      {!loading && hasSearched && products.length > 0 && (
        <FoodList products={products} />
      )}

      {!loading && hasSearched && products.length === 0 && (
        <p className="message">No products with complete information found.</p>
      )}
    </main>
  );
}

export default App;