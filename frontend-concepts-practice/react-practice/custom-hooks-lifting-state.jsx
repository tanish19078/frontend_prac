import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [val, setVal] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error(e);
    }
  }, [key, val]);

  return [val, setVal];
}

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((result) => {
        if (isMounted) setData(result);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

function TemperatureInput({ scale, value, onChange }) {
  return (
    <div style={{ margin: "8px 0" }}>
      <label>Degrees in {scale === "c" ? "Celsius" : "Fahrenheit"}: </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value, scale)}
        style={{ padding: "4px" }}
      />
    </div>
  );
}

function StatusIndicator({ tempC }) {
  return (
    <p style={{ fontWeight: "bold" }}>
      {tempC >= 100 ? "Water is boiling!" : tempC <= 0 ? "Water is frozen!" : "Water is liquid."}
    </p>
  );
}

export default function CustomHooksLiftingStateDemo() {
  const [savedUser, setSavedUser] = useLocalStorage("practice_user", "Tanish");
  const [temp, setTemp] = useState({ scale: "c", val: "25" });

  const handleTempChange = (val, scale) => {
    setTemp({ val, scale });
  };

  const celsius = temp.scale === "f" ? (((parseFloat(temp.val) || 0) - 32) * 5) / 9 : parseFloat(temp.val) || 0;
  const fahrenheit = temp.scale === "c" ? ((parseFloat(temp.val) || 0) * 9) / 5 + 32 : parseFloat(temp.val) || 0;

  const { data: samplePost, loading: postLoading } = useFetch("https://jsonplaceholder.typicode.com/posts/1");

  return (
    <div style={{ maxWidth: "460px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Custom Hooks & Lifting State Up</h2>

      <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "6px", marginBottom: "16px" }}>
        <h4>Custom Hook: useLocalStorage</h4>
        <input
          type="text"
          value={savedUser}
          onChange={(e) => setSavedUser(e.target.value)}
          placeholder="Persisted user..."
          style={{ padding: "6px" }}
        />
        <p><small>Stored in localStorage: <strong>{savedUser}</strong></small></p>
      </div>

      <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", marginBottom: "16px", border: "1px solid #e2e8f0" }}>
        <h4>Custom Hook: useFetch</h4>
        {postLoading ? (
          <p style={{ fontSize: "14px", color: "#64748b" }}>Loading sample data...</p>
        ) : (
          <p style={{ fontSize: "14px" }}>Sample Post: <strong>{samplePost?.title || "Fetched"}</strong></p>
        )}
      </div>

      <div style={{ border: "1px solid #e2e8f0", padding: "12px", borderRadius: "6px" }}>
        <h4>Lifting State Up (Temperature Converter)</h4>
        <TemperatureInput scale="c" value={temp.scale === "c" ? temp.val : celsius.toFixed(1)} onChange={handleTempChange} />
        <TemperatureInput scale="f" value={temp.scale === "f" ? temp.val : fahrenheit.toFixed(1)} onChange={handleTempChange} />
        <StatusIndicator tempC={celsius} />
      </div>
    </div>
  );
}
