import type { Reference } from "../../types/reference";
import { renderBook } from "./renderBook";
import { renderJournal } from "./renderJournal";
import { renderWebsite } from "./renderWebsite";

export function renderAPA(ref: Reference): string {
  switch (ref.type) {
    case "book":    return renderBook(ref);
    case "journal": return renderJournal(ref);
    case "website": return renderWebsite(ref);
  }
}
