import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef } from "react";

// --- 1. Sci-Fi Energy Core (The Unique Object) ---
const TechCore = () => {
  const groupRef = useRef();
  const outerRingRef = useRef();
  const innerRingRef = useRef();

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();

    // Gentle hover/float
    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.x * 0.2; // Mouse se thoda rotate hoga
      groupRef.current.rotation.x = mouse.y * 0.2;
    }

    // Rings animation
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.3;
      outerRingRef.current.rotation.y = t * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -t * 0.5; // Opposite direction
      innerRingRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      {" "}
      {/* Right side shift kiya */}
      {/* 1. Inner Morphing Core (Liquid Metal Effect) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh scale={1.8}>
          <icosahedronGeometry args={[1, 20]} />
          <MeshDistortMaterial
            color="#00ffff" // Cyan color
            attach="material"
            distort={0.5} // Distortion strength (Blob effect)
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
      {/* 2. Outer Wireframe Shell */}
      <mesh scale={[2.4, 2.4, 2.4]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#4f46e5"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* 3. Orbiting Rings */}
      <mesh ref={outerRingRef} scale={[3, 3, 3]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh
        ref={innerRingRef}
        scale={[3.5, 3.5, 3.5]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
};

const HeroCanvas = () => (
  <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
    {/* Dynamic Lights */}
    <ambientLight intensity={0.3} />
    <pointLight position={[5, 5, 5]} intensity={2} color="#00ffff" /> // Cyan
    Light
    <pointLight position={[-5, -5, 5]} intensity={2} color="#a855f7" /> //
    Purple Light
    <TechCore />
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={true}
      autoRotateSpeed={0.5}
    />
  </Canvas>
);

// --- 2. Hero UI Component ---
const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Overlay Gradient (Right side fade out for object visibility) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none" />

      {/* Content (Left Aligned) */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 pointer-events-none">
        <div className="md:w-1/2 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block py-1 px-3 mb-4 border border-cyan-500/30 rounded-full bg-cyan-900/10 text-cyan-400 text-xs font-bold tracking-widest uppercase">
              Interactive Developer
            </span>

            <h1 className="text-7xl md:text-9xl font-black text-white mb-6 leading-none tracking-tighter">
              SULEMAN
            </h1>

            <p className="text-gray-400 text-lg md:text-2xl mb-10 max-w-lg font-light">
              Building immersive web experiences with MERN Stack & 3D
              Interactions.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "white",
                  color: "black",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("projects")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3 border border-white text-white font-bold rounded-none hover:transition-all"
              >
                VIEW PROJECTS
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3 border border-white/30 text-white font-bold rounded-none hover:transition-all"
              >
                CONTACT ME
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
