import { DocumentType, InitCommitType } from "../types.ts";
import { createCommitId, createLineId } from "../common/mod.ts";

import { documents } from "./storage.ts";

export const createDocument = (documentId: string, userId: string): DocumentType => {
  /*
  const initCommit: InitCommitType = {
    type: "INIT",
    commitId: createCommitId(),
    previousCommitId: null,
  };
  */

  const newDocument: DocumentType = {
    id: documentId,
    lines: [
      {
        lineId: createLineId(),
        nextLineId: null,
        text: "Text",
      },
    ],
  };

  documents.push(newDocument);
  return newDocument;
};
