export type BlockType = "paragraph" | "heading" | "list" | "table" | "quote";

interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  text: string;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  text: string;
}

export interface ListBlock extends BaseBlock {
  type: "list";
  items: string[];
  ordered: boolean;
}

export interface TableBlock extends BaseBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface QuoteBlock extends BaseBlock {
  type: "quote";
  text: string;
  author?: string;
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | TableBlock
  | QuoteBlock;
