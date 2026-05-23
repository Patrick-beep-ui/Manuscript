import type { TableBlock } from "../../types/blocks";
import { escapeHtml } from "../escapeHtml";

export function renderTable(block: TableBlock): string {
  const headers = block.headers
    .map((h) => `<th>${escapeHtml(h)}</th>`)
    .join("");

  const rows = block.rows
    .map((row) => {
      const cells = row.map((c) => `<td>${escapeHtml(c)}</td>`).join("");
      return `  <tr>${cells}</tr>`;
    })
    .join("\n");

  return `<table>\n  <thead><tr>${headers}</tr></thead>\n  <tbody>\n${rows}\n  </tbody>\n</table>`;
}
