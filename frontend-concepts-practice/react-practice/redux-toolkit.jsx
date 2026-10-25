import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

export default function ReduxToolkitDemo() {
  const [count, setCount] = useState(store.getState().counter.value);
  const [amount, setAmount] = useState(5);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().counter.value);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "sans-serif", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "20px" }}>
      <h2>Redux Toolkit (RTK) Demo</h2>
      <p style={{ color: "#64748b", fontSize: "14px" }}>createSlice & configureStore in action</p>
      <div style={{ fontSize: "40px", fontWeight: "bold", margin: "16px 0", color: "#2563eb" }}>{count}</div>

      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
        <button onClick={() => store.dispatch(decrement())} style={{ padding: "8px 14px", cursor: "pointer" }}>-1</button>
        <button onClick={() => store.dispatch(increment())} style={{ padding: "8px 14px", cursor: "pointer" }}>+1</button>
        <button onClick={() => store.dispatch(reset())} style={{ padding: "8px 14px", cursor: "pointer" }}>Reset</button>
      </div>

      <div style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "center" }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{ width: "60px", padding: "6px" }}
        />
        <button onClick={() => store.dispatch(incrementByAmount(amount))} style={{ padding: "6px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Add By Amount
        </button>
      </div>
    </div>
  );
}
