import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await API.get("my-orders/");
        setOrders(response.data);
      } catch (err) {
        setError("Failed to load orders.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const handleReviewClick = (orderId) => {
    navigate(`/my-orders/${orderId}/review`);
  };

  return (
    <DashboardLayout title={"Orders History"}><br />
      <h1 style={{ textAlign: "center" }}>My Orders</h1>

      {loading ? (
        <p className="text-center font-bold">Loading your orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card ">
              <img
                src={`http://127.0.0.1:8000${order.product.image}`}
                alt={order.product.name}
                className="order-image"
              />
              <div className="order-details">
                <h3>{order.product.name}</h3>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.total_amount}
                </p>
                <p>
                  <strong>Ordered on:</strong>{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
                {order.reviewed ? (
                  <p className="text-gray-500">Already reviewed</p>
                ) : (
                  <button
                    onClick={() => handleReviewClick(order.id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recent orders yet.</p>
      )}
    </DashboardLayout>
  );
}

export default MyOrders;
