import type { BookReference } from "../../types/reference";
import { escapeHtml } from "../escapeHtml";

export function renderBook(ref: BookReference): string {
  const author    = ref.author    ? `${escapeHtml(ref.author.trim())}. `    : "";
  const year      = escapeHtml(ref.year || "s.f.");
  const edition   = ref.edition   ? ` (${escapeHtml(ref.edition)} ed.)`     : "";
  const publisher = ref.publisher ? `. ${escapeHtml(ref.publisher.trim())}.` : ".";

  return `${author}(${year}). <em>${escapeHtml(ref.title.trim())}${edition}</em>${publisher}`;
}
