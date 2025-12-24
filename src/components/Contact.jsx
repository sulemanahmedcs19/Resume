import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser"; // 1. Import karein

const Contact = () => {
  const formRef = useRef(null);
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);

  // Spotlight Effect
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 2. Email Send Function
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // Yaha apne EmailJS ke keys daalein:
    const serviceID = "service_l1fx7wd"; // Service ID yahan paste karein
    const templateID = "template_up4ar2q"; // Template ID yahan paste karein
    const publicKey = "0qcrSgxEJ5PwLqw6I"; // Public Key yahan paste karein

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey).then(
      (result) => {
        console.log(result.text);
        alert("Message Sent Successfully! ✅");
        setLoading(false);
        formRef.current.reset(); // Form clear karega
      },
      (error) => {
        console.log(error.text);
        alert("Something went wrong, please try again. ❌");
        setLoading(false);
      }
    );
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-20 relative overflow-hidden"
    >
      {/* --- ANIMATED BACKGROUND ORBS --- */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 right-1/5 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, 100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/3 left-1/5 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-4xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
            LET'S <span className="text-gray-800">TALK</span>
          </h2>
          <p className="text-gray-400 text-lg font-light max-w-lg mx-auto">
            Have a project in mind? Let's build something extraordinary
            together.
          </p>
        </motion.div>

        {/* --- GLASS CARD (Form + Info) --- */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseMove={handleMouseMove}
          className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-2xl overflow-hidden shadow-2xl"
        >
          {/* Spotlight Gradient */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`,
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row gap-12">
            {/* --- LEFT: FORM (Ye wala hissa change kiya ha) --- */}
            <div className="flex-1">
              {/* ref={formRef} aur onSubmit={sendEmail} add kiya */}
              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="flex flex-col gap-8"
              >
                <div className="group relative">
                  <input
                    type="text"
                    name="from_name" // EmailJS ka variable name
                    placeholder=" "
                    required
                    className="w-full bg-transparent border-b border-white/10 text-white py-4 focus:outline-none focus:border-white transition-colors placeholder-transparent peer"
                  />
                  <label className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-gray-400">
                    Your Name
                  </label>
                </div>

                <div className="group relative">
                  <input
                    type="email"
                    name="reply_to" // EmailJS ka variable name
                    placeholder=" "
                    required
                    className="w-full bg-transparent border-b border-white/10 text-white py-4 focus:outline-none focus:border-white transition-colors placeholder-transparent peer"
                  />
                  <label className="absolute left-0 top-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-gray-400">
                    Your Email
                  </label>
                </div>

                <div className="group relative">
                  <textarea
                    name="message" // EmailJS ka variable name
                    rows="4"
                    placeholder=" "
                    required
                    className="w-full bg-transparent border-b border-white/10 text-white py-4 focus:outline-none focus:border-white transition-colors placeholder-transparent peer resize-none"
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
                  disabled={loading} // Jab bhej raha ho to button disable
                  className={`mt-4 w-full py-4 border border-white text-white font-bold tracking-widest uppercase transition-all duration-300 ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  {loading ? "SENDING..." : "SEND MESSAGE"}
                </motion.button>
              </form>
            </div>

            {/* --- RIGHT: CONTACT INFO --- */}
            <div className="flex-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-12 md:pt-0 md:pl-12">
              <h3 className="text-white font-bold text-xl mb-8 tracking-wider">
                CONTACT INFO
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:sulemanahmedcs36@gmail.com"
                    className="text-white hover:text-gray-300 transition-colors text-lg"
                  >
                    sulemanahmedcs36@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                    Phone
                  </p>
                  <p className="text-white text-lg">0332-3350954</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
