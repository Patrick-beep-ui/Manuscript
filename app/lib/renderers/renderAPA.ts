import type { Reference } from "../../types/reference";
import { renderBook } from "./renderBook";
import { renderJournal } from "./renderJournal";
import { renderWebsite } from "./renderWebsite";
import { renderReport } from "./renderReport";
import { renderCustom } from "./renderCustom";

export function renderAPA(ref: Reference): string {
  switch (ref.type) {
    case "book":    return renderBook(ref);
    case "journal": return renderJournal(ref);
    case "website": return renderWebsite(ref);
    case "report":  return renderReport(ref);
    case "custom":  return renderCustom(ref);
  }
}
