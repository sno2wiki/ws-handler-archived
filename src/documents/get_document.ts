import { documents } from "./storage.ts";
import { CommitUnion, DocumentType } from "../types.ts";
export const getDocument = (documentId: string): DocumentType => {
  const stored = documents.find((document) => document.id === documentId);
  if (!stored) {
    throw new Error("Document not found");
  }
  return stored;
};
