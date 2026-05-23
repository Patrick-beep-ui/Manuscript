import type { WebsiteReference } from "../../types/reference";
import { escapeHtml } from "../escapeHtml";

export function renderWebsite(ref: WebsiteReference): string {
  const author   = ref.author   ? `${escapeHtml(ref.author.trim())}. `       : "";
  const year     = escapeHtml(ref.year || "s.f.");
  const siteName = ref.siteName ? ` <em>${escapeHtml(ref.siteName.trim())}</em>.` : "";
  const access   = ref.accessDate ? ` Recuperado el ${escapeHtml(ref.accessDate)} de` : "";
  const url      = `<a href="${escapeHtml(ref.url.trim())}">${escapeHtml(ref.url.trim())}</a>`;

  return `${author}(${year}). ${escapeHtml(ref.title.trim())}.${siteName}${access} ${url}`;
}
