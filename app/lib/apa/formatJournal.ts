import type { JournalReference } from "../../types/reference";

export function formatJournal(ref: JournalReference): string {
  const author = ref.author ? `${ref.author.trim()}. ` : "";
  const year = ref.year || "s.f.";
  let volumeInfo = "";
  if (ref.volume) {
    volumeInfo = ref.issue ? `, ${ref.volume}(${ref.issue})` : `, ${ref.volume}`;
  }
  const pages = ref.pages ? `, ${ref.pages}` : "";
  const doi = ref.doi
    ? ` https://doi.org/${ref.doi.replace(/^https?:\/\/doi\.org\//, "")}`
    : "";
  return `${author}(${year}). ${ref.title.trim()}. ${ref.journal.trim()}${volumeInfo}${pages}.${doi}`;
}
