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
    const token = localStorage.getItem("token");
    if(!token){
      setError("No token found. Please login.");
      return;
    }

    axios.post(`http://127.0.0.1:8000/api/add_to_cart/${id}/`,{},{
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      alert(response.data.message);
    })
    .catch((err) => {
      setError(`error : ${err};`);
    });
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
        <div className="cart-icon">
          <img src="https://cdn-icons-png.freepik.com/512/891/891468.png?ga=GA1.1.2114069533.1739445730"></img>
        </div>
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
              <abbr title="Flag as Fake">🚩</abbr>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
