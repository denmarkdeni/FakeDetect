import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "sans-serif", lineHeight: "1.6", backgroundColor: "#f9f9f9", color: "#333" }}>
      <header style={{ padding: "3rem 2rem", textAlign: "center", background: "#0f172a", color: "#fff" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🕵️‍♂️ FakeDetect</h1>
        <p style={{ fontSize: "1.25rem" }}>Smarter Shopping Starts Here. Detect counterfeit products before it's too late.</p>
        <button 
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 24px",
            marginTop: "2rem",
            backgroundColor: "#38bdf8",
            border: "none",
            color: "#000",
            fontWeight: "bold",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          🔍 Start Detecting
        </button>
      </header>

      <section style={{ padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🧠 How It Works</h2>
        <div style={{ maxWidth: "800px", margin: "auto" }}>
          <ol style={{ textAlign: "left", fontSize: "1.1rem", lineHeight: "2" }}>
            <li>📝 Upload a product link or description</li>
            <li>📊 Our AI analyzes seller history & metadata</li>
            <li>✅ Get a trust rating and decision instantly</li>
          </ol>
        </div>
      </section>

      <section style={{ padding: "3rem 2rem", backgroundColor: "#fff" }}>
        <h2 style={{ fontSize: "2rem", textAlign: "center", marginBottom: "2rem" }}>🚀 Why Use FakeDetect?</h2>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "2rem" }}>
          <div style={{ flex: "1", minWidth: "250px", backgroundColor: "#f1f5f9", padding: "1.5rem", borderRadius: "10px" }}>
            <h3>⚡ Fast & Accurate</h3>
            <p>AI-powered detection gives you results in seconds.</p>
          </div>
          <div style={{ flex: "1", minWidth: "250px", backgroundColor: "#f1f5f9", padding: "1.5rem", borderRadius: "10px" }}>
            <h3>🔐 Seller Insights</h3>
            <p>Get full transparency into seller reputation and product ratings.</p>
          </div>
          <div style={{ flex: "1", minWidth: "250px", backgroundColor: "#f1f5f9", padding: "1.5rem", borderRadius: "10px" }}>
            <h3>📉 Save Money</h3>
            <p>Avoid scams and low-quality knockoffs before buying.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: "3rem 2rem", textAlign: "center", backgroundColor: "#e2e8f0" }}>
        <h2 style={{ fontSize: "2rem" }}>📢 Testimonials</h2>
        <p style={{ fontStyle: "italic", marginTop: "1rem" }}>"FakeDetect saved me from buying a fake phone worth ₹40,000!" - Arun, Kerala</p>
        <p style={{ fontStyle: "italic", marginTop: "0.5rem" }}>"Super useful! Now I always check with FakeDetect before shopping online." - Priya, Chennai</p>
      </section>

      <footer style={{ padding: "1.5rem", textAlign: "center", background: "#0f172a", color: "#fff" }}>
        © 2025 FakeDetect | Built with ❤️ by Future Tech Minds
      </footer>
    </div>
  );
}
