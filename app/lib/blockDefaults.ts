import type { ContentBlock, BlockType } from "../types/blocks";
import { uid } from "./uid";

export function createDefaultBlock(type: BlockType): ContentBlock {
  const id = uid();
  switch (type) {
    case "paragraph": return { id, type, text: "" };
    case "heading":   return { id, type, text: "" };
    case "list":      return { id, type, items: [""], ordered: false };
    case "table":     return { id, type, headers: ["Columna 1", "Columna 2"], rows: [["", ""]] };
    case "quote":     return { id, type, text: "" };
  }
}
