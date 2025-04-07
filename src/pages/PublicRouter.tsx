import "dayjs/locale/pt-br";

import { QueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { useEffect, useRef } from "react";
import { CiExport } from "react-icons/ci";
import { Outlet } from "react-router-dom";

import { AddArticle } from "@/components/AddArticleButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useImportExport } from "@/hooks/useImportExport";
import { useBlog } from "@/provider/BlogProvider";

dayjs.locale("pt-br");
dayjs.extend(weekday);
dayjs.extend(localeData);

export function PublicRouter() {
  const { articles, currentArticle } = useBlog();
  const { importArticle } = useImportExport();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = new QueryClient();

  useEffect(() => {
    if (articles.length === 0) queryClient.refetchQueries(["get-all-articles"]);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 px-6 dark:bg-gray-900 dark:text-white">
        <Outlet />

        <AddArticle
          icon={CiExport}
          onClick={() => handleClickImport()}
          className={`bg-violet-600 text-white ${!currentArticle?.id && "right-28"}`}
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/json"
          className="hidden"
        />
      </main>
      <Footer />
    </>
  );

  function handleClickImport() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      importArticle(files[0])
        .then(() => {
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        })
        .catch((error) => {
          console.error("Erro na importação:", error);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        });
    }
  }
}
