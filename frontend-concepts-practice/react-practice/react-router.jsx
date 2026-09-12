import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, Outlet, Navigate, useNavigate } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "12px", background: "#334155", padding: "10px", color: "white" }}>
        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "#38bdf8" : "white" })}>Home</NavLink>
        <NavLink to="/users/1" style={({ isActive }) => ({ color: isActive ? "#38bdf8" : "white" })}>User 1</NavLink>
        <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? "#38bdf8" : "white" })}>Dashboard</NavLink>
        <NavLink to="/admin" style={({ isActive }) => ({ color: isActive ? "#38bdf8" : "white" })}>Admin (Protected)</NavLink>
      </nav>
      <div style={{ padding: "16px" }}><Outlet /></div>
    </div>
  );
}

function UserDetail() {
  const { id } = useParams();
  return <h3>User Profile ID: {id}</h3>;
}

function Dashboard() {
  return (
    <div>
      <h3>Dashboard (Nested Routes)</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <Link to="stats">View Stats</Link> | <Link to="settings">Settings</Link>
      </div>
      <Outlet />
    </div>
  );
}

function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) return <Navigate to="/" replace />;
  return children;
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}

export default function RouterBasicsDemo() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ maxWidth: "540px", margin: "20px auto", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden" }}>
        <div style={{ padding: "8px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <label>
            <input type="checkbox" checked={isAuth} onChange={(e) => setIsAuth(e.target.checked)} />
            Authenticated status: <strong>{isAuth ? "Logged In" : "Logged Out"}</strong>
          </label>
        </div>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<p>Welcome to React Router Practice Home!</p>} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="stats" element={<p>📊 Analytics & Stats Data</p>} />
              <Route path="settings" element={<p>⚙️ Dashboard Preferences</p>} />
            </Route>
            <Route
              path="admin"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <p>🔒 Secret Admin Panel Area</p>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
