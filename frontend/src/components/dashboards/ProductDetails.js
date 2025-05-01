import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/customer.css";
import DashboardLayout from "../layout/DashboardLayout";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/products/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        setError("Product not found!");
      });
  }, [id]);

  const handleAddToCart = () => {
    // You can expand this later for cart logic
    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    alert("Redirecting to checkout...");
  };

  const handleFlag = () => {
    alert("Product Flagged...");
  };

  if (error)
    return (
      <DashboardLayout>
        <div>{error}</div>
      </DashboardLayout>
    );
  if (!product)
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="product-details-container">
        <div className="product-img">
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.name}
          />
        </div>
        <div className="product-infos">
          <h2>{product.name}</h2>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p>
            <strong>Trust Score:</strong> {product.trust_score}/100
          </p>
          <div className="product-buttons">
            <button className="btn-add" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn-buy" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className="btn-flag" onClick={handleFlag}>
              Mark Fake 
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
