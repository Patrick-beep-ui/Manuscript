export function FormCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-5">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
        <span className="text-base">{icon}</span>
        <h2 className="font-semibold text-slate-800 text-sm">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
