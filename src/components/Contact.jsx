import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Send } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-6 py-12 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">
          Let's <span className="text-blue-400">Connect</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl">
              <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">
                  sulemanahmedcs36@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl">
              <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-medium">0332-3350954</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl">
              <div className="p-3 bg-blue-600/20 rounded-lg text-blue-500">
                <Linkedin size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/suleman-ahmed-8169a6267"
                  className="text-white font-medium hover:text-blue-400 transition-colors"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="group">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="group">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="group">
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
