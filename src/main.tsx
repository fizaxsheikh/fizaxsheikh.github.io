import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Desktop } from "./screens/desktop";
import { WebsitesPage } from "./screens/websites/WebsitesPage";

const redirectedPath = sessionStorage.getItem("redirect");
if (redirectedPath) {
  sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", redirectedPath);
}

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/websites" element={<WebsitesPage />} />
        <Route path="*" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
