import type { ContentBlock } from "../../types/blocks";
import { renderParagraph } from "./renderParagraph";
import { renderHeading }   from "./renderHeading";
import { renderList }      from "./renderList";
import { renderTable }     from "./renderTable";
import { renderQuote }     from "./renderQuote";

export function renderBlock(block: ContentBlock): string {
  switch (block.type) {
    case "paragraph": return renderParagraph(block);
    case "heading":   return renderHeading(block);
    case "list":      return renderList(block);
    case "table":     return renderTable(block);
    case "quote":     return renderQuote(block);
  }
}
