const { useState, useEffect } = React;

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("react_notes_app");
      return saved ? JSON.parse(saved) : [
        { id: 1, title: "Learn React", body: "Practice hooks and components daily.", tag: "Study", pinned: true },
        { id: 2, title: "Workout", body: "Cardio and strength training.", tag: "Health", pinned: false }
      ];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("General");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("react_notes_app", JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newNote = { id: Date.now(), title: title.trim(), body: body.trim(), tag, pinned: false };
    setNotes([newNote, ...notes]);
    setTitle("");
    setBody("");
  };

  const deleteNote = (id) => setNotes(notes.filter((n) => n.id !== id));
  const togglePin = (id) => setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="notes-container">
      <h1>📝 React Notes App</h1>

      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Note details..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="3"
        />
        <div style={{ display: "flex", gap: "8px" }}>
          <select value={tag} onChange={(e) => setTag(e.target.value)} style={{ width: "120px" }}>
            <option value="General">General</option>
            <option value="Study">Study</option>
            <option value="Health">Health</option>
            <option value="Work">Work</option>
          </select>
          <button type="submit" className="btn-primary" style={{ flex: 1 }}>Add Note</button>
        </div>
      </form>

      <input
        type="text"
        placeholder="🔍 Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "16px" }}
      />

      <div>
        {filtered.map((note) => (
          <div key={note.id} className={`note-item ${note.pinned ? "pinned" : ""}`}>
            <div className="note-header">
              <h4>{note.pinned && "📌 "}{note.title}</h4>
              <span className="badge">{note.tag}</span>
            </div>
            <p style={{ margin: "6px 0", fontSize: "14px", color: "#475569" }}>{note.body}</p>
            <div className="note-actions">
              <button onClick={() => togglePin(note.id)}>
                {note.pinned ? "Unpin" : "Pin"}
              </button>
              <button onClick={() => deleteNote(note.id)} style={{ color: "#dc2626" }}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ textAlign: "center", color: "#94a3b8" }}>No notes found.</p>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
