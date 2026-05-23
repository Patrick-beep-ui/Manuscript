import type { Reference } from "../../types/reference";
import { formatBook } from "./formatBook";
import { formatJournal } from "./formatJournal";
import { formatWebsite } from "./formatWebsite";

export function formatAPA(ref: Reference): string {
  switch (ref.type) {
    case "book":    return formatBook(ref);
    case "journal": return formatJournal(ref);
    case "website": return formatWebsite(ref);
  }
}
