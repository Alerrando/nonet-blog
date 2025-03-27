import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RootRoutes } from './pages/routes.tsx';

createRoot(document.getElementById("root")!).render(<RootRoutes />);
