import { GitCommitVertical, History } from "lucide-react";
import { useState } from "react";

const data: TimelineGroup[] = [
  {
    date: "Abril 07 2025",
    entries: [
      {
        id: "c848aa38-5a7d...",
        timestamp: "07/04/2025 12:48",
        avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80", // substitua pela sua imagem
      },
      {
        id: "d6c7091f-d89e...",
        timestamp: "07/04/2025 12:08",
        avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "d6c7091f-d89e...",
        timestamp: "07/04/2025 12:08",
        avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "c848aa38-5a7d...",
        timestamp: "07/04/2025 12:48",
        avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    date: "Abril 08 2025",
    entries: [
      {
        id: "c848aa38-5a7d...",
        timestamp: "07/04/2025 12:48",
        avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "d6c7091f-d89e...",
        timestamp: "07/04/2025 12:08",
        avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "d6c7091f-d89e...",
        timestamp: "07/04/2025 12:08",
        avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "c848aa38-5a7d...",
        timestamp: "07/04/2025 12:48",
        avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];

export function HistoryContent() {
  const [historyModal, setHistoryModal] = useState(false);

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
            <h2 className="text-xl mb-0 font-semibold text-white">Histórico</h2>
            <button onClick={() => setHistoryModal(false)} className="text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>

          <div className="py-4 px-2 space-y-6">
            {data.map((group, index) => (
              <div key={index} className="relative">
                <div className="absolute left-4 top-12 w-0.5 bg-gray-600 -z-10 h-[85%]" />

                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center mt-1">
                    <GitCommitVertical size={32} />
                  </div>
                  <h3 className="text-base font-medium text-gray-300">{group.date}</h3>
                </div>

                <div className="mt-3 ml-8 space-y-3">
                  {group.entries.map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 px-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-150"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={entry.avatarUrl}
                          alt="avatar"
                          className="w-8 h-8 rounded-full border-2 border-gray-600"
                        />
                        <p className="text-xs font-mono text-gray-200 truncate w-32">{entry.id}</p>
                      </div>
                      <span className="text-xs text-gray-400">{entry.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
