import dayjs from "dayjs";
import { ArrowLeft, Calendar, ChartLine, Clock } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { CiEdit, CiExport } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";

import { AnalyticsDrawer } from "@/components/AnalyticsDrawer";
import { Editor } from "@/components/Editor/Editor";
import { HistoryContent } from "@/components/HistoryContent/HistoryContent";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { useImportExport } from "@/hooks/useImportExport";
import { useMutationPutArticle } from "@/hooks/useMutationPutArticle";
import { useQueryAllArticles } from "@/hooks/useQueryAllArticles";
import { ArticleModel } from "@/models/ArticleModel";
import { useBlog } from "@/provider/BlogProvider";
import { useHistoryProvider } from "@/provider/HistoryArticleProvider";

export function Article() {
  const { id } = useParams();
  const { getArticleByName, getArticleById, setCurrentArticle, currentArticle, articles, createNewVersion } = useBlog();
  const { toast } = useToast();
  const [edit, setEdit] = useState(false);
  const { exportArticle } = useImportExport();
  const { updateArticleAsync } = useMutationPutArticle();
  const { refetchGetAllArticles } = useQueryAllArticles();
  const { setSelectedHistory } = useHistoryProvider();
  const timeReadNow = new Date();

  useEffect(() => {
    if (!id) return;
    const aux = getArticleById(id);
    setCurrentArticle(aux);
  }, [id, articles]);

  useEffect(() => {
    (async () => {
      if (!currentArticle) return;
      const aux = { ...currentArticle };
      if (aux.statistics) {
        aux.statistics.countViews += 1;
      } else {
        aux.statistics = { countViews: 1, timeRead: 0 };
      }
      await updateArticleAsync(aux);
      refetchGetAllArticles();
    })();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleSaveTime);
    return () => window.removeEventListener("beforeunload", handleSaveTime);
  }, []);

  if (!currentArticle) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-medium mb-4">Article not found</h2>
        <p className="text-muted-foreground dark:text-white/70 mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/">
          <Button className="dark:text-white/80 dark:hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="pl-0 hover:bg-transparent dark:text-white/80 dark:hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
      </div>

      <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
        <img src={currentArticle.image} alt={currentArticle.title} className="w-full h-full object-cover" />
      </div>

      <div className="mb-8">
        <div className="w-full flex items-start justify-between relative">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium relative">{currentArticle.title}</h1>
            <span className="text-sm md:text-base">{currentArticle.summary}</span>
          </div>

          {!edit && (
            <div className="flex items-center gap-4 absolute right-0">
              <div
                className="flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer rounded-md p-2"
                onClick={() => setEdit(true)}
              >
                <CiEdit size={24} />
              </div>

              <Drawer>
                <DrawerTrigger asChild>
                  <div className="flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer rounded-md p-2">
                    <ChartLine size={24} />
                  </div>
                </DrawerTrigger>
                <AnalyticsDrawer formatDuration={formatDuration} />
              </Drawer>
              <div
                className="flex items-center justify-center p-2 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer rounded-md"
                onClick={() => exportArticle(currentArticle)}
              >
                <CiExport size={24} />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center text-muted-foreground">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{dayjs(currentArticle?.lastUpdate).format("DD/MM/YYYY")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">
              Lido a {formatDuration(dayjs(new Date()).diff(dayjs(currentArticle?.statistics?.lastAccess), "second"))}
            </span>
          </div>
        </div>
      </div>

      {currentArticle && (
        <Suspense fallback={<div>Carregando editor...</div>}>
          <Editor
            key={edit ? "edit-mode" : "view-mode"}
            isNewContent={false}
            saveAnnotation={handleSaveEditTask}
            edit={edit}
            setEdit={setEdit}
          />
        </Suspense>
      )}

      <HistoryContent />
    </div>
  );

  async function handleSaveEditTask(getHTML: string | undefined, id: string, handleButtonClick: boolean = false) {
    if (!getHTML) return;

    const currentContent = getHTML;
    const arrayCurrent = getHTML.split(/<(\/?\w+)>/).filter(Boolean);

    let auxAnnotationCurrent: ArticleModel = getArticleById(id);

    if (auxAnnotationCurrent.html !== currentContent) {
      const newHistory = createNewVersion(currentContent, null);

      auxAnnotationCurrent = {
        ...auxAnnotationCurrent,
        html: currentContent,
        lastUpdate: new Date(),
        history: [...(auxAnnotationCurrent?.history || []), newHistory],
      };

      setSelectedHistory(newHistory.id);
      await updateArticleAsync(auxAnnotationCurrent);
      refetchGetAllArticles();

      if (handleButtonClick) {
        toast({
          variant: "default",
          title: "Artigo atualizado com sucesso!",
          className: "bg-green-600 text-white",
        });
      }
    }
  }

  async function handleSaveTime(e?: BeforeUnloadEvent) {
    const timeDiff = dayjs(new Date()).diff(dayjs(timeReadNow), "second");
    const aux = { ...currentArticle };

    if (e) {
      e.preventDefault();
      aux.statistics = { ...aux.statistics, timeRead: aux.statistics.timeRead + timeDiff, lastAccess: new Date() };
    } else {
      aux.statistics = { ...aux.statistics, timeRead: aux.statistics.timeRead + timeDiff };
    }
    await updateArticleAsync(aux);
    refetchGetAllArticles();
  }

  function formatDuration(seconds: number): string {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const parts = [];

    if (days > 0) parts.push(`${days} dia${days > 1 ? "s" : ""}`);
    if (hours > 0) parts.push(`${hours} hora${hours > 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} minuto${minutes > 1 ? "s" : ""}`);
    if (remainingSeconds > 0) parts.push(`${remainingSeconds} segundo${remainingSeconds > 1 ? "s" : ""}`);

    return parts.length > 0 ? parts.join(" e ") : "menos de 1 segundo";
  }
}
