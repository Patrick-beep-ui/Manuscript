import type { ParagraphBlock } from "../../../types/blocks";

interface Props {
  block: ParagraphBlock;
  onChange: (block: ParagraphBlock) => void;
}

export function ParagraphBlockEditor({ block, onChange }: Props) {
  return (
    <textarea
      value={block.text}
      onChange={(e) => onChange({ ...block, text: e.target.value })}
      placeholder="Escribe el párrafo… Usa **negrita** y *cursiva*. Doble salto = nuevo párrafo."
      rows={3}
      className="w-full text-sm text-slate-700 bg-transparent border-0 outline-none resize-none placeholder:text-slate-300 leading-relaxed"
    />
  );
}
