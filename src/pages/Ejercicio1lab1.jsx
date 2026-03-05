import React, { useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function Objeto3D({ textureIndex }) {
  const texture1 = useLoader(TextureLoader, "/assets/texture1.jpg");
  const texture2 = useLoader(TextureLoader, "/assets/texture2.jpg");
  const currentTexture = textureIndex === 0 ? texture1 : texture2;

  return (
    <mesh position={[0, 1, 0]} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={currentTexture} />
    </mesh>
  );
}

const Ejercicio1lab1 = () => {
  const [textureIndex, setTextureIndex] = useState(0);

  const handleTextureChange = () => {
    setTextureIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <color attach="background" args={["#1a1a2e"]} />
        <group onClick={handleTextureChange}>
          <Objeto3D textureIndex={textureIndex} />
        </group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#2d2d44" />
        </mesh>
        <OrbitControls />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          zIndex: 10,
          maxWidth: "300px",
        }}
      >
        <h3 style={{ margin: "0 0 12px 0", fontSize: "16px" }}>
          Ejercicio 1 - Objeto 3D con Texturas
        </h3>
        <hr style={{ margin: "12px 0", borderColor: "rgba(255, 255, 255, 0.3)" }} />
        <p style={{ margin: "0", fontSize: "12px", color: "#aaa" }}>
          Textura actual: {textureIndex === 0 ? "Textura 1" : "Textura 2"}
        </p>
      </div>
    </div>
  );
};

export default Ejercicio1lab1;
