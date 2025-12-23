import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-[#050505] px-6 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center p-10 md:p-16 rounded-none border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter"
        >
          ABOUT ME
        </motion.h2>

        <div className="space-y-8 text-gray-400 text-lg md:text-xl font-light leading-relaxed">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            I’m Suleman Ahmed, a Full Stack Developer who bridges the gap
            between <span className="text-white">complex logic</span> and{" "}
            <span className="text-white">fluid design</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            My focus is on building applications that feel alive. Using the MERN
            stack, I craft seamless digital experiences that are both functional
            and visually stunning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="pt-8 border-t border-white/10 mt-8"
          >
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4">
              Education
            </h3>
            <p className="text-sm">
              B.Sc Computer Science - Virtual University of Pakistan
            </p>
            <p className="text-sm">Advanced Diploma - Aptech</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
