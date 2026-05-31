import type { QuoteBlock } from "../../types/blocks";
import { parseInline } from "../parseInline";
import { escapeHtml } from "../escapeHtml";

export function renderQuote(block: QuoteBlock): string {
  if (!block.text.trim()) return "";
  const author = block.author?.trim()
    ? `\n  <div class="quote-author">— ${escapeHtml(block.author.trim())}</div>`
    : "";
  const content = isHtml(block.text)
    ? block.text
    : parseInline(block.text.trim());
  return `<div class="quote-box">\n  <p>${content}</p>${author}\n</div>`;
}

function isHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}
