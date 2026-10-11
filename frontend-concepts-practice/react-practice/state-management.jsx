import { useState } from "react";

function submitQuizAnswer(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isCorrect = answer.trim().toLowerCase() === "lima";
      if (isCorrect) {
        resolve();
      } else {
        reject(new Error("Wrong answer! Hint: Capital of Peru."));
      }
    }, 1500);
  });
}

export default function StateManagementDemo() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing"); // "typing" | "submitting" | "success"

  if (status === "success") {
    return (
      <div style={{ maxWidth: "440px", margin: "20px auto", fontFamily: "sans-serif", padding: "16px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px" }}>
        <h3>That's right! 🎉</h3>
        <p>Lima is the city with the potable water billboard.</p>
        <button
          onClick={() => {
            setAnswer("");
            setStatus("typing");
            setError(null);
          }}
          style={{ padding: "8px 12px", background: "#16a34a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      await submitQuizAnswer(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  };

  return (
    <div style={{ maxWidth: "440px", margin: "20px auto", fontFamily: "sans-serif", padding: "16px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
      <h2>Async State Management Demo</h2>
      <p style={{ color: "#475569" }}>
        In which city is there a billboard that turns air into drinkable water?
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={status === "submitting"}
          placeholder="Type your answer..."
          rows="3"
          style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
        />

        <button
          type="submit"
          disabled={answer.trim().length === 0 || status === "submitting"}
          style={{ padding: "10px", background: status === "submitting" ? "#94a3b8" : "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: status === "submitting" ? "not-allowed" : "pointer" }}
        >
          {status === "submitting" ? "Checking answer..." : "Submit Answer"}
        </button>

        {error && (
          <p style={{ color: "#dc2626", margin: "4px 0", fontSize: "14px" }}>
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
