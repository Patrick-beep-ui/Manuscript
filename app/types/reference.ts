export type ReferenceType = "book" | "journal" | "website";

interface BaseReference {
  id: string;
  type: ReferenceType;
}

export interface BookReference extends BaseReference {
  type: "book";
  author: string;
  year: string;
  title: string;
  edition?: string;
  publisher: string;
}

export interface JournalReference extends BaseReference {
  type: "journal";
  author: string;
  year: string;
  title: string;
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
}

export interface WebsiteReference extends BaseReference {
  type: "website";
  author?: string;
  year?: string;
  title: string;
  siteName?: string;
  url: string;
  accessDate?: string;
}

export type Reference = BookReference | JournalReference | WebsiteReference;
