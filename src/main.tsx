import "./index.css";

import { createRoot } from "react-dom/client";

import { RootRoutes } from "./pages/routes.tsx";

createRoot(document.getElementById("root")!).render(<RootRoutes />);
