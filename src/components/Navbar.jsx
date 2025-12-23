import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
      className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-white font-bold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Suleman.dev
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-white/80 font-medium">
          {sections.map((section) => (
            <li
              key={section}
              className={`cursor-pointer hover:text-blue-400 transition-colors relative ${
                active === section ? "text-blue-400" : ""
              }`}
              onClick={() => {
                document
                  .getElementById(section.toLowerCase())
                  .scrollIntoView({ behavior: "smooth" });
                setActive(section);
              }}
            >
              {section}
              {active === section && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400"
                />
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl overflow-hidden"
          >
            <ul className="flex flex-col items-center py-6 gap-6 text-white text-lg">
              {sections.map((section) => (
                <li
                  key={section}
                  onClick={() => {
                    document
                      .getElementById(section.toLowerCase())
                      .scrollIntoView({ behavior: "smooth" });
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer hover:text-blue-400 ${
                    active === section ? "text-blue-400 font-bold" : ""
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
