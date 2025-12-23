import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-gray-900 px-6 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8"
        >
          About Me
        </motion.h2>

        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            I’m Suleman Ahmed, a Full Stack MERN Developer passionate about
            building scalable web applications. My expertise lies in{" "}
            <span className="text-blue-400">
              React.js, Node.js, Tailwind CSS, and Firebase
            </span>
            .
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Whether it's managing complex backend logic or crafting interactive
            frontend animations, I love solving problems. I'm continuously
            exploring new tech stacks like React Native and Flutter to expand my
            horizons.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-6 bg-black/30 rounded-xl border-l-4 border-purple-500 text-left"
          >
            <h3 className="text-xl font-bold text-white mb-2">Education</h3>
            <p>B.Sc Computer Science - Virtual University of Pakistan</p>
            <p>Advanced Diploma in Software Engineering - Aptech</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
