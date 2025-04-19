export default function Home() {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <header style={{ padding: "2rem", textAlign: "center", background: "#111", color: "#fff" }}>
            <h1>🕵️‍♂️ FakeDetect</h1>
            <p>Smarter Shopping Starts Here. Website that helps you spot counterfeit goods.</p>
            <button style={{ padding: "10px 20px", marginTop: "1rem" }}>Start Detecting</button>
        </header>

        <section style={{ padding: "2rem" }}>
            <h2>How It Works</h2>
            <ol>
            <li>Upload a product link or description</li>
            <li>We analyze seller history & product metadata</li>
            <li>You get a trust rating instantly</li>
            </ol>
        </section>

        <footer style={{ padding: "1rem", textAlign: "center", background: "#eee" }}>
            © 2025 FakeDetect | Built with ❤️ by Future Tech Minds
        </footer>
      </div>
    );
  }
  