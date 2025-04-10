import dayjs from "dayjs";
import { Calendar, ChartLine, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

import { useBlog } from "@/provider/BlogProvider";

import { StatCard } from "./StatCard";
import { DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";

export function AnalyticsDrawer() {
  const { currentArticle } = useBlog();
  const [startTime] = useState(new Date()); // Armazena o momento em que o Drawer foi aberto
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDuration = dayjs(new Date()).diff(dayjs(startTime), "second");
      setDuration(newDuration);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <DrawerContent className="bg-zinc-900 border border-zinc-800 text-white">
      <DrawerHeader>
        <DrawerTitle>Analytics</DrawerTitle>
      </DrawerHeader>

      <div className="px-4 pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Data de criação */}
        <StatCard
          icon={<Calendar className="w-5 h-5 text-zinc-400" />}
          label="Criado em"
          value={dayjs(currentArticle.history[0].createdAt).format("DD/MM/YYYY")}
        />

        {/* Última edição */}
        <StatCard
          icon={<Calendar className="w-5 h-5 text-zinc-400" />}
          label="Última edição"
          value={dayjs(currentArticle.history[currentArticle.history.length - 1].createdAt).format("DD/MM/YYYY")}
        />

        {/* Número de edições */}
        <StatCard
          icon={<CiEdit size={20} className="text-zinc-400" />}
          label="Edições"
          value={`${currentArticle.history?.length || 0}`}
        />

        {/* Palavras */}
        <StatCard
          icon={<span className="text-zinc-400 text-lg font-bold">🔠</span>}
          label="Palavras"
          value={`${currentArticle.html?.split(/\s+/).length || 0}`}
        />

        {/* Tempo de leitura - AGORA ATUALIZÁVEL */}
        <StatCard
          icon={<Clock className="w-5 h-5 text-zinc-400" />}
          label="Tempo de leitura"
          value={formatDuration(duration)}
        />

        {/* Visualizações */}
        <StatCard
          icon={<ChartLine className="w-5 h-5 text-zinc-400" />}
          label="Visualizações"
          value={currentArticle?.statistics?.countViews || 0}
        />
      </div>
    </DrawerContent>
  );

  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const parts = [];

    if (minutes > 0) parts.push(`${minutes} minuto${minutes > 1 ? "s" : ""}`);
    if (remainingSeconds > 0) parts.push(`${remainingSeconds} segundo${remainingSeconds > 1 ? "s" : ""}`);

    return parts.length > 0 ? parts.join(" e ") : "menos de 1 segundo";
  }
}
