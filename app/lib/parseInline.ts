import { escapeHtml } from "./escapeHtml";

/**
 * Escapes user text and converts **bold** and *italic* markers to HTML.
 * escapeHtml runs first so user-supplied < > cannot inject tags.
 */
export function parseInline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
