import type { ParagraphBlock } from "../../types/blocks";
import { parseInline } from "../parseInline";

export function renderParagraph(block: ParagraphBlock): string {
  if (!block.text.trim()) return "";
  if (isHtml(block.text)) return block.text;
  return block.text
    .split(/\n\n+/)
    .filter((p) => p.trim())
    .map((p) => {
      const lines = p.trim().split("\n").map(parseInline);
      return `<p>${lines.join("<br>")}</p>`;
    })
    .join("\n");
}

function isHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}
