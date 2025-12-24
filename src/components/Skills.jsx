import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

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

// --- Premium 3D Spotlight Card ---
const SkillCard = ({ skill }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D Tilt calculation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring config for smooth animation
  const springConfig = { damping: 25, stiffness: 700 };

  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]); // Tilt Up/Down
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]); // Tilt Left/Right

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      // 1. Get mouse position inside the card
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      // 2. Calculate rotation based on mouse position relative to center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      x.set((e.clientX - rect.left - centerX) / centerX); // Value between -0.5 and 0.5
      y.set((e.clientY - rect.top - centerY) / centerY); // Value between -0.5 and 0.5
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset rotation
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      // Animation setup
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // 3D Rotation Styles
      style={{
        rotateX: useSpring(rotateX, springConfig),
        rotateY: useSpring(rotateY, springConfig),
      }}
      // Event Handlers
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative h-32 rounded-2xl bg-[#0a0a0a] border border-white/10 cursor-pointer overflow-hidden"
    >
      {/* --- 1. The Spotlight Effect (Gradient that follows mouse) --- */}
      <div
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* --- 2. Border Glow (Simulated) --- */}
      {/* This creates a subtle glow on the border where the light is */}
      <div
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.5), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
          maskImage:
            "linear-gradient(to bottom, black, black) content-box, linear-gradient(to bottom, black, black)",
          maskComposite: "exclude", // Only affects the border area (browser support dependent, simplified below)
        }}
        // Note: The mask trick is tricky across browsers, so we rely on the main spotlight
      />

      {/* --- 3. Content (Always on top) --- */}
      <div className="relative z-10 flex items-center justify-center h-full w-full backdrop-blur-sm">
        <span className="text-white text-lg font-medium tracking-widest uppercase select-none">
          {skill}
        </span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-20 relative overflow-hidden"
    >
      {/* --- ANIMATED BACKGROUND ORBS --- */}
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-1/5 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/3 right-1/5 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* --- SECTION TITLE --- */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-6xl md:text-8xl font-bold text-white mb-20 tracking-tighter text-center"
      >
        TECH <span className="text-gray-800">STACK</span>
      </motion.h2>

      {/* --- SKILLS GRID --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl z-10">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>

      {/* --- BOTTOM FADE --- */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Skills;
