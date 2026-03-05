import React, { useState, useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

// Componente para cargar y mostrar el modelo con interactividad
function BarTableModel({ onMeshClick }) {
  const gltf = useLoader(GLTFLoader, "/assets/BarTable.glb");
  const groupRef = useRef();

  useEffect(() => {
    if (!gltf.scene) return;

    // Encontrar y hacer interactiva la malla específica
    gltf.scene.traverse((child) => {
      if (child.isMesh && (child.name === "group1698681086" || child.parent?.name === "group1698681086")) {
        child.userData.clickable = true;
      }
    });
  }, [gltf]);

  const handlePointerClick = (e) => {
    // Detener propagación para evitar conflictos con OrbitControls
    e.stopPropagation();
    
    // Verificar si el objeto clicado es interactivo
    if (e.object.userData.clickable || e.object.parent?.userData.clickable) {
      onMeshClick();
    }
  };

  return (
    <group ref={groupRef} onClick={handlePointerClick}>
      <primitive object={gltf.scene} />
    </group>
  );
}

const Laboratorio = () => {
  const [lightActive, setLightActive] = useState(false);

  // Activar/desactivar la luz adicional
  const handleMeshClick = () => {
    setLightActive(!lightActive);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
        
        {/* Luz tenue inicial - Luz ambiente */}
        <ambientLight intensity={0.2} />
        
        {/* Luz direccional principal - Tenue */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.5} 
          castShadow 
        />
        
        {/* Luz direccional secundaria - Tenue */}
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={0.15} 
        />
        
        {/* Segunda luz que se activa al hacer clic - Luz adicional fuerte */}
        {lightActive && (
          <>
            <directionalLight 
              position={[5, 15, 8]} 
              intensity={1.5} 
              castShadow 
            />
            <ambientLight intensity={0.6} />
          </>
        )}
        
        {/* Fondo */}
        <color attach="background" args={["#1a1a2e"]} />
        
        {/* Modelo con interactividad */}
        <BarTableModel onMeshClick={handleMeshClick} />
        
        {/* Plano base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1, -1,-1]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#2d2d44" />
        </mesh>
        
        {/* Controles de órbita para interactividad */}
        <OrbitControls />
      </Canvas>
      
      {/* Indicador de estado */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "15px",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        zIndex: 10
      }}>
        <p style={{ margin: "0 0 8px 0" }}>Haz clic en la malla del modelo</p>
        <p style={{ margin: "0" }}>Estado de luz: {lightActive ? "🔆 Activada" : "🌙 Tenue"}</p>
      </div>
    </div>
  );
};

export default Laboratorio;
