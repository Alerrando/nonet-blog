import { History } from "lucide-react";

export function HistoryContent() {
  return (
    <div
      className={`fixed -right-2 top-1/3 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-500 bg-gray-600 p-2 shadow-lg hover:bg-gray-800`}
    >
      <History size={18} className="text-white" />
    </div>
  );
}
