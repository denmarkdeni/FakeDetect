import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "../../styles/customer.css";
import DashboardLayout from "../layout/DashboardLayout";

const CustomerProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Fetch products on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/products/list/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      });
  }, []);

  return (
    <DashboardLayout className="customer-products-container"><br />
      <h2 className="customer-products-title">Available Products</h2>

      {error && <p className="product-description">{error}</p>}

      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.name}
                className="product-image"
              />
            </Link>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-brand">{product.brand}</p>
              <p className="product-price">₹ {product.price}</p>
              <p className="product-description">{product.description}</p>

              <div className="product-badges">
                <span
                  className={`badge ${
                    product.is_fake ? "badge-fake" : "badge-genuine"
                  }`}
                >
                  {product.is_fake ? "FAKE" : "Genuine"}
                </span>
                <span className="badge">Score: {product.trust_score}</span>
              </div>

              {product.external_link && (
                <a
                  href={product.external_link}
                  target="_blank"
                  rel="noreferrer"
                  className="product-link"
                >
                  View Source
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default CustomerProducts;
