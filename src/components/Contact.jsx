import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-20 relative"
    >
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
          LET'S <span className="text-gray-600">TALK</span>
        </h2>
        <p className="text-gray-500 mb-16 max-w-xl mx-auto font-light">
          Have a project in mind? Let's build something extraordinary together.
        </p>

        <form className="max-w-lg mx-auto flex flex-col gap-8">
          <div className="group relative">
            <input
              type="text"
              placeholder=" "
              className="w-full bg-transparent border-b border-white/20 text-white py-4 focus:outline-none focus:border-white transition-colors placeholder-transparent peer"
            />
            <label className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-gray-400">
              Your Name
            </label>
          </div>

          <div className="group relative">
            <input
              type="email"
              placeholder=" "
              className="w-full bg-transparent border-b border-white/20 text-white py-4 focus:outline-none focus:border-white transition-colors placeholder-transparent peer"
            />
            <label className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-gray-400">
              Your Email
            </label>
          </div>

          <div className="group relative">
            <textarea
              rows="4"
              placeholder=" "
              className="w-full bg-transparent border-b border-white/20 text-white py-4 focus:outline-none focus:border-white transition-colors placeholder-transparent peer"
            ></textarea>
            <label className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-gray-400">
              Your Message
            </label>
          </div>

          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "white",
              color: "black",
            }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-8 w-full py-4 border border-white text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            Send Message
          </motion.button>
        </form>

        <div className="mt-20 text-gray-600 text-sm">
          <p>sulemanahmedcs36@gmail.com</p>
          <p>0332-3350954</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
