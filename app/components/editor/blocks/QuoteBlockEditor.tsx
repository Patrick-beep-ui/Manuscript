"use client";

import type { QuoteBlock } from "../../../types/blocks";
import { RichTextEditor } from "../RichTextEditor";

interface Props {
  block: QuoteBlock;
  onChange: (block: QuoteBlock) => void;
}

export function QuoteBlockEditor({ block, onChange }: Props) {
  return (
    <div className="space-y-2 border-l-2 border-amber-300 pl-3">
      <RichTextEditor
        content={block.text}
        onChange={(html) => onChange({ ...block, text: html })}
        placeholder="Escribe la cita o tesis…"
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
