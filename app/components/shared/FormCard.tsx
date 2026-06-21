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
    <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden mb-5">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-slate-100 border-l-4 border-l-[#B8963E]">
        <span className="text-base">{icon}</span>
        <h2 className="font-semibold text-[#132033] text-sm tracking-wide">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
