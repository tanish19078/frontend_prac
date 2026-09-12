import { useState } from "react";

const pages = [
  { id: "home", label: "Home", icon: "🏠", content: "Welcome to the central SPA Dashboard overview." },
  { id: "products", label: "Products", icon: "📦", content: "Manage inventory, categories, and stock counts." },
  { id: "analytics", label: "Analytics", icon: "📈", content: "Conversion rates, page views, and visitor metrics." },
  { id: "settings", label: "Settings", icon: "⚙️", content: "Configure notification alerts and user profile preferences." }
];

export default function SpaNavigationLayoutDemo() {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentPage = pages.find((p) => p.id === activeTab) || pages[0];

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden", fontFamily: "sans-serif" }}>
      {/* Top Navbar */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1e293b", color: "#fff", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer" }}>
            ☰
          </button>
          <strong style={{ fontSize: "16px" }}>AdminPortal SPA</strong>
        </div>
        <span style={{ fontSize: "13px", color: "#94a3b8" }}>User: Alex</span>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div style={{ display: "flex", minHeight: "260px" }}>
        {sidebarOpen && (
          <aside style={{ width: "160px", background: "#f8fafc", borderRight: "1px solid #e2e8f0", padding: "10px 0" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {pages.map((page) => (
                <li key={page.id}>
                  <button
                    onClick={() => setActiveTab(page.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 14px",
                      border: "none",
                      background: activeTab === page.id ? "#e2e8f0" : "transparent",
                      fontWeight: activeTab === page.id ? "bold" : "normal",
                      cursor: "pointer"
                    }}
                  >
                    {page.icon} {page.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <main style={{ flex: 1, padding: "20px" }}>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>
            Portal &gt; {currentPage.label}
          </div>
          <h2 style={{ marginTop: 0 }}>{currentPage.icon} {currentPage.label} Page</h2>
          <p style={{ color: "#334155", lineHeight: 1.6 }}>{currentPage.content}</p>
        </main>
      </div>

      {/* Footer */}
      <footer style={{ background: "#f1f5f9", padding: "10px 16px", borderTop: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", textAlign: "center" }}>
        Multi-Page SPA Layout Design Demo &copy; 2026
      </footer>
    </div>
  );
}
