import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrandSite } from "./brand/BrandSite";
import "./brand/brand.css";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrandSite />
  </StrictMode>,
);
