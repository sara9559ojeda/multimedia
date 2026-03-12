// src/app/router.jsx
import React from "react";
import Inicio from "./pages/Inicio";
import Ejercicio1lab1 from "./pages/Ejercicio1lab1";
import Ejercicio2lab1 from "./pages/Ejercicio2lab1";
import Ejercicio3lab1 from "./pages/Ejercicio3lab1";
import Ejercicio4lab1 from "./pages/Ejercicio4lab1";
import Ejercicio5lab1 from "./pages/Ejercicio5lab1";
import Ejercicio2 from "./pages/Ejercicio2";
import Ejercicio3 from "./pages/Ejercicio3";
import Ejercicio4 from "./pages/Ejercicio4";
import Ejercicio5 from "./pages/Ejercicio5";
import Luces from "./pages/Luces";
import Laboratorio1 from "./pages/Laboratorio";
import Fisicas from "./pages/Fisicas";
import ThreeSceneSinLuces from "./components/ThreeSceneSinLuces";

const routes = [
  { path: "/", element: <Inicio />, index: true },
  // Laboratorio
  { path: "ejercicio1lab1", element: <Ejercicio1lab1 /> },
  { path: "ejercicio2lab1", element: <Ejercicio2lab1 /> },
  { path: "ejercicio3lab1", element: <Ejercicio3lab1 /> },
  { path: "ejercicio4lab1", element: <Ejercicio4lab1 /> },
  { path: "ejercicio5lab1", element: <Ejercicio5lab1 /> },
  { path: "laboratorio", element: <Laboratorio1 /> },
  // Practicas 1
  { path: "ejercicio2", element: <Ejercicio2 /> },
  { path: "ejercicio3", element: <Ejercicio3 /> },
  { path: "ejercicio4", element: <Ejercicio4 /> },
  { path: "ejercicio5", element: <Ejercicio5 /> },
  { path: "luces", element: <Luces /> },
  { path: "three-sin-luces", element: <ThreeSceneSinLuces /> },
  { path: "fisicas", element: <Fisicas /> },
];

export default routes;
