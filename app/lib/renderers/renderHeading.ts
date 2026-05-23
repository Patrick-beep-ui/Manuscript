import type { HeadingBlock } from "../../types/blocks";
import { escapeHtml } from "../escapeHtml";

export function renderHeading(block: HeadingBlock): string {
  if (!block.text.trim()) return "";
  return `<h3>${escapeHtml(block.text.trim())}</h3>`;
}
