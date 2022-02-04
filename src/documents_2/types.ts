import { DocumentContent } from "../engine_2/mod.ts";
export type { StorageDocument, StorageLine } from "./storage/types.ts";
export type { DocumentContent, EditCommit, HappenedError, LinesMap } from "../engine_2/mod.ts";
export type DocumentType = {
  documentId: string;
  content: DocumentContent;
};
