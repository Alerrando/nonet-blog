import "dayjs/locale/pt-br";

import { QueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { CiExport } from "react-icons/ci";
import { FaYinYang } from "react-icons/fa";
import { Outlet } from "react-router-dom";

import { AddArticle } from "@/components/AddArticleButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { useImportExport } from "@/hooks/useImportExport";
import { useBlog } from "@/provider/BlogProvider";
import { useHistoryProvider } from "@/provider/HistoryArticleProvider";

dayjs.locale("pt-br");
dayjs.extend(weekday);
dayjs.extend(localeData);

export function PublicRouter() {
  const { articles, currentArticle, setCurrentArticle, zenMode, setZenMode } = useBlog();
  const { selectedHistory } = useHistoryProvider();
  const { importArticle } = useImportExport();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const localQueryClient = new QueryClient();
  const isMobile = useIsMobile();
  useHotkeys("z", () => setZenMode(!zenMode));

  useEffect(() => {
    if (articles.length === 0) localQueryClient.refetchQueries({ queryKey: ["get-all-articles"] });
    if (selectedHistory.length > 0) setCurrentArticle(null);
  }, []);

  return (
    <>
      <Header />
      <main
        className={`min-h-screen transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-white
          ${zenMode ? "pt-4 sm:pt-6 zen-mode" : "pt-16 sm:pt-20 md:pt-24"} px-2 sm:px-4 md:px-6`}
      >
        <Outlet />

        {!zenMode ? (
          <AddArticle
            icon={CiExport}
            onClick={() => handleClickImport()}
            className={`bg-violet-600 text-white ${!currentArticle?.id && "right-20 sm:right-28"} ${
              isMobile ? "h-10 w-10" : ""
            }`}
          />
        ) : (
          <AddArticle
            icon={FaYinYang}
            onClick={() => setZenMode(false)}
            className={`bg-transparent text-white left-4 h-10 w-10 md:p-2 border-transparent`}
            classNameIcon="h-8 w-8"
          />
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/json"
          className="hidden"
        />
      </main>

      {!zenMode && <Footer />}
    </>
  );

  function handleClickImport() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      importArticle(file)
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
