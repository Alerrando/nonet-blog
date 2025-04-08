import dayjs from "dayjs";
import { GitCommitVertical, History } from "lucide-react";
import { useState } from "react";

import { HistoryArticleModel } from "@/models/HistoryArticleModel";
import { useBlog } from "@/provider/BlogProvider";

export function HistoryContent() {
  const { currentArticle, selectedHistory, setSelectedHistory } = useBlog();
  const [historyModal, setHistoryModal] = useState(false);
  const grouped = groupByDay();

  function groupByDay() {
    const agrupado = {};

    currentArticle.history.forEach((item) => {
      const dataFormatada = dayjs(item.createdAt).format("YYYY-MM-DD");

      if (!agrupado[dataFormatada]) {
        agrupado[dataFormatada] = [];
      }
      agrupado[dataFormatada].push(item);
    });

    return agrupado;
  }

  return (
    <>
      {!historyModal && (
        <div
          className={`fixed -right-2 top-1/3 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-500 bg-gray-600 p-2 shadow-lg hover:bg-gray-800 transition-all duration-200`}
          onClick={() => setHistoryModal(true)}
        >
          <History size={18} className="text-white" />
        </div>
      )}

      {historyModal && (
        <div className="fixed right-4 top-1/3 z-30 w-[28%] max-h-96 overflow-y-auto rounded-xl border border-gray-600 bg-gray-800 shadow-2xl">
          <div className="sticky top-0 flex items-center justify-between bg-gray-800 py-4 px-4 border-b border-gray-700 z-30">
            <div className="flex items-center gap-2">
              <History size={18} />
              <h2 className="text-xl my-0 font-semibold text-white">Histórico</h2>
            </div>
            <button onClick={() => setHistoryModal(false)} className="text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>

          <div className="p-2 space-y-6">
            {currentArticle.history.length > 0 ? (
              <>
                {Object.keys(grouped).map((date, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-3.5 top-12 w-0.5 bg-gray-600 -z-10 h-[calc(100%_-_3rem)]" />

                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center mt-1">
                        <GitCommitVertical size={32} />
                      </div>
                      <h3 className="text-base font-medium text-gray-300">{date}</h3>
                    </div>

                    <div className="mt-3 ml-8 space-y-3">
                      {grouped[date].map((entry: HistoryArticleModel, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between py-3 px-2 rounded-lg transition-colors duration-150 cursor-pointer ${
                            selectedHistory === entry.id ? "bg-gray-900" : "bg-gray-700 hover:bg-gray-600"
                          }`}
                          onClick={() => setSelectedHistory(entry.id)}
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={currentArticle.image}
                              alt="image article"
                              className="w-8 h-8 rounded-full border-2 border-gray-600"
                            />
                            <p className="text-xs font-mono text-gray-200 truncate w-32">{entry.id}</p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {dayjs(entry.createdAt, "YYYY-MM-DD").format("HH:mm:ss")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-gray-400 text-sm">Nenhum registro encontrado</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
