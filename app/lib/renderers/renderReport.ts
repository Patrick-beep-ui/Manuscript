import type { ReportReference } from "../../types/reference";
import { escapeHtml } from "../escapeHtml";

export function renderReport(ref: ReportReference): string {
  const author = ref.author ? `${escapeHtml(ref.author.trim())}. ` : "";
  const year = escapeHtml(ref.year || "s.f.");
  const reportNum = ref.reportNumber
    ? ` (${escapeHtml(ref.reportNumber.trim())})`
    : "";
  const institution = ref.institution
    ? `. ${escapeHtml(ref.institution.trim())}.`
    : ".";
  let url = "";
  if (ref.url) {
    url = ref.accessDate
      ? ` Recuperado el ${escapeHtml(ref.accessDate)} de <a href="${escapeHtml(ref.url.trim())}">${escapeHtml(ref.url.trim())}</a>`
      : ` <a href="${escapeHtml(ref.url.trim())}">${escapeHtml(ref.url.trim())}</a>`;
  }

  return `${author}(${year}). <em>${escapeHtml(ref.title.trim())}${reportNum}</em>${institution}${url}`;
}
