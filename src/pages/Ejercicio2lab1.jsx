import React, { useRef, useEffect, useState } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { VideoTexture } from "three";
import useSound from "use-sound";

function LivingRoomModel({ onSpeakerClick }) {
  const gltf = useLoader(GLTFLoader, "/assets/LivingRoom.glb");
  const videoRef = useRef(document.createElement("video"));
  const modelRef = useRef();
  const speakersRef = useRef(null);

  useEffect(() => {
    if (!gltf.scene) return;

    videoRef.current.src = "/assets/video.mp4";
    videoRef.current.crossOrigin = "anonymous";
    videoRef.current.loop = true;
    videoRef.current.muted = false;
    videoRef.current.volume = 0.5;
    videoRef.current.play().catch(err => console.log("Video autoplay:", err));

    const videoTexture = new VideoTexture(videoRef.current);
    videoTexture.flipY = true;

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "mesh1755818725_2") {
          child.material = child.material.clone();
          child.material.map = videoTexture;
          child.material.emissiveMap = videoTexture;
          child.material.emissive.setHex(0x555555);
          child.userData.isTV = true;
        }
        
        if (child.name.includes("group908259242") || child.parent?.name.includes("group908259242")) {
          child.userData.isSpeaker = true;
          speakersRef.current = child;
        }
      }
    });

    modelRef.current = gltf.scene;
  }, [gltf]);

  const handlePointerClick = (e) => {
    e.stopPropagation();
    
    let isSpeaker = false;
    let obj = e.object;
    
    while (obj) {
      if (obj.userData?.isSpeaker) {
        isSpeaker = true;
        break;
      }
      obj = obj.parent;
    }
    
    if (isSpeaker) {
      onSpeakerClick();
    }
  };

  return (
    <group onClick={handlePointerClick}>
      <primitive object={gltf.scene} />
    </group>
  );
}

const Ejercicio2lab1 = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const [play, { stop }] = useSound("/assets/ambiente.mp3", {
    volume: 0.7,
    onend: () => setAudioPlaying(false)
  });

  const handleSpeakerClick = () => {
    if (audioPlaying) {
      stop();
      setAudioPlaying(false);
    } else {
      play();
      setAudioPlaying(true);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 3, 8]} fov={50} />

        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 3, 0]} intensity={0.5} />

        <color attach="background" args={["#1a1a2e"]} />

        <LivingRoomModel onSpeakerClick={handleSpeakerClick} />

        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>

      {/* Panel de información */}
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
        <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#00bcd4" }}>
           Ejercicio 2 - Living Room Interactivo
        </h3>
        <hr style={{ margin: "12px 0", borderColor: "rgba(255, 255, 255, 0.3)" }} />
        <p style={{ 
          margin: "0", 
          fontSize: "13px", 
          color: audioPlaying ? "#4caf50" : "#ff9800",
          fontWeight: "bold"
        }}>
          {audioPlaying ? "Reproduciendo..." : "Detenido"}
        </p>
      </div>
    </div>
  );
};

export default Ejercicio2lab1;
