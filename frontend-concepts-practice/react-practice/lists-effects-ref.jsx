import { useState, useEffect, useRef } from "react";

export default function ListsEffectsRefDemo() {
  const [items, setItems] = useState(["React", "Vite", "Node"]);
  const [text, setText] = useState("");
  const [show, setShow] = useState(true);
  const [time, setTime] = useState(0);

  const inputRef = useRef(null);
  const countRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    countRef.current += 1;
  });

  const addItem = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setItems((prev) => [...prev, text.trim()]);
    setText("");
    inputRef.current?.focus();
  };

  const removeItem = (i) => {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div style={{ maxWidth: "450px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Lists, Conditions, Effect & Ref</h2>
      <p>Timer: {time}s | Render count: {countRef.current}</p>

      <button onClick={() => setShow(!show)}>
        {show ? "Hide List" : "Show List"}
      </button>

      {show ? (
        <ul style={{ paddingLeft: "20px", marginTop: "12px" }}>
          {items.map((item, idx) => (
            <li key={`${item}-${idx}`} style={{ margin: "4px 0" }}>
              {item} <button onClick={() => removeItem(idx)}>×</button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#888" }}>List is hidden</p>
      )}

      {items.length === 0 && <p style={{ color: "red" }}>No items left!</p>}

      <form onSubmit={addItem} style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="New tech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: "6px" }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
