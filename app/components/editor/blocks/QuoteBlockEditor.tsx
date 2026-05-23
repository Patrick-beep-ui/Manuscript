import type { QuoteBlock } from "../../../types/blocks";

interface Props {
  block: QuoteBlock;
  onChange: (block: QuoteBlock) => void;
}

export function QuoteBlockEditor({ block, onChange }: Props) {
  return (
    <div className="space-y-2 border-l-2 border-amber-300 pl-3">
      <textarea
        value={block.text}
        onChange={(e) => onChange({ ...block, text: e.target.value })}
        placeholder="Escribe la cita o tesis…"
        rows={2}
        className="w-full text-sm italic text-slate-600 bg-transparent border-0 outline-none resize-none placeholder:not-italic placeholder:text-slate-300 leading-relaxed"
      />
      <input
        value={block.author ?? ""}
        onChange={(e) => onChange({ ...block, author: e.target.value || undefined })}
        placeholder="Atribución (autor, fuente, año)…"
        className="w-full text-xs text-slate-400 bg-transparent border-0 outline-none placeholder:text-slate-300"
      />
    </div>
  );
}
