import { DocumentContent, DocumentType, StoredDocumentData } from "./types.ts";

import { buildDocument } from "./build_document.ts";
import { parseLinesMap } from "./parse_lines_map.ts";
import { createCommitId, createLineId } from "../common/mod.ts";
export const cache = new Map<string, DocumentContent>();

export const fetchCache = async (documentId: string): Promise<DocumentContent> => {
  const cached = cache.get(documentId) || await ensureCache(documentId);
  return cached;
};

export const storeCache = (documentId: string, updated: DocumentContent): void => {
  cache.set(documentId, updated);
};

export const ensureCache = async (documentId: string): Promise<DocumentContent> => {
  const document = getDocument(documentId);
  await storeCache(documentId, document.content);
  return document.content;
};

export const releaseCache = async (documentId: string): Promise<void> => {
  const cached = cache.get(documentId);
  if (!cached) throw new Error("Cache does not exists");

  await storeDocument(documentId, parseStored(cached));
  cache.delete(documentId);
};

export const parseStored = (content: DocumentContent): StoredDocumentData => {
  return {
    lines: parseLinesMap(content.lines),
    headCommitId: content.headCommitId,
  };
};

export const storage = new Map<string, StoredDocumentData>();
export const getDocument = (documentId: string): DocumentType => {
  const stored = storage.get(documentId);
  if (!stored) {
    throw new Error("Document not found");
  }

  return buildDocument(documentId, stored);
};

export const storeDocument = (documentId: string, data: StoredDocumentData): void => {
  storage.set(documentId, data);
};

export const createEmptyDocument = (documentId: string): void => {
  storage.set(
    documentId,
    {
      headCommitId: createCommitId(),
      lines: [
        { id: createLineId(), text: "" },
      ],
    },
  );
};
