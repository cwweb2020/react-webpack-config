import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Crear una raíz
root.render(<App />);
