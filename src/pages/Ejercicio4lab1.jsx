import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function GrupoRotacion({ isClicked, onGroupClick }) {
  const groupRef = useRef();
  const [color, setColor] = useState("#3498db");

  const colores = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
  const colorIndex = useRef(0);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.005;
      groupRef.current.rotation.y += 0.01;
    }
  });

  const handleGroupClick = () => {
    colorIndex.current = (colorIndex.current + 1) % colores.length;
    setColor(colores[colorIndex.current]);
    onGroupClick();
  };

  return (
    <group ref={groupRef} onClick={handleGroupClick}>
      <mesh position={[-1.5, 0, 0]} castShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>

      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>

      <mesh position={[1.5, 0, 0]} castShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

function GrupoOrbita({ onGroupClick }) {
  const groupRef = useRef();
  const [color, setColor] = useState("#e74c3c");

  const colores = ["#e74c3c", "#1abc9c", "#f1c40f", "#34495e", "#c0392b"];
  const colorIndex = useRef(0);
  const orbitCenter = useRef({ x: 0, y: 0, z: 0 });

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.position.x = Math.cos(time * 0.5) * 3;
      groupRef.current.position.z = Math.sin(time * 0.5) * 3;

      groupRef.current.rotation.x += 0.01;
      groupRef.current.rotation.z += 0.015;
    }
  });

  const handleGroupClick = () => {
    colorIndex.current = (colorIndex.current + 1) % colores.length;
    setColor(colores[colorIndex.current]);
    onGroupClick();
  };

  return (
    <group ref={groupRef} onClick={handleGroupClick} position={[0, 0, 0]}>
      <mesh position={[-0.8, -0.8, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>

      <mesh position={[0.8, -0.8, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

const Ejercicio4lab1 = () => {
  const [grupo1Clicks, setGrupo1Clicks] = useState(0);
  const [grupo2Clicks, setGrupo2Clicks] = useState(0);

  const handleGrupo1Click = () => {
    setGrupo1Clicks((prev) => prev + 1);
  };

  const handleGrupo2Click = () => {
    setGrupo2Clicks((prev) => prev + 1);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[6, 4, 8]} fov={50} />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[15, 15, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 5, 0]} intensity={0.5} color="#ffaa00" />

        <color attach="background" args={["#0f0f23"]} />

        <group position={[-4, 2, 0]}>
          <GrupoRotacion onGroupClick={handleGrupo1Click} />
        </group>

        <group position={[4, 2, 0]}>
          <GrupoOrbita onGroupClick={handleGrupo2Click} />
        </group>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        <OrbitControls />
      </Canvas>

      {/* Panel de información - Grupo 1 */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          backgroundColor: "rgba(52, 152, 219, 0.85)",
          padding: "15px",
          borderRadius: "8px",
          fontFamily: "Arial, sans-serif",
          fontSize: "13px",
          zIndex: 10,
          maxWidth: "280px",
        }}
      >
        <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
          Grupo 1 - Rotacion
        </h4>
        <p style={{ margin: "0 0 6px 0" }}>
          <strong>Clics:</strong> {grupo1Clicks}
        </p>
      </div>

      {/* Panel de información - Grupo 2 */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
          backgroundColor: "rgba(231, 76, 60, 0.85)",
          padding: "15px",
          borderRadius: "8px",
          fontFamily: "Arial, sans-serif",
          fontSize: "13px",
          zIndex: 10,
          maxWidth: "280px",
        }}
      >
        <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
          Grupo 2 - Orbita
        </h4>
        <p style={{ margin: "0 0 6px 0" }}>
          <strong>Clics:</strong> {grupo2Clicks}
        </p>
      </div>
    </div>
  );
};

export default Ejercicio4lab1;
