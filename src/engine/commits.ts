export type LineType = { lineId: string; nextLineId: string; text: string };
export type Commit = InsertCommit | DeleteCommit;

import { InsertCommit, insertCommit } from "./insert.ts";
import { DeleteCommit, deleteCommit } from "./delete.ts";

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
