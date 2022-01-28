import { CommitUnion, DocumentType } from "../types.ts";
import { documents } from "./storage.ts";
import { updateDocument } from "../engine/mod.ts";
export const pushCommits = (document: DocumentType, commits: CommitUnion[]): DocumentType => {
  const updated = updateDocument(document, commits);
  documents.set(document.id, updated);
  return updated;
};
