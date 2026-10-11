import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ name: username, role: "Member" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function UserGreeting() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <p style={{ color: "#64748b" }}>Please log in to continue.</p>;
  }

  return (
    <div style={{ background: "#f0fdf4", padding: "12px", borderRadius: "6px", border: "1px solid #bbf7d0" }}>
      <h4>Welcome back, {user.name}!</h4>
      <p style={{ margin: "4px 0", fontSize: "14px" }}>Role: {user.role}</p>
      <button onClick={logout} style={{ padding: "6px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Log Out
      </button>
    </div>
  );
}

function LoginForm() {
  const { user, login } = useContext(AuthContext);
  const [nameInput, setNameInput] = useState("");

  if (user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    login(nameInput.trim());
    setNameInput("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
      <input
        type="text"
        placeholder="Enter your username..."
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        style={{ flex: 1, padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
      />
      <button type="submit" style={{ padding: "8px 14px", background: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Log In
      </button>
    </form>
  );
}

export default function ContextApiDemo() {
  return (
    <AuthProvider>
      <div style={{ maxWidth: "440px", margin: "20px auto", fontFamily: "sans-serif", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px" }}>
        <h2 style={{ marginTop: 0 }}>React Context API Demo</h2>
        <UserGreeting />
        <LoginForm />
      </div>
    </AuthProvider>
  );
}
