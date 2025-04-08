import dayjs from "dayjs";
import { Edit, GitCommitVertical, History, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { HistoryArticleModel } from "@/models/HistoryArticleModel";
import { useBlog } from "@/provider/BlogProvider";
import { useHistoryProvider } from "@/provider/HistoryArticleProvider";

export function HistoryContent() {
  const { currentArticle, setCurrentArticle } = useBlog();
  const { deleteHistory, selectedHistory, setSelectedHistory } = useHistoryProvider();

  const [historyModal, setHistoryModal] = useState(false);
  const grouped = groupByDay();

  useEffect(() => {
    if (currentArticle?.history?.length > 0 && !selectedHistory) {
      const lastGroupKey = Object.keys(grouped).pop();
      const lastItem = grouped[lastGroupKey]?.pop();
      if (lastItem) {
        setSelectedHistory(lastItem.id);
      }
    }
  }, [grouped]);

  return (
    <>
      {!historyModal && (
        <div
          className={`fixed right-2 sm:-right-2 top-1/3 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-500 bg-gray-600 p-2 shadow-lg hover:bg-gray-800 transition-all duration-200`}
          onClick={() => setHistoryModal(true)}
        >
          <History size={18} className="text-white" />
        </div>
      )}

      {historyModal && (
        <div className="fixed inset-0 sm:inset-auto sm:right-4 sm:top-1/3 z-30 w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[28%] max-h-[80vh] sm:max-h-96 overflow-y-auto rounded-none sm:rounded-xl border border-gray-600 bg-gray-800 shadow-2xl">
          <div className="sticky top-0 flex items-center justify-between bg-gray-800 py-4 px-4 border-b border-gray-700 z-30">
            <div className="flex items-center gap-2">
              <History size={18} />
              <h2 className="text-xl my-0 font-semibold text-white">Histórico</h2>
            </div>
            <button
              onClick={() => setHistoryModal(false)}
              className="text-gray-400 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          <div className="p-2 sm:p-4 space-y-6">
            {currentArticle?.history?.length > 0 ? (
              <>
                {Object.keys(grouped)?.map((date, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-3.5 top-12 w-0.5 bg-gray-600 -z-10 h-[calc(100%_-_3rem)]" />

                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center mt-1">
                        <GitCommitVertical size={32} />
                      </div>
                      <h3 className="text-base font-medium text-gray-300">{date}</h3>
                    </div>

                    <div className="mt-3 ml-8 space-y-3">
                      {grouped[date]?.map((entry: HistoryArticleModel, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between py-3 px-2 rounded-lg transition-colors duration-150 cursor-pointer relative group ${
                            selectedHistory === entry.id ? "bg-gray-900" : "bg-gray-700 hover:bg-gray-600"
                          }`}
                          onClick={() => setSelectedHistory(entry.id)}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <img
                              src={currentArticle.image}
                              alt="image article"
                              className="w-8 h-8 rounded-full border-2 border-gray-600 flex-shrink-0"
                            />
                            <p className="text-xs sm:text-sm font-mono text-gray-200 truncate flex-1">{entry.id}</p>
                          </div>

                          <div className="flex items-center gap-2 pl-2">
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {dayjs(entry.createdAt, "YYYY-MM-DD").format("HH:mm:ss")}
                            </span>

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Lógica de edição
                                }}
                                className="p-1 text-gray-400 hover:text-blue-400 rounded hover:bg-gray-800"
                                title="Editar"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteHistory(entry.id);
                                }}
                                className="p-1 text-gray-400 hover:text-red-400 rounded hover:bg-gray-800"
                                title="Deletar"
                              >
                                <Trash size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-32">
                <span className="text-gray-400 text-sm">Nenhum registro encontrado</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

  function groupByDay() {
    const agrupado = {};

    currentArticle?.history?.forEach((item) => {
      const dataFormatada = dayjs(item.createdAt).format("YYYY-MM-DD");

      if (!agrupado[dataFormatada]) {
        agrupado[dataFormatada] = [];
      }
      agrupado[dataFormatada].push(item);
    });
    return agrupado;
  }
}
