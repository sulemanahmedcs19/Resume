import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

const Sphere = () => {
  const ref = useRef();

  // Rotate & floating animation
  useFrame(({ clock, mouse }) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.rotation.x = mouse.y * 0.5;
      ref.current.rotation.z = mouse.x * 0.5;
      ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial color="hotpink" roughness={0.5} metalness={0.7} />
    </mesh>
  );
};

const HeroCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <Sphere />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default HeroCanvas;
