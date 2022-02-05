import { createCommitId, createLineId } from "../common/mod.ts";
import { StorageDocument } from "./types.ts";

import { storeDocument } from "./storage/mod.ts";
export const createEmptyDocument = async (documentId: string, createdBy: string): Promise<StorageDocument> => {
  const newDocument: StorageDocument = {
    headCommitId: createCommitId(),
    lines: [
      { id: createLineId(), text: "TEXT1" },
      { id: createLineId(), text: "TEXT2" },
    ],
  };
  await storeDocument(documentId, newDocument);
  return newDocument;
};
