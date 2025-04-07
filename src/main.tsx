import "./index.css";

import { createRoot } from "react-dom/client";

import { RootRoutes } from "./pages/routes.tsx";
import { ThemeProvider } from "./provider/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RootRoutes />
  </ThemeProvider>,
);
