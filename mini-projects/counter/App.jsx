const { useState, useEffect } = React;

function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("mini_counter_val");
    return saved !== null ? Number(saved) : 0;
  });
  const [step, setStep] = useState(1);
  const [autoRun, setAutoRun] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    localStorage.setItem("mini_counter_val", count);
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    let timer;
    if (autoRun) {
      timer = setInterval(() => {
        setCount((prev) => prev + step);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [autoRun, step]);

  const logAction = (action, newCount) => {
    const time = new Date().toLocaleTimeString();
    setHistory((prev) => [`[${time}] ${action} → ${newCount}`, ...prev.slice(0, 9)]);
  };

  const inc = () => {
    setCount((c) => {
      const next = c + step;
      logAction(`+${step}`, next);
      return next;
    });
  };

  const dec = () => {
    setCount((c) => {
      const next = c - step;
      logAction(`-${step}`, next);
      return next;
    });
  };

  const reset = () => {
    setCount(0);
    setAutoRun(false);
    logAction("Reset", 0);
  };

  return (
    <div className="counter-card">
      <h1>Counter & Effects Demo</h1>
      <p style={{ color: "#64748b", fontSize: "14px" }}>Testing useState vars & useEffect lifecycle</p>

      <div className="count-display">{count}</div>

      <div className="btn-group">
        <button onClick={dec}>- {step}</button>
        <button className="btn-primary" onClick={inc}>+ {step}</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="controls">
        <label>
          Step:{" "}
          <input
            type="number"
            value={step}
            min="1"
            max="100"
            onChange={(e) => setStep(Math.max(1, Number(e.target.value)))}
            style={{ width: "60px", padding: "4px" }}
          />
        </label>
        <button
          onClick={() => setAutoRun(!autoRun)}
          style={{ background: autoRun ? "#fee2e2" : "#e0f2fe", color: autoRun ? "#dc2626" : "#0284c7" }}
        >
          {autoRun ? "⏹ Stop Timer" : "▶ Start Auto"}
        </button>
      </div>

      <div className="history">
        <strong>Recent Actions ({history.length}):</strong>
        {history.length === 0 ? (
          <p style={{ margin: "4px 0", color: "#94a3b8" }}>No actions yet.</p>
        ) : (
          <ul>
            {history.map((entry, idx) => (
              <li key={idx}>{entry}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
