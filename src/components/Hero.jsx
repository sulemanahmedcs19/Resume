import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Float,
  MeshDistortMaterial,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Particle System Component
const Particles = ({ count = 200 }) => {
  const mesh = useRef();
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.05;
      mesh.current.rotation.x = t * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#4cc9f0" transparent opacity={0.8} />
    </points>
  );
};

// Main 3D Object with Vector Animation
const HeroObject = () => {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame(({ mouse, clock }) => {
    if (groupRef.current) {
      // Vector based rotation damping for smooth feel
      const targetX = mouse.y * 0.5;
      const targetY = mouse.x * 0.5;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Inner Sphere */}
        <mesh ref={meshRef} scale={1.2}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.3} // Strength of distortion
            speed={2} // Speed of distortion
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Outer Wireframe Icosahedron */}
        <mesh scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#ff2d95"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
};

const HeroCanvas = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <pointLight position={[-10, -10, -5]} color="#4cc9f0" intensity={1} />
    <Stars
      radius={100}
      depth={50}
      count={1000}
      factor={4}
      saturation={0}
      fade
    />
    <Particles />
    <HeroObject />
    <OrbitControls enableZoom={false} enablePan={false} />
  </Canvas>
);

const Hero = () => {
  return (
    <div id="home" className="relative h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
        <motion.div className="pointer-events-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-lg"
          >
            Hi, I’m Suleman Ahmed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl mt-6 max-w-2xl leading-relaxed"
          >
            Full Stack MERN Developer | React, Tailwind CSS, Three.js <br />
            Building immersive web experiences with 3D interactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 flex gap-4 justify-center"
          >
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(79,70,229,0.5)]"
            >
              View Projects
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 border border-white/20 rounded-full text-white font-bold hover:bg-white/10 backdrop-blur-md transition-all"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
