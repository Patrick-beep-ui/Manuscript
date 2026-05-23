import type { WebsiteReference } from "../../types/reference";

export function formatWebsite(ref: WebsiteReference): string {
  const author = ref.author ? `${ref.author.trim()}. ` : "";
  const year = ref.year || "s.f.";
  const siteName = ref.siteName ? ` ${ref.siteName.trim()}.` : "";
  const access = ref.accessDate ? ` Recuperado el ${ref.accessDate} de` : "";
  return `${author}(${year}). ${ref.title.trim()}.${siteName}${access} ${ref.url.trim()}`;
}
