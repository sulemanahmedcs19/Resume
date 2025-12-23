import { motion } from "framer-motion";

const skills = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "Redux Toolkit",
  "Firebase",
  "MongoDB",
  "Typescript",
  "Three.js",
  "JWT Auth",
  "OpenAI API",
  "Git",
  "GitHub",
  "Docker",
  "AWS",
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-6 py-12 relative"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 relative">
        Tech Stack
        <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10, zIndex: 10 }}
            className="flex items-center justify-center h-24 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 text-white font-bold text-lg cursor-pointer border border-white/5 shadow-lg"
            style={{ perspective: 1000 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
