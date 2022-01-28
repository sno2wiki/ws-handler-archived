import { CommitType, DocumentType } from "./types.ts";
import { processCommits } from "./process_commits.ts";

export const sortCommits = (commits: CommitType[]) => (commits);

export const updateDocument = (document: DocumentType, commits: CommitType[]): DocumentType => {
  const sorted = sortCommits(commits);
  const edits = sorted.filter((commit) => commit.type === "EDIT").map(({ data }) => data);
  const lines = processCommits(document.lines, edits);

  return {
    ...document,
    lines,
  };
};
