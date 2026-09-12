import { useState, useMemo, useCallback, memo } from "react";

function Card({ title, children, footer }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px", margin: "12px 0" }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div>{children}</div>
      {footer && <div style={{ borderTop: "1px solid #eee", marginTop: "12px", paddingTop: "8px" }}>{footer}</div>}
    </div>
  );
}

const ActionButton = memo(function ActionButton({ onClick, label }) {
  return <button onClick={onClick} style={{ margin: "4px" }}>{label}</button>;
});

export default function MemoCallbackCompositionDemo() {
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const [count, setCount] = useState(0);

  const numbers = useMemo(() => Array.from({ length: 1000 }, (_, i) => i + 1), []);

  const filtered = useMemo(() => {
    return numbers.filter((n) => String(n).includes(query)).slice(0, 5);
  }, [numbers, query]);

  const handleIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  const themeStyle = {
    background: dark ? "#1e293b" : "#ffffff",
    color: dark ? "#f8fafc" : "#0f172a",
    padding: "20px",
    maxWidth: "480px",
    margin: "20px auto",
    borderRadius: "8px",
    fontFamily: "sans-serif"
  };

  return (
    <div style={themeStyle}>
      <h2>useMemo, useCallback & Composition</h2>
      <button onClick={() => setDark(!dark)}>Toggle Dark Theme</button>

      <Card
        title="Counter Component"
        footer={<small>Count value: {count}</small>}
      >
        <ActionButton onClick={handleIncrement} label="+ Add" />
        <ActionButton onClick={handleReset} label="Reset" />
      </Card>

      <Card title="Filtered Numbers (useMemo)">
        <input
          type="text"
          placeholder="Filter numbers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "6px", width: "100%", marginBottom: "8px" }}
        />
        <p>Top matches: {filtered.join(", ") || "None"}</p>
      </Card>
    </div>
  );
}
