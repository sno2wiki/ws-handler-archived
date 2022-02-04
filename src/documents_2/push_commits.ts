import { DocumentContent, DocumentType, EditCommit, HappenedError } from "./types.ts";
import { fetchCache, storeCache } from "./cache.ts";
import { updateDocument } from "../engine_2/mod.ts";
export const pushCommits = async (
  documentId: string,
  commits: EditCommit[],
  logger: (error: HappenedError) => void,
): Promise<DocumentContent> => {
  const cached = await fetchCache(documentId);

  const { updated, error } = updateDocument(cached, commits);
  if (error) logger(error);

  await storeCache(documentId, updated);
  return updated;
};
