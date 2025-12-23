import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// --- 1. Interactive Particle Wave (Digital Ocean) ---
const ParticleWave = () => {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const { camera } = useThree();

  // Track Mouse Position for 3D interaction
  useThree(({ pointer }) => {
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;
  });

  // Generate 15,000 Particles
  const particles = useMemo(() => {
    const count = 15000;
    const positions = new Float32Array(count * 3);
    const originalY = new Float32Array(count); // To store base height

    // Create a flat grid of particles
    const separation = 0.15; // Distance between dots
    const width = 100; // Grid size

    let i = 0;
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < width; z++) {
        if (i < count) {
          positions[i * 3] = x * separation - (width * separation) / 2; // X position
          positions[i * 3 + 1] = 0; // Y position (height)
          positions[i * 3 + 2] = z * separation - (width * separation) / 2; // Z position

          originalY[i] = 0;
          i++;
        }
      }
    }
    return { positions, originalY, count };
  }, []);

  useFrame((state) => {
    const { clock, pointer } = state;
    const time = clock.getElapsedTime();

    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      const { originalY, count } = particles;

      // Mouse interaction raycasting logic simplified for speed
      // We project mouse to world roughly
      const mouseX = pointer.x * 40; // Scale to grid size roughly
      const mouseY = pointer.y * 20;

      for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];

        // 1. Base Wave Animation (Ocean effect)
        // Using Sin/Cos waves to create organic movement
        const waveHeight =
          Math.sin(x * 0.2 + time) * 1.5 +
          Math.cos(z * 0.15 + time) * 1.5 +
          Math.sin((x + z) * 0.1 + time * 1.5) * 1;

        // 2. Mouse Interaction (Ripple/Hill effect)
        // Calculate distance from particle to mouse (simplified 2D distance)
        // We map mouse pointer.x/y to the grid x/z coordinates roughly
        const mouseTargetX = pointer.x * 30;
        const mouseTargetZ = -pointer.y * 30; // Invert Z

        const dist = Math.sqrt(
          Math.pow(x - mouseTargetX, 2) + Math.pow(z - mouseTargetZ, 2)
        );

        let mouseEffect = 0;

        // If mouse is close to particle, push it up
        if (dist < 8) {
          mouseEffect = (8 - dist) * 1.5; // Height of the hill
        }

        // Apply new Y position
        positions[i * 3 + 1] = waveHeight + mouseEffect;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffffff" // Pure White
        sizeAttenuation={true}
        transparent
        opacity={0.8}
      />
    </points>
  );
};

// --- 2. Scene Setup ---
const HeroCanvas = () => (
  <Canvas
    camera={{ position: [0, 10, 15], fov: 60 }} // Camera looking down
    dpr={[1, 2]}
  >
    <color attach="background" args={["#000000"]} /> {/* Black Background */}
    <ParticleWave />
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={true} // Camera slowly rotates around the wave
      autoRotateSpeed={0.5}
    />
  </Canvas>
);

// --- 3. Hero Component ---
const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Dark Gradient Overlay to ensure text pops against the dots */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
        <motion.div className="pointer-events-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h1 className="text-6xl md:text-9xl font-black text-white mb-6 leading-none tracking-tighter">
              SULEMAN
            </h1>
            <h2 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600 mb-8 leading-none">
              AHMED
            </h2>

            <p className="text-gray-300 text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-light">
              Interactive 3D Developer & MERN Stack Architect.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("projects")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 border border-white text-white font-bold rounded-none hover:transition-all"
              >
                VIEW PROJECTS
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 border border-white text-white font-bold rounded-none hover:transition-all"
              >
                CONTACT ME
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20">
        <span className="text-white/20 text-[10px] uppercase tracking-[0.5em]">
          Move Mouse to Interact
        </span>
      </div>
    </section>
  );
};

export default Hero;
