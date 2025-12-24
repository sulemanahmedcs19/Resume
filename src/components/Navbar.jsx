import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  motionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const sections = ["Home", "About", "Skills", "Projects", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offsets = sections.map((section) => {
        const el = document.getElementById(section.toLowerCase());
        return el ? el.offsetTop : 0;
      });
      const currentIndex = offsets.findIndex(
        (offset, i) => scrollY < offset - 100
      );
      setActive(sections[Math.max(0, currentIndex - 1)] || "Contact");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* --- Logo Design --- */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-white font-bold text-xl tracking-[0.2em] uppercase cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Suleman
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800">
            .dev
          </span>
        </motion.div>

        {/* --- Desktop Menu --- */}
        <ul className="hidden md:flex gap-10 text-gray-400 font-light text-xs tracking-[0.25em] uppercase relative">
          {sections.map((section) => (
            <li
              key={section}
              className={`cursor-pointer transition-colors duration-300 hover:text-white relative py-1 ${
                active === section ? "text-white" : ""
              }`}
              onClick={() => {
                document
                  .getElementById(section.toLowerCase())
                  .scrollIntoView({ behavior: "smooth" });
                setActive(section);
              }}
            >
              {section}
              {/* --- Sliding Active Indicator (Glowing Line) --- */}
              {active === section && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* --- Mobile Menu Button --- */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="block"
          >
            {isOpen ? "✕" : "☰"}
          </motion.span>
        </button>
      </div>

      {/* --- Mobile Menu Dropdown (Staggered Animation) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-0 left-0 w-full bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 overflow-hidden"
          >
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white text-2xl"
            >
              ✕
            </motion.button>

            {sections.map((section, index) => (
              <motion.li
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.4 }} // Staggered Effect
                onClick={() => {
                  document
                    .getElementById(section.toLowerCase())
                    .scrollIntoView({ behavior: "smooth" });
                  setIsOpen(false);
                }}
                className={`text-3xl uppercase tracking-widest cursor-pointer transition-colors ${
                  active === section
                    ? "text-white font-bold"
                    : "text-gray-600 hover:text-white"
                }`}
              >
                {section}
              </motion.li>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
