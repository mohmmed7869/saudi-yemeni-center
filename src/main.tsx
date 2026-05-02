import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./contexts/LanguageContext";
import App from "./App.tsx";
import "./index.css";
import { registerServiceWorker, requestPersistentStorage } from "@/lib/registerServiceWorker";

// Performance monitoring in development only
if (import.meta.env.DEV) {
  import("./components/PerformanceMonitor").then(({ PerformanceMonitor }) => {
    const monitor = document.createElement('div');
    document.body.appendChild(monitor);
    createRoot(monitor).render(<PerformanceMonitor />);
  });
}

// Preload critical resources
if (import.meta.env.PROD) {
  // Preload hero image
  const heroImg = new Image();
  heroImg.src = '/src/assets/hero-bg.jpg';
}

// Register service worker for offline functionality and caching
if (import.meta.env.PROD) {
  registerServiceWorker();
  requestPersistentStorage();
}

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
