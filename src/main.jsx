import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CardDeck from "./CardDeck.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CardDeck />
  </StrictMode>
);
