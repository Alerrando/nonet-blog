interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-zinc-800 rounded-md p-4 flex flex-col gap-2 shadow-sm border border-zinc-700">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-xl font-semibold text-white">{value}</span>
    </div>
  );
}
