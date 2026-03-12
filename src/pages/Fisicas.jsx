import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";

const Fisicas = () => {
  return (
    <Canvas
      className="position-absolute w-100 h-100"
      style={{ position: "fixed", width: "100vw", height: "100vh" }}
    >
      <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={40} />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 20, 5]} intensity={1.2} />
      <Environment preset="city" />
      
      {/* Placeholder para física */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      
      <OrbitControls enableRotate={true} />
    </Canvas>
  );
};

export default Fisicas;
