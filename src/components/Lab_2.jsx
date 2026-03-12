import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Lab2 = () => {
  const particlesRef = useRef(null);
  const pointsRef = useRef(null);

  useEffect(() => {
    // Crear geometría de partículas
    const particlesCount = 2000;
    const positionArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 10; // x
      positionArray[i + 1] = (Math.random() - 0.5) * 10; // y
      positionArray[i + 2] = (Math.random() - 0.5) * 10; // z
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));

    // Crear material
    const material = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x00ffff,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    // Crear puntos
    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;

    if (particlesRef.current) {
      particlesRef.current.add(points);
    }

    return () => {
      geometry.dispose();
      material.dispose();
      if (particlesRef.current) {
        particlesRef.current.remove(points);
      }
    };
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0003;
      pointsRef.current.rotation.y += 0.0005;

      // Animación de las partículas
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.05; // x
        positions[i + 1] += (Math.random() - 0.5) * 0.05; // y
        positions[i + 2] += (Math.random() - 0.5) * 0.05; // z

        // Limitar a un rango específico
        if (Math.abs(positions[i]) > 10) positions[i] *= -1;
        if (Math.abs(positions[i + 1]) > 10) positions[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 10) positions[i + 2] *= -1;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <group ref={particlesRef} />;
};

export default Lab2;
