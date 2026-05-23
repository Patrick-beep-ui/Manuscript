import type { QuoteBlock } from "../../types/blocks";
import { parseInline } from "../parseInline";
import { escapeHtml } from "../escapeHtml";

export function renderQuote(block: QuoteBlock): string {
  if (!block.text.trim()) return "";
  const author = block.author?.trim()
    ? `\n  <div class="quote-author">— ${escapeHtml(block.author.trim())}</div>`
    : "";
  return `<div class="quote-box">\n  <p>${parseInline(block.text.trim())}</p>${author}\n</div>`;
}
