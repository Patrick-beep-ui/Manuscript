import type { ContentBlock } from "./blocks";

export interface Section {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export type Template = "academic";
