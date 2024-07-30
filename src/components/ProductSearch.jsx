import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "https://capstone2-eozr.onrender.com/b4/products/search-by-name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: searchQuery }),
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for product:", error);
    }
  };

  return (
    <div className="my-5 text-white">
      <h2>Search Products</h2>
      <div className="form-group">
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Product name"
          style={{ width: "20rem" }}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary my-3" onClick={handleSearch}>
        Find
      </button>
      <h4>Search Results:</h4>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((product) => (
            <ProductCard productProp={product} key={product._id} />
          ))}
        </ul>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}
