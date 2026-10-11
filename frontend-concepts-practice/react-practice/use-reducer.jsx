import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1
};

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "double":
      return { ...state, count: state.count * 2 };
    case "reset":
      return { ...state, count: 0 };
    case "setStep":
      return { ...state, step: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function UseReducerDemo() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "sans-serif", textAlign: "center" }}>
      <h2>useReducer Demo</h2>
      <div style={{ fontSize: "36px", fontWeight: "bold", margin: "16px 0" }}>
        {state.count}
      </div>

      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
        <button onClick={() => dispatch({ type: "decrement" })}>- {state.step}</button>
        <button onClick={() => dispatch({ type: "increment" })}>+ {state.step}</button>
        <button onClick={() => dispatch({ type: "double" })}>× 2</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>

      <div>
        <label>
          Step:{" "}
          <input
            type="number"
            min="1"
            max="10"
            value={state.step}
            onChange={(e) =>
              dispatch({ type: "setStep", payload: Math.max(1, Number(e.target.value)) })
            }
            style={{ width: "60px", padding: "4px" }}
          />
        </label>
      </div>
    </div>
  );
}
