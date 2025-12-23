import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5" // Glass Effect
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-white font-bold text-xl tracking-[0.2em] uppercase">
          Suleman<span className="text-gray-500">.dev</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-400 font-light text-sm tracking-widest uppercase">
          {sections.map((section) => (
            <li
              key={section}
              className={`cursor-pointer transition-all duration-300 hover:text-white ${
                active === section ? "text-white font-bold" : ""
              }`}
              onClick={() => {
                document
                  .getElementById(section.toLowerCase())
                  .scrollIntoView({ behavior: "smooth" });
                setActive(section);
              }}
            >
              {section}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-2xl border-b border-white/5"
          >
            <ul className="flex flex-col items-center py-8 gap-6 text-white text-lg uppercase tracking-widest">
              {sections.map((section) => (
                <li
                  key={section}
                  onClick={() => {
                    document
                      .getElementById(section.toLowerCase())
                      .scrollIntoView({ behavior: "smooth" });
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer hover:text-gray-400 ${
                    active === section ? "text-white" : "text-gray-500"
                  }`}
                >
                  {section}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
