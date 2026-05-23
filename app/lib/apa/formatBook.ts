import type { BookReference } from "../../types/reference";

export function formatBook(ref: BookReference): string {
  const author = ref.author ? `${ref.author.trim()}. ` : "";
  const year = ref.year || "s.f.";
  const edition = ref.edition ? ` (${ref.edition} ed.)` : "";
  return `${author}(${year}). ${ref.title.trim()}${edition}. ${ref.publisher.trim()}.`;
}
