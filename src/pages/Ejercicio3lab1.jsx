import React, { useState, useRef, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import useSound from "use-sound";

function MusicalNote({ position, texture, soundPlay, velocity }) {
  const meshRef = useRef();
  const [life, setLife] = useState(1);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y += velocity.y;
      meshRef.current.position.x += velocity.x;
      meshRef.current.position.z += velocity.z;

      meshRef.current.material.opacity -= 0.02;
      setLife((prev) => prev - 0.02);

      meshRef.current.rotation.z += 0.05;
    }
  });

  if (life <= 0) return null;

  return (
    <mesh ref={meshRef} position={position} scale={0.3}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={life} toneMapped={false} />
    </mesh>
  );
}

function Objeto3DMultiTexturas({ onClickObject }) {
  const mapTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const alphaTexture = useLoader(TextureLoader, "/assets/alpha.png");
  const emissiveTexture = useLoader(TextureLoader, "/assets/texture2.jpg");

  return (
    <mesh position={[0, 1.5, 0]} castShadow onClick={onClickObject}>
      <icosahedronGeometry args={[1.5, 4]} />
      <meshStandardMaterial
        map={mapTexture}
        alphaMap={alphaTexture}
        transparent
        emissiveMap={emissiveTexture}
        emissive="#ffff00"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

const Ejercicio3lab1 = () => {
  const noteTextureRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const noteCountRef = useRef(0);

  const noteTexture1 = useLoader(TextureLoader, "/assets/note1.png");
  const noteTexture2 = useLoader(TextureLoader, "/assets/note2.png");
  const noteTexture3 = useLoader(TextureLoader, "/assets/note3.png");

  const noteTextures = [noteTexture1, noteTexture2, noteTexture3];

  const [playSound1] = useSound("/assets/ambiente.mp3", { volume: 0.3 });
  const [playSound2] = useSound("/assets/chair-move.mp3", { volume: 0.3 });

  const handleObjectClick = () => {
    const randomTexture = noteTextures[Math.floor(Math.random() * noteTextures.length)];
    const randomSound = Math.random() > 0.5 ? playSound1 : playSound2;

    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5;
      const velocity = {
        x: Math.cos(angle) * 0.08,
        y: 0.1 + Math.random() * 0.05,
        z: Math.sin(angle) * 0.08,
      };

      const newNote = {
        id: noteCountRef.current++,
        position: [0, 1.5, 0],
        texture: randomTexture,
        velocity,
      };

      setNotes((prev) => [...prev, newNote]);

      setTimeout(() => {
        setNotes((prev) => prev.filter((note) => note.id !== newNote.id));
      }, 3000);
    }

    randomSound();
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />

        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 3, 0]} intensity={1} color="#ffff00" />

        <color attach="background" args={["#0a0a1a"]} />

        <group>
          <Objeto3DMultiTexturas onClickObject={handleObjectClick} />

          {notes.map((note) => (
            <MusicalNote
              key={note.id}
              position={note.position}
              texture={note.texture}
              velocity={note.velocity}
            />
          ))}
        </group>

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        <OrbitControls />
      </Canvas>

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
          maxWidth: "350px",
        }}
      >
        <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#ffff00" }}>
          Ejercicio 3 - Texturas y Notas Musicales
        </h3>
        <hr style={{ margin: "12px 0", borderColor: "rgba(255, 255, 255, 0.3)" }} />
        <p style={{ margin: "0", fontSize: "12px", color: "#aaa" }}>
          {notes.length} notas activas
        </p>
      </div>
    </div>
  );
};

export default Ejercicio3lab1;
