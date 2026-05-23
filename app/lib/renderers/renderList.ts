import type { ListBlock } from "../../types/blocks";
import { parseInline } from "../parseInline";

export function renderList(block: ListBlock): string {
  const items = block.items.filter((i) => i.trim());
  if (items.length === 0) return "";
  const tag = block.ordered ? "ol" : "ul";
  const rows = items.map((i) => `  <li>${parseInline(i.trim())}</li>`).join("\n");
  return `<${tag}>\n${rows}\n</${tag}>`;
}
