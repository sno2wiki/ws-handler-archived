import { DocumentContent } from "../types.ts";

import { fetchDocument, parseStored, storeDocument } from "../storage/mod.ts";
import { buildLinesMap } from "./build_lines_map.ts";

const caches = new Map<string, DocumentContent>();

export const fetchCache = async (documentId: string): Promise<DocumentContent> => {
  if (caches.has(documentId)) return caches.get(documentId)!;

  const stored = fetchDocument(documentId);
  const cache = { headCommitId: stored.headCommitId, lines: buildLinesMap(stored.lines) };

  await storeCache(documentId, cache);
  return cache;
};
export const storeCache = (documentId: string, updated: DocumentContent): void => {
  caches.set(documentId, updated);
};

export const releaseCache = async (documentId: string): Promise<void> => {
  const cached = caches.get(documentId);
  if (!cached) throw new Error("Cache does not exists");

  await storeDocument(documentId, parseStored(cached));
  caches.delete(documentId);
};
