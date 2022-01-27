import { DocumentType, InitCommitType } from "./types.ts";
import { createCommitId, createLineId } from "./common.ts";

export const documents: DocumentType[] = [];

export const getDocument = (documentId: string): DocumentType | null => {
  return documents.find((document) => document.id === documentId) || null;
};

export const createDocument = (documentId: string, userId: string): DocumentType => {
  const initCommit: InitCommitType = {
    type: "INIT",
    commitId: createCommitId(),
    previousCommitId: null,
    userId: userId,
  };

  const newDocument: DocumentType = {
    id: documentId,
    commits: [initCommit],
    latestCommit: initCommit,
    lines: [
      { lineId: createLineId(), text: "" },
    ],
  };

  documents.push(newDocument);

  return newDocument;
};
