import { fetchDocument } from "./storage/mod.ts";
export const findDocument = (documentId: string): {
  documentId: string;
  headCommitId: string;
  lines: {
    id: string;
    text: string;
  }[];
} | null => {
  try {
    const document = fetchDocument(documentId);
    return { documentId, ...document };
  } catch (e) {
    return null;
  }
};
