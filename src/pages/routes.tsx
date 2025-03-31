import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { TanstackProvider } from "@/provider/TansTackProvider";

import { Article } from "./Article";
import Index from "./Index";
import NotFound from "./NotFound";
import { PublicRouter } from "./PublicRouter";

export function RootRoutes() {
  return (
    <TanstackProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRouter />}>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/article/:title" element={<Article />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TanstackProvider>
  );
}
