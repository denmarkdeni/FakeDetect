export default function ProductChecker(){
    return(
        <div style={{ fontFamily: "sans-serif", lineHeight: "1.6", backgroundColor: "#f9f9f9", color: "#333" }}>
            <header style={{ padding: "3rem 2rem", textAlign: "center", background: "#0f172a", color: "#fff" }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🕵️‍♂️ FakeDetect</h1>
                <p style={{ fontSize: "1.25rem" }}>Smarter Shopping Starts Here. Detect counterfeit products before it's too late.</p>
            </header>
            <section style={{ padding: "3rem 2rem", textAlign: "center" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍 Check Product</h2>
                <input type="text" placeholder="Enter product link or description" style={{ padding: "12px 24px", borderRadius: "8px", border: "1px solid #ccc", width: "300px" }} />
                <button style={{ padding: "12px 24px", marginLeft: "10px", backgroundColor: "#38bdf8", border: "none", color: "#000", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}>Check</button>
            </section>
        </div>
    )
}