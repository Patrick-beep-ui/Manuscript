export type ReferenceType = "book" | "journal" | "website" | "report" | "custom";

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

export interface ReportReference extends BaseReference {
  type: "report";
  author: string;
  year: string;
  title: string;
  reportNumber?: string;
  institution: string;
  url?: string;
  accessDate?: string;
}

export interface CustomReference extends BaseReference {
  type: "custom";
  text: string;
}

export type Reference =
  | BookReference
  | JournalReference
  | WebsiteReference
  | ReportReference
  | CustomReference;
