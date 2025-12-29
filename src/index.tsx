import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Desktop } from "./screens/desktop";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Desktop />
  </StrictMode>,
);
