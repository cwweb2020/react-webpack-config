import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Crear una raíz
root.render(<App />);

// Registro del Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((registration) => {
      console.log("Service Worker registrado con éxito:", registration);
    })
    .catch((error) => {
      console.log("Error al registrar el Service Worker:", error);
    });
}
