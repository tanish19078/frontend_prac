import { useState, useEffect, useCallback } from "react";

/**
 * Custom Async Fetch Hook:
 * Handles the complete async lifecycle: idle, pending, success, error.
 * Includes AbortController for clean cancellation and prevent race conditions.
 */
function useFetchData(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [error, setError] = useState(null);

  const executeFetch = useCallback(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setStatus("success");
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch resource");
          setStatus("error");
        }
      });

    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    if (!url) return;
    const cleanup = executeFetch();
    return cleanup;
  }, [url, executeFetch]);

  return { data, status, error, refetch: executeFetch };
}

export default function AsyncStateHandlingDemo() {
  const [endpoint, setEndpoint] = useState("https://jsonplaceholder.typicode.com/posts?_limit=4");
  const { data, status, error, refetch } = useFetchData(endpoint);

  const simulateError = () => {
    setEndpoint("https://jsonplaceholder.typicode.com/invalid-broken-endpoint-404");
  };

  const simulateSuccess = () => {
    setEndpoint("https://jsonplaceholder.typicode.com/posts?_limit=4");
  };

  return (
    <div style={{ maxWidth: "560px", margin: "24px auto", fontFamily: "sans-serif", padding: "16px", border: "1px solid #cbd5e1", borderRadius: "8px" }}>
      <h2>Async State & Error Handling</h2>
      <p style={{ color: "#64748b", fontSize: "14px" }}>
        Robust handling of async request lifecycles (Idle, Loading, Success, Error) with cancelation and retries.
      </p>

      {/* Control Buttons */}
      <div style={{ display: "flex", gap: "10px", margin: "16px 0" }}>
        <button
          onClick={simulateSuccess}
          style={{ padding: "8px 14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Fetch Posts (Valid)
        </button>
        <button
          onClick={simulateError}
          style={{ padding: "8px 14px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Simulate 404 Error
        </button>
        <button
          onClick={refetch}
          disabled={status === "loading"}
          style={{ padding: "8px 14px", background: "#475569", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          🔄 Refetch
        </button>
      </div>

      {/* State Indicators */}
      <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: "4px", marginBottom: "16px", fontSize: "13px" }}>
        <strong>Current Status: </strong>
        <span style={{
          padding: "2px 8px",
          borderRadius: "4px",
          color: "#fff",
          background:
            status === "loading" ? "#f59e0b" :
            status === "success" ? "#10b981" :
            status === "error" ? "#ef4444" : "#64748b"
        }}>
          {status.toUpperCase()}
        </span>
      </div>

      {/* Loading Skeleton / Spinner */}
      {status === "loading" && (
        <div style={{ padding: "24px", textAlign: "center", color: "#64748b" }}>
          <div style={{ display: "inline-block", width: "24px", height: "24px", border: "3px solid #cbd5e1", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          <p style={{ margin: "8px 0 0" }}>Loading remote data...</p>
        </div>
      )}

      {/* Error Fallback with Retry */}
      {status === "error" && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "16px", borderRadius: "6px", color: "#991b1b" }}>
          <h4 style={{ margin: "0 0 6px" }}>⚠️ Request Error</h4>
          <p style={{ margin: "0 0 12px", fontSize: "14px" }}>{error}</p>
          <button
            onClick={refetch}
            style={{ padding: "6px 12px", background: "#b91c1c", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Success Output */}
      {status === "success" && data && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {data.map((item) => (
            <div key={item.id} style={{ padding: "12px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "#fff" }}>
              <h4 style={{ margin: "0 0 4px", fontSize: "15px", textTransform: "capitalize" }}>{item.title}</h4>
              <p style={{ margin: 0, color: "#475569", fontSize: "13px" }}>{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
