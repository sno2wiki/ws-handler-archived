import { DocumentType, InitCommitType } from "../types.ts";
import { createCommitId, createLineId } from "../common/mod.ts";

import { documents } from "./storage.ts";

export const createDocument = (documentId: string, userId: string): DocumentType => {

  const initCommit: InitCommitType = {
    type: "INIT",
    commitId: createCommitId(),
    previousCommitId: null,
  };

  const firstLine = {
    lineId: createLineId(),
    nextLineId: null,
    text: "Text",
  };

  const newDocument: DocumentType = {
    id: documentId,
    lines: [firstLine],
    firstLine: firstLine,
    latestCommit: initCommit
  };

  documents.push(newDocument);
  return newDocument;
};
