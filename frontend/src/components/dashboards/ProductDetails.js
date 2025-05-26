import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/customer.css";
import DashboardLayout from "../layout/DashboardLayout";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    alert("Redirecting to Payment Page...");
    navigate(`/payment-page/${id}`, { state: { product } });
  };

  const handleFlag = () => {
    const token = localStorage.getItem("token");
    if(!token){
      setError("No token found. Please login.");
      return;
    }
    const reason = prompt("Please enter the reason for flagging this product:");
    if (!reason) {
      alert("Flagging cancelled.");
      return;
    }

    axios.post(`http://127.0.0.1:8000/api/flag_product/${id}/`,{'reason':reason},{
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
        <div className="cart-icon" title="Cart List">
        <Link to={"/cart"}>
          <img src="https://cdn-icons-png.freepik.com/512/891/891468.png?ga=GA1.1.2114069533.1739445730" ></img>
        </Link>
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
      <div className="product-details-container">
        <h3>Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          <ul className="reviews-list">
            {product.reviews.map((review) => (
              <li key={review.id}>
                <p>
                  <strong>{review.user.username}:</strong> {review.content}
                </p>
                <p>
                  <strong>Rating:</strong> {review.rating}/5
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      <div className="product-details-container">
        <h3>Flag Comments</h3>
        {product.flag_comments && product.flag_comments.length > 0 ? (
          <ul className="flag-comments-list">
            {product.flag_comments.map((comment) => (
              <li key={comment.id}>
                <p>
                  <strong>{comment.username}:</strong> {comment.reason}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flag comments yet.</p>
        )}
      </div>
    </DashboardLayout>
  );
}
