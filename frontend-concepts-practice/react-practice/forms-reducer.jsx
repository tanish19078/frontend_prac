import { useReducer, useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  age: "",
  course: "React",
  phone: ""
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialFormData;
    default:
      return state;
  }
}

export default function FormsReducerDemo() {
  const [formData, dispatch] = useReducer(formReducer, initialFormData);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ ...formData });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setSubmittedData(null);
  };

  return (
    <div style={{ maxWidth: "440px", margin: "20px auto", fontFamily: "sans-serif", padding: "16px", border: "1px solid #cbd5e1", borderRadius: "8px" }}>
      <h2>Registration with useReducer</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <label style={{ display: "block", fontSize: "13px", marginBottom: "3px" }}>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "7px", boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "13px", marginBottom: "3px" }}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "7px", boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "13px", marginBottom: "3px" }}>Age:</label>
          <input type="number" name="age" min="1" max="120" value={formData.age} onChange={handleChange} required style={{ width: "100%", padding: "7px", boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "13px", marginBottom: "3px" }}>Course:</label>
          <select name="course" value={formData.course} onChange={handleChange} style={{ width: "100%", padding: "7px" }}>
            <option value="React">React & Redux</option>
            <option value="Node">Node.js & Express</option>
            <option value="Fullstack">Fullstack Web Dev</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "13px", marginBottom: "3px" }}>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: "100%", padding: "7px", boxSizing: "border-box" }} />
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
          <button type="submit" style={{ flex: 1, padding: "9px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Submit
          </button>
          <button type="button" onClick={handleReset} style={{ padding: "9px 14px", background: "#94a3b8", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Reset
          </button>
        </div>
      </form>

      {submittedData && (
        <div style={{ marginTop: "16px", padding: "12px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "6px", fontSize: "13px" }}>
          <h4>Submitted Details:</h4>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Age: {submittedData.age}</p>
          <p>Course: {submittedData.course}</p>
          <p>Phone: {submittedData.phone}</p>
        </div>
      )}
    </div>
  );
}
