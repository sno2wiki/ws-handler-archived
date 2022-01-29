import { documents } from "./storage.ts";
import { CommitUnion, DocumentType, LineType, ResponseDocument, ResponseDocumentLine } from "../types.ts";

export const parse = (document: DocumentType): ResponseDocument => {
  return {
    id: document.id,
    lines: document.lines,
    latestCommitId: document.latestCommitId,
  };
};
