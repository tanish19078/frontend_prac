import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate } from "react-router-dom";

const PORTFOLIO_PROJECTS = [
  { id: "weather", title: "Weather Dashboard", tech: "React & OpenWeather", desc: "Real-time forecast with search and location services." },
  { id: "ecommerce", title: "E-Commerce Cart", tech: "Redux Toolkit & React Router", desc: "Full-featured shopping store with product catalog and checkout." },
  { id: "notes", title: "Productivity Notes", tech: "React & LocalStorage", desc: "Markdown-supported notes manager with tags and search." }
];

function Nav() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    color: isActive ? "#fff" : "#475569",
    background: isActive ? "#2563eb" : "transparent",
    fontWeight: 500
  });

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #e2e8f0" }}>
      <strong style={{ fontSize: "18px" }}>Portfolio SPA</strong>
      <div style={{ display: "flex", gap: "8px" }}>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/projects" style={linkStyle}>Projects</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
      </div>
    </nav>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <h1>Hi, I'm a Frontend Developer 👋</h1>
      <p style={{ color: "#64748b", maxWidth: "460px", margin: "12px auto" }}>
        Building fast, scalable single-page web applications with React, modern CSS, and state management.
      </p>
      <button onClick={() => navigate("/projects")} style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>
        View My Work →
      </button>
    </div>
  );
}

function Projects() {
  return (
    <div style={{ maxWidth: "600px", margin: "24px auto", padding: "0 16px" }}>
      <h2>Featured Projects</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
        {PORTFOLIO_PROJECTS.map((p) => (
          <div key={p.id} style={{ border: "1px solid #e2e8f0", padding: "16px", borderRadius: "8px" }}>
            <h3 style={{ margin: "0 0 4px" }}>{p.title}</h3>
            <span style={{ fontSize: "12px", background: "#eff6ff", color: "#2563eb", padding: "2px 6px", borderRadius: "4px" }}>{p.tech}</span>
            <p style={{ margin: "8px 0 12px", color: "#475569", fontSize: "14px" }}>{p.desc}</p>
            <Link to={`/projects/${p.id}`} style={{ color: "#2563eb", fontSize: "13px", fontWeight: 600 }}>Read Case Study →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h3>Project not found</h3>
        <button onClick={() => navigate("/projects")}>Back to Projects</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", padding: "20px", border: "1px solid #cbd5e1", borderRadius: "8px" }}>
      <h2>{project.title}</h2>
      <p style={{ color: "#2563eb", fontWeight: 600 }}>Tech Stack: {project.tech}</p>
      <p style={{ lineHeight: 1.6, color: "#334155" }}>{project.desc} Demonstrates routing architecture, data flow, and modern responsive design.</p>
      <button onClick={() => navigate("/projects")} style={{ padding: "8px 14px", marginTop: "12px", cursor: "pointer" }}>← Back to All Projects</button>
    </div>
  );
}

function About() {
  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", padding: "0 16px" }}>
      <h2>About Me</h2>
      <p style={{ lineHeight: 1.6, color: "#475569" }}>
        Passionate about crafting intuitive user experiences with component-based architectures, hooks, and clean code principles.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ maxWidth: "400px", margin: "30px auto", padding: "0 16px" }}>
      <h2>Get In Touch</h2>
      <p style={{ color: "#64748b" }}>Email: developer@example.com</p>
      <p style={{ color: "#64748b" }}>GitHub: github.com/tanish19078</p>
    </div>
  );
}

export default function PortfolioRoutingDemo() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "sans-serif", minHeight: "100vh" }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
