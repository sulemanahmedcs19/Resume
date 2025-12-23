import { motion } from "framer-motion";

const projects = [
  {
    name: "To-do List",
    description:
      "Android app using Alarm Manager, Notifications, SQLite. Organizes tasks with Overdue & Upcoming sections.",
    github: "https://github.com/SulemanAhmed1077/To-do-List",
    tech: ["Android", "Java", "SQLite"],
  },
  {
    name: "Health Monitor",
    description:
      "Android app to track Blood Pressure, Sugar, Calories and record health data efficiently.",
    github: "https://github.com/SulemanAhmed1077/HealthMonitor",
    tech: ["Android", "XML", "Firebase"],
  },
  {
    name: "Login UI",
    description:
      "Modern, clean Android user login layout application with validation.",
    github: "https://github.com/SulemanAhmed1077/LoginUI-Android",
    tech: ["Android", "UI/UX"],
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-6 py-12 relative"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] -z-10" />

      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
        Featured <span className="text-blue-500">Projects</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className="group bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed min-h-[80px]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
              View on GitHub
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
