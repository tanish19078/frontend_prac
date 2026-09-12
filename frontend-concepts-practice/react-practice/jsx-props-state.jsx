import { useState } from "react";

function UserCard({ name = "Guest", role = "Viewer", count = 0, onIncrement }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", margin: "8px 0", borderRadius: "6px" }}>
      <h3>{name}</h3>
      <p>Role: {role}</p>
      <p>Likes: {count}</p>
      <button onClick={onIncrement}>+ Like</button>
    </div>
  );
}

export default function BasicsDemo() {
  const [likes, setLikes] = useState(0);
  const [online, setOnline] = useState(true);
  const [user, setUser] = useState({ name: "Alex", role: "Developer" });

  const inc = () => setLikes((prev) => prev + 1);
  const toggle = () => setOnline((prev) => !prev);

  return (
    <div style={{ maxWidth: "420px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h1>React Basics & Components</h1>
      <p>Status: <strong>{online ? "🟢 Online" : "🔴 Offline"}</strong></p>
      <button onClick={toggle}>Toggle Status</button>

      <UserCard
        name={user.name}
        role={user.role}
        count={likes}
        onIncrement={inc}
      />

      <input
        type="text"
        placeholder="Change name..."
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        style={{ padding: "6px", width: "100%", marginTop: "8px" }}
      />
    </div>
  );
}
