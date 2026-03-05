import React, { useRef, useState } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function HDRISkybox({ hdri }) {
  const meshRef = useRef();
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 64, 32]} />
      <meshBasicMaterial
        map={hdri}
        side={THREE.BackSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function RotationController() {
  const groupRef = useRef();
  const { camera, raycaster, mouse } = useThree();
  
  return (
    <group ref={groupRef}>
    </group>
  );
}

const Ejercicio5lab1 = () => {
  const hdri = useLoader(
    RGBELoader,
    "/assets/rogland_clear_night_4k.hdr"
  );

  hdri.mapping = THREE.EquirectangularReflectionMapping;

  const [showInfo, setShowInfo] = useState(true);
  const canvasRef = useRef();

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas ref={canvasRef}>
        <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={75} />

        <HDRISkybox hdri={hdri} />

        <primitive
          attach="environment"
          object={hdri}
        />

        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          enableZoom={true}
          enablePan={true}
          autoRotate={true}
          autoRotateSpeed={2}
        />
      </Canvas>

      {/* Panel de información */}
      {showInfo && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            padding: "20px",
            borderRadius: "8px",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            zIndex: 10,
            maxWidth: "400px",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#4fc3f7" }}>
            Ejercicio 5 - HDRI (360°)
          </h3>
        </div>
      )}

      {/* Botón para cerrar/abrir info */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "rgba(79, 195, 247, 0.9)",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "4px",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
          cursor: "pointer",
          zIndex: 10,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(79, 195, 247, 1)")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(79, 195, 247, 0.9)")}
      >
        {showInfo ? "Ocultar info" : "Mostrar info"}
      </button>
    </div>
  );
};

export default Ejercicio5lab1;
