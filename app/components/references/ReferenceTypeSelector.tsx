import type { ReferenceType } from "../../types/reference";

const TYPES: { type: ReferenceType; icon: string; label: string; desc: string }[] = [
  { type: "book",    icon: "📖", label: "Libro",    desc: "Libro o capítulo" },
  { type: "journal", icon: "📰", label: "Artículo", desc: "Revista científica" },
  { type: "website", icon: "🌐", label: "Web",       desc: "Página o recurso en línea" },
];

interface ReferenceTypeSelectorProps {
  onSelect: (type: ReferenceType) => void;
  onCancel: () => void;
}

export function ReferenceTypeSelector({ onSelect, onCancel }: ReferenceTypeSelectorProps) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Tipo de referencia
      </p>
      <div className="grid grid-cols-3 gap-2">
        {TYPES.map(({ type, icon, label, desc }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="flex flex-col items-center gap-1.5 p-3 border border-slate-200 rounded-lg bg-white hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
          >
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <span className="text-xs text-slate-400">{desc}</span>
          </button>
        ))}
      </div>
      <button
        onClick={onCancel}
        className="mt-3 text-xs text-slate-400 hover:text-slate-600 transition-colors"
      >
        Cancelar
      </button>
    </div>
  );
}
