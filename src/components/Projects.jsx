import { motion } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    name: "To-do List",
    description:
      "Efficient Android task management with notifications and SQLite storage.",
    github: "https://github.com/SulemanAhmed1077/To-do-List",
    tech: ["Android", "Java", "SQLite"],
  },
  {
    name: "Health Monitor",
    description:
      "Track vitals like BP and Sugar with a clean, user-friendly interface.",
    github: "https://github.com/SulemanAhmed1077/HealthMonitor",
    tech: ["Android", "Firebase"],
  },
  {
    name: "Login UI",
    description:
      "Modern, secure, and aesthetic login interface implementation.",
    github: "https://github.com/SulemanAhmed1077/LoginUI-Android",
    tech: ["Android", "UI/UX"],
  },
];

// Sub-component for Individual Project Card with Spotlight
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -10, borderColor: "rgba(255,255,255,0.3)" }} // Lift up on hover
      className="group relative flex flex-col justify-between h-full p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
    >
      {/* Mouse Spotlight Layer */}
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`,
        }}
      />

      {/* Top Border Glow on Hover */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
            {project.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed min-h-[60px] font-light">
            {project.description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-wider border border-white/10 px-3 py-1 text-gray-500 rounded-md bg-white/5"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-white font-medium text-sm tracking-wider hover:text-gray-300 transition-colors group/link"
          >
            VIEW PROJECT
            <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-20 relative overflow-hidden"
    >
      {/* --- ANIMATED BACKGROUND ORBS --- */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[150px] pointer-events-none"
      />

      {/* --- SECTION TITLE --- */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-6xl md:text-8xl font-bold text-white mb-20 tracking-tighter text-center relative z-10"
      >
        SELECTED <span className="text-gray-800">WORKS</span>
      </motion.h2>

      {/* --- PROJECTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl z-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      {/* --- BOTTOM FADE --- */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Projects;
