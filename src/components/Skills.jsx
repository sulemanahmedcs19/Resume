import { motion } from "framer-motion";

const skills = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "Redux",
  "Firebase",
  "MongoDB",
  "Three.js",
  "Typescript",
  "Git",
  "PostgreSQL",
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-20 relative"
    >
      <h2 className="text-5xl md:text-7xl font-bold text-white mb-16 tracking-tighter text-center">
        TECH <span className="text-gray-600">STACK</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(255,255,255,0.5)",
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
            className="h-24 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-white font-light text-lg tracking-widest uppercase backdrop-blur-md transition-all duration-300"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
