export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-bold text-[#132033] uppercase tracking-widest mb-1.5 opacity-70">
        {label}
      </label>
      {children}
    </div>
  );
}
