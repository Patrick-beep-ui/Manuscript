"use client";

import type { ParagraphBlock } from "../../../types/blocks";
import { RichTextEditor } from "../RichTextEditor";

interface Props {
  block: ParagraphBlock;
  onChange: (block: ParagraphBlock) => void;
}

export function ParagraphBlockEditor({ block, onChange }: Props) {
  return (
    <RichTextEditor
      content={block.text}
      onChange={(html) => onChange({ ...block, text: html })}
      placeholder="Escribe el párrafo… Usa los botones B/I para formato."
    />
  );
}
