import { CommitUnion, DocumentType, EditCommitType } from "../types.ts";
import { DocumentContent, EditCommit, HappenedError, LinesMap } from "./types.ts";
import { processCommits } from "./process_commits.ts";

export const updateDocument = (
  { lines, headCommitId }: DocumentContent,
  commits: EditCommit[],
): { updated: DocumentContent; error?: HappenedError } => {
  const processed = processCommits(lines, headCommitId, commits);

  return {
    updated: { lines: processed.lines, headCommitId: processed.headCommitId },
    error: processed.error,
  };
};
