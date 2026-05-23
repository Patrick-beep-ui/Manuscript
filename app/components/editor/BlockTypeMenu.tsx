import type { BlockType } from "../../types/blocks";

const BLOCK_TYPES: { type: BlockType; label: string; desc: string; color: string }[] = [
  { type: "paragraph", label: "Párrafo",   desc: "Texto con **negrita** y *cursiva*", color: "text-slate-500 bg-slate-100" },
  { type: "heading",   label: "Subtítulo", desc: "Encabezado de subsección",           color: "text-blue-600 bg-blue-50"   },
  { type: "list",      label: "Lista",     desc: "Viñetas o numerada",                 color: "text-green-600 bg-green-50" },
  { type: "table",     label: "Tabla",     desc: "Tabla con encabezados",              color: "text-purple-600 bg-purple-50" },
  { type: "quote",     label: "Cita",      desc: "Tesis o cita destacada",             color: "text-amber-600 bg-amber-50"  },
];

interface BlockTypeMenuProps {
  onSelect: (type: BlockType) => void;
  onCancel: () => void;
}

export function BlockTypeMenu({ onSelect, onCancel }: BlockTypeMenuProps) {
  return (
    <div className="border border-slate-200 rounded-lg bg-slate-50 p-3">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
        Tipo de bloque
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
        {BLOCK_TYPES.map(({ type, label, desc, color }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="flex items-start gap-2 p-2 rounded-md border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
          >
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0 ${color}`}>
              {label[0]}
            </span>
            <div>
              <div className="text-xs font-medium text-slate-700">{label}</div>
              <div className="text-xs text-slate-400 leading-tight">{desc}</div>
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={onCancel}
        className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
      >
        Cancelar
      </button>
    </div>
  );
}
