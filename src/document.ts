import { ActualDocument, CommitType, DocumentType, InitCommitType } from "./types.ts";
import { createCommitId, createLineId } from "./common.ts";
export const documents: DocumentType[] = [];

export const isExistsDocument = (documentId: string): boolean => {
  return documents.findIndex((document) => document.id === documentId) !== -1;
};
export const getDocument = (documentId: string): ActualDocument => {
  const stored = documents.find((document) => document.id === documentId);
  if (!stored) throw new Error("Document not found");

  return {
    documentId: stored.id,
    latestCommit: stored.latestCommit,
    lines: stored.lines,
  };
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
      { lineId: createLineId(), text: "Text" },
    ],
  };

  documents.push(newDocument);

  return newDocument;
};

export const pushCommits = (documentId: string, commits: CommitType[]): ActualDocument => {
  const stored = documents.find((document) => document.id === documentId);
  if (!stored) throw new Error("Document not found");

  stored.commits.push(...commits);
  stored.latestCommit = stored.commits[stored.commits.length - 1];

  console.dir(stored.commits);

  return {
    documentId: stored.id,
    latestCommit: stored.latestCommit,
    lines: stored.lines,
  };
};
