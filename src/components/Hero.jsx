import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// --- 1. Interactive Color Wave (Digital Ocean) ---
const ParticleWave = () => {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const { camera } = useThree();

  useThree(({ pointer }) => {
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;
  });

  const particles = useMemo(() => {
    const count = 12000;
    const positions = new Float32Array(count * 3);
    const originalY = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const separation = 0.15;
    const width = 100;

    let i = 0;
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < width; z++) {
        if (i < count) {
          positions[i * 3] = x * separation - (width * separation) / 2;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = z * separation - (width * separation) / 2;

          originalY[i] = 0;
          colors[i * 3] = 0.3;
          colors[i * 3 + 1] = 0.1;
          colors[i * 3 + 2] = 0.9;

          i++;
        }
      }
    }
    return { positions, originalY, count, colors };
  }, []);

  useFrame((state) => {
    const { clock, pointer } = state;
    const time = clock.getElapsedTime();

    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      const colors = meshRef.current.geometry.attributes.color.array;
      const { originalY, count } = particles;

      const mouseTargetX = pointer.x * 30;
      const mouseTargetZ = -pointer.y * 30;

      for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];

        const waveHeight =
          Math.sin(x * 0.2 + time) * 1.5 +
          Math.cos(z * 0.15 + time) * 1.5 +
          Math.sin((x + z) * 0.1 + time * 1.5) * 1;

        const dist = Math.sqrt(
          Math.pow(x - mouseTargetX, 2) + Math.pow(z - mouseTargetZ, 2)
        );

        let mouseEffect = 0;
        if (dist < 8) {
          mouseEffect = (8 - dist) * 2.0;
        }

        const finalHeight = waveHeight + mouseEffect;

        positions[i * 3 + 1] = finalHeight;

        const color = new THREE.Color();
        if (finalHeight > 2.5 || mouseEffect > 1) {
          color.set("#ffffff");
        } else if (finalHeight > 0.5) {
          color.set("#00ffff");
        } else if (finalHeight > -0.5) {
          color.set("#4f46e5");
        } else {
          color.set("#050510");
        }

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.attributes.color.needsUpdate = true;
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
        <bufferAttribute
          attach="attributes-color"
          count={particles.count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors={true}
        sizeAttenuation={true}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// --- 2. Scene Setup (Clean) ---
const HeroCanvas = () => (
  <Canvas
    camera={{ position: [0, 12, 20], fov: 50 }}
    dpr={[1, 2]}
    // Fog wala hissa hata diya ha
  >
    <color attach="background" args={["#000000"]} />

    <ParticleWave />

    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={true}
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

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
        <motion.div className="pointer-events-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-9xl font-black text-white mb-2 leading-none tracking-tighter mix-blend-overlay">
              SULEMAN
            </h1>

            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-600 mb-10 leading-none tracking-tighter">
              AHMED
            </h2>

            <p className="text-gray-300 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-light tracking-wide">
              Interactive 3D Developer & MERN Stack Architect.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "white",
                  color: "black",
                  boxShadow: "0 0 20px rgba(255,255,255,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("projects")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-10 py-4 border border-white text-white font-bold tracking-[0.2em] uppercase transition-all duration-300"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  borderColor: "#ffffff",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-10 py-4 border border-white/30 text-white font-bold tracking-[0.2em] uppercase transition-all duration-300"
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20">
        <span className="text-white/20 text-[10px] uppercase tracking-[0.5em]">
          Drag to Rotate • Hover to Glow
        </span>
      </div>
    </section>
  );
};

export default Hero;
