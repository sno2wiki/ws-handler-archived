import { documents } from "./storage.ts";
import { CommitUnion, DocumentType } from "../types.ts";
export const findDocument = (documentId: string): DocumentType | null => {
  return documents.find((document) => document.id === documentId) ?? null;
};
