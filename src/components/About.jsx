import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const About = () => {
  const ref = useRef(null);

  // 1. Mouse Position Logic for Spotlight
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 2. 3D Tilt Logic (Simple version)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMoveTilt = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-[#050505] px-6 relative overflow-hidden"
    >
      {/* --- ANIMATED BACKGROUND ORBS (Floating Blobs) --- */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, -80, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none"
      />

      {/* --- MAIN CARD WITH SPOTLIGHT & TILT --- */}
      <div className="relative z-10 w-full max-w-4xl perspective-[1000px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
          onMouseMove={(e) => {
            handleMouseMove(e);
            handleMouseMoveTilt(e);
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          className="relative text-center p-10 md:p-20 rounded-2xl border border-white/10 bg-[#0a0a0a] backdrop-blur-2xl overflow-hidden group"
        >
          {/* Mouse Spotlight Gradient (The "Magic" Background) */}
          <motion.div
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter"
            >
              ABOUT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                ME
              </span>
            </motion.h2>

            <div className="space-y-8 text-gray-400 text-lg md:text-xl font-light leading-relaxed">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                I’m Suleman Ahmed, a Full Stack Developer who bridges the gap
                between{" "}
                <span className="text-white font-semibold">complex logic</span>{" "}
                and{" "}
                <span className="text-white font-semibold">fluid design</span>.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                My focus is on building applications that feel alive. Using the
                MERN stack, I craft seamless digital experiences that are both
                functional and visually stunning.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="pt-10 border-t border-white/10 mt-8"
              >
                <h3 className="text-xs font-bold text-white tracking-[0.3em] uppercase mb-4">
                  Education
                </h3>
                <p className="text-sm text-gray-500 font-mono mb-1">
                  &lt; B.Sc Computer Science /&gt; - VU
                </p>
                <p className="text-sm text-gray-500 font-mono">
                  &lt; Advanced Diploma /&gt; - Aptech
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
