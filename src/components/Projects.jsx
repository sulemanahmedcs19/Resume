import { motion } from "framer-motion";

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

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center bg-[#050505] px-6 py-20 relative"
    >
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-64 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <h2 className="text-5xl md:text-7xl font-bold text-white mb-16 tracking-tighter">
        SELECTED <span className="text-gray-600">WORKS</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative p-8 bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-300 transition-colors">
              {project.name}
            </h3>

            <p className="text-gray-500 mb-8 text-sm leading-relaxed min-h-[60px] font-light">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 text-gray-400"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-white font-medium text-sm tracking-wider hover:text-gray-400 transition-colors"
            >
              VIEW CASE STUDY →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
