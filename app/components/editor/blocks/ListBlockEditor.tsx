import type { ListBlock } from "../../../types/blocks";

interface Props {
  block: ListBlock;
  onChange: (block: ListBlock) => void;
}

export function ListBlockEditor({ block, onChange }: Props) {
  function updateItem(index: number, value: string) {
    const items = block.items.map((item, i) => (i === index ? value : item));
    onChange({ ...block, items });
  }

  function addItem() {
    onChange({ ...block, items: [...block.items, ""] });
  }

  function removeItem(index: number) {
    if (block.items.length <= 1) return;
    onChange({ ...block, items: block.items.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-1.5">
      <button
        onClick={() => onChange({ ...block, ordered: !block.ordered })}
        className="text-xs px-2 py-0.5 rounded border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors mb-1"
      >
        {block.ordered ? "1. Numerada" : "• Viñetas"}
      </button>

      {block.items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="text-xs text-slate-400 w-5 flex-shrink-0 text-right">
            {block.ordered ? `${idx + 1}.` : "•"}
          </span>
          <input
            value={item}
            onChange={(e) => updateItem(idx, e.target.value)}
            placeholder="Elemento…"
            className="flex-1 text-sm text-slate-700 bg-transparent border-0 outline-none placeholder:text-slate-300"
          />
          {block.items.length > 1 && (
            <button
              onClick={() => removeItem(idx)}
              className="text-slate-300 hover:text-red-400 transition-colors text-sm leading-none"
            >
              ×
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addItem}
        className="text-xs text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 mt-1"
      >
        + Añadir elemento
      </button>
    </div>
  );
}
