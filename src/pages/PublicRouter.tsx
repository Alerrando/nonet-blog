import "dayjs/locale/pt-br";

import { QueryClient } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useBlog } from "@/provider/BlogProvider";

dayjs.locale("pt-br");
dayjs.extend(weekday);
dayjs.extend(localeData);

export function PublicRouter() {
  const { articles } = useBlog();
  const queryClient = new QueryClient();

  useEffect(() => {
    if (articles.length === 0) queryClient.refetchQueries(["get-all-articles"]);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 px-6">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
