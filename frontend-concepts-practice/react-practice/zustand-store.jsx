import { create } from "zustand";

/**
 * Zustand Store:
 * A lightweight, hook-based state management store without Provider wrappers.
 * Supports synchronous actions, async actions, and selective component subscriptions.
 */
export const useTaskStore = create((set) => ({
  tasks: [
    { id: 1, title: "Learn React Hooks", completed: true },
    { id: 2, title: "Master Zustand Store", completed: false }
  ],
  filter: "all", // "all" | "active" | "completed"
  loading: false,

  // Synchronous actions
  addTask: (title) => {
    if (!title.trim()) return;
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), title: title.trim(), completed: false }]
    }));
  },

  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }));
  },

  setFilter: (filter) => set({ filter }),

  // Asynchronous action example
  fetchSampleTasks: async () => {
    set({ loading: true });
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    set({
      tasks: [
        { id: 101, title: "Review Pull Requests", completed: false },
        { id: 102, title: "Refactor Context API", completed: true },
        { id: 103, title: "Deploy to Production", completed: false }
      ],
      loading: false
    });
  }
}));

export default function ZustandDemo() {
  // Selective subscriptions: only re-renders when these selected slices change
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const loading = useTaskStore((state) => state.loading);

  // Extract action handlers (functions are stable and do not cause re-renders)
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setFilter = useTaskStore((state) => state.setFilter);
  const fetchSampleTasks = useTaskStore((state) => state.fetchSampleTasks);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const input = e.target.elements.taskInput;
    addTask(input.value);
    input.value = "";
  };

  return (
    <div style={{ maxWidth: "520px", margin: "24px auto", fontFamily: "sans-serif", padding: "16px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Zustand Task Store</h2>
        <button
          onClick={fetchSampleTasks}
          disabled={loading}
          style={{ padding: "6px 12px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
        >
          {loading ? "Loading..." : "Load Demo Tasks"}
        </button>
      </div>

      <p style={{ color: "#64748b", fontSize: "13px", margin: "8px 0 16px" }}>
        Global state hook without reducers, dispatchers, or Provider nesting.
      </p>

      {/* Add Task Form */}
      <form onSubmit={handleCreate} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          name="taskInput"
          placeholder="What needs to be done?"
          style={{ flex: 1, padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 16px", background: "#059669", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Add
        </button>
      </form>

      {/* Filter Buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "4px 10px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: filter === f ? "#0f172a" : "#f8fafc",
              color: filter === f ? "#fff" : "#334155",
              cursor: "pointer",
              fontSize: "12px",
              textTransform: "capitalize"
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {filteredTasks.length === 0 ? (
          <li style={{ color: "#94a3b8", textAlign: "center", padding: "16px" }}>No tasks found in this view.</li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                borderBottom: "1px solid #f1f5f9"
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span style={{ textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "#94a3b8" : "#1e293b" }}>
                  {task.title}
                </span>
              </label>
              <button
                onClick={() => deleteTask(task.id)}
                style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px" }}
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
