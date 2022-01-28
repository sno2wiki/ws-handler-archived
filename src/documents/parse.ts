import { documents } from "./storage.ts";
import { CommitUnion, DocumentType, ResponseDocument } from "../types.ts";
export const parse = (document: DocumentType): ResponseDocument => {
  return { id: document.id, lines: document.lines };
};
