import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";


// Home, About, Skills, Projects, Contact, Resume

function WelcomeHome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to My Portfolio</h1>
      <p>Explore my projects and skills.</p>
      <button onClick={() => navigate("/home")}>Get Started</button>
    </div>
  );
}


const description = () => "Xyza1";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1>My Portfolio</h1>
      <p>Discover my work and experience.</p>
      <button onClick={() => navigate("/projects")}>View Projects</button>
    </div>
  );
}

function About() {
  return (
    <div className="about-container">
      <h1>About Me</h1>
      <p>I enjoy building web applications and learning new technologies.</p>
    </div>
  );
}

function Skills() {
  return (
    <div className="skills-container">
      <h1>My Skills</h1>
      <ul>
        <li>JavaScript</li>
        <li>React</li>
        <li>Node.js</li>
        <li>HTML &amp; CSS</li>
      </ul>
    </div>
  );
}

function Projects() {
  return (
    <div className="projects-container">
      <h1>My Projects</h1>
      <p>Here are some of the projects I have worked on.</p>
      <a href="https://github.com/tanish19078">View my GitHub</a>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      <a href="https://github.com/tanish19078">Find me on GitHub</a>
    </div>
  );
}

function Resume() {
  return (
    <div className="resume-container">
      <h1>My Resume</h1>
      <p>My resume IS available here . Download Below</p>
      <a href="C:\Users\Tanish Singla\Downloads\11.pdf" >resume </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/resume">Resume</Link>
      </nav>

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<WelcomeHome />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}