import { createContext, useContext, useState } from "react";

// 1. Global State Setup (Context API)
const GlobalAppContext = createContext(null);

function GlobalAppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState("Alex");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <GlobalAppContext.Provider value={{ theme, toggleTheme, user, setUser }}>
      {children}
    </GlobalAppContext.Provider>
  );
}

// 2. Component using LOCAL state only
function LocalCounter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: "1px solid #cbd5e1", borderRadius: "6px", padding: "12px", margin: "10px 0" }}>
      <h4>Component with Local State</h4>
      <p style={{ fontSize: "13px", color: "#64748b" }}>Isolated state: re-renders only this component.</p>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span>Count: <strong>{count}</strong></span>
        <button onClick={() => setCount((c) => c + 1)} style={{ padding: "4px 10px" }}>+1</button>
        <button onClick={() => setCount(0)} style={{ padding: "4px 10px" }}>Reset</button>
      </div>
    </div>
  );
}

// 3. Component consuming GLOBAL state
function GlobalThemeHeader() {
  const { theme, toggleTheme, user } = useContext(GlobalAppContext);

  return (
    <div style={{
      padding: "12px",
      borderRadius: "6px",
      background: theme === "light" ? "#f1f5f9" : "#1e293b",
      color: theme === "light" ? "#0f172a" : "#f8fafc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <strong>Global State Consumer:</strong> Hello, {user}!
        <span style={{ fontSize: "12px", marginLeft: "8px" }}>(Theme: {theme})</span>
      </div>
      <button onClick={toggleTheme} style={{ padding: "6px 12px", cursor: "pointer" }}>
        Switch Theme
      </button>
    </div>
  );
}

// 4. Another independent component consuming GLOBAL state
function UserProfileCard() {
  const { user, setUser } = useContext(GlobalAppContext);

  return (
    <div style={{ border: "1px dashed #94a3b8", padding: "12px", borderRadius: "6px", margin: "10px 0" }}>
      <h4>Another Consumer (Deep in Tree)</h4>
      <p style={{ fontSize: "13px", color: "#64748b" }}>Reads and updates global user state without prop drilling.</p>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Update global user..."
        style={{ padding: "6px", width: "100%", boxSizing: "border-box" }}
      />
    </div>
  );
}

export default function GlobalVsLocalStateDemo() {
  return (
    <GlobalAppProvider>
      <div style={{ maxWidth: "480px", margin: "20px auto", fontFamily: "sans-serif" }}>
        <h2>Global vs. Local State Architecture</h2>
        <GlobalThemeHeader />
        <LocalCounter />
        <LocalCounter />
        <UserProfileCard />
      </div>
    </GlobalAppProvider>
  );
}
