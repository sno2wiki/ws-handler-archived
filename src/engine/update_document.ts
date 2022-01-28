import { CommitUnion, DocumentType, EditCommitType } from "../types.ts";
import { processCommits } from "./process_commits.ts";

export const sortCommits = (commits: CommitUnion[]) => (commits);

export const updateDocument = (document: DocumentType, commits: CommitUnion[]): DocumentType => {
  const sorted = sortCommits(commits);
  const edits = sorted.filter((commit): commit is EditCommitType => commit.type === "EDIT").map(({ data }) => data);
  const lines = processCommits(document.lines, edits);

  return {
    ...document,
    lines,
    latestCommitId: sorted[sorted.length - 1].commitId,
  };
};
