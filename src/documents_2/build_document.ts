import { DocumentType, StoredDocumentData } from "./types.ts";
import { buildLinesMap } from "./build_lines_map.ts";
export const buildDocument = (documentId: string, stored: StoredDocumentData): DocumentType => {
  return {
    documentId,
    content: {
      headCommitId: stored.headCommitId,
      lines: buildLinesMap(stored.lines),
    },
  };
};
