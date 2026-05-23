import type { JournalReference } from "../../types/reference";
import { escapeHtml } from "../escapeHtml";

export function renderJournal(ref: JournalReference): string {
  const author  = ref.author  ? `${escapeHtml(ref.author.trim())}. `  : "";
  const year    = escapeHtml(ref.year || "s.f.");
  const journal = `<em>${escapeHtml(ref.journal.trim())}</em>`;

  // APA: journal volume is italic, issue is not
  let volumeInfo = "";
  if (ref.volume) {
    const vol = `<em>${escapeHtml(ref.volume)}</em>`;
    volumeInfo = ref.issue ? `, ${vol}(${escapeHtml(ref.issue)})` : `, ${vol}`;
  }

  const pages = ref.pages ? `, ${escapeHtml(ref.pages)}` : "";

  let doi = "";
  if (ref.doi) {
    const doiPath = ref.doi.replace(/^https?:\/\/doi\.org\//, "");
    const doiUrl  = `https://doi.org/${doiPath}`;
    doi = ` <a href="${escapeHtml(doiUrl)}">${escapeHtml(doiUrl)}</a>`;
  }

  return `${author}(${year}). ${escapeHtml(ref.title.trim())}. ${journal}${volumeInfo}${pages}.${doi}`;
}
