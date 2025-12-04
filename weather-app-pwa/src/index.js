import React from "react";
import { createReact, createRoot } from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import App from "./App";

/**
 * Root element
 */
const root = createRoot(document.getElementById("root"));

/**
 * Render application
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Unregister service worker
 */
serviceWorkerRegistration.register();
