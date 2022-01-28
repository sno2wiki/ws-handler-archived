import { documents } from "./storage.ts";
import { CommitUnion, DocumentType } from "../types.ts";
export const getDocument = (documentId: string): DocumentType => {
  const stored = documents.get(documentId);
  if (!stored) {
    throw new Error("Document not found");
  }
  return stored;
};
