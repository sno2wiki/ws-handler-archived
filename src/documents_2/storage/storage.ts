import { DocumentContent, StorageDocument } from "./types.ts";
import { parseLinesMap } from "./parse_lines_map.ts";

export const storage = new Map<string, StorageDocument>();
export const parseStored = (content: DocumentContent): StorageDocument => {
  return {
    lines: parseLinesMap(content.lines),
    headCommitId: content.headCommitId,
  };
};

export const fetchDocument = (documentId: string): StorageDocument => {
  const stored = storage.get(documentId);
  if (!stored) {
    throw new Error("Document not found");
  }
  return stored;
};

export const storeDocument = (documentId: string, data: StorageDocument): void => {
  storage.set(documentId, data);
};
