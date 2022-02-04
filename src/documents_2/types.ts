import { DocumentContent, EditCommit, LinesMap } from "../engine_2/mod.ts";
export type { DocumentContent, EditCommit, HappenedError, LinesMap } from "../engine_2/mod.ts";
export type DocumentType = {
  documentId: string;
  content: DocumentContent;
};

export type Line = { id: string; text: string };

export type StoredDocumentData = { lines: Line[]; headCommitId: string };
