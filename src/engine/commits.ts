export type LineType = { lineId: string; nextLineId: string | null; text: string };
export type Commit = InsertCommitType | DeleteCommitType;

import { insertCommit, InsertCommitType } from "./insert_commit.ts";
import { deleteCommit, DeleteCommitType } from "./delete_commit.ts";

export const commitReducer = (lines: LineType[], commit: Commit): LineType[] => {
  switch (commit.method) {
    case "INSERT":
      return insertCommit(lines, commit.payload);
    case "DELETE":
      return deleteCommit(lines, commit.payload);
    default:
      return lines;
  }
};
export const processCommits = (lines: LineType[], commits: Commit[]) => {
  for (const commit of commits) {
    lines = commitReducer(lines, commit);
  }
  return lines;
};
