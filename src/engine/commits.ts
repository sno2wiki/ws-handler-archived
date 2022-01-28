export type LineType = { lineId: string; nextLineId: string; text: string };
export type DeleteCommitPayload = { lineId: string; cursor: number };
export type Commit =
  | InsertCommit
  | { method: "DELETE"; payload: DeleteCommitPayload };

import { InsertCommit, insertCommit, } from "./insert.ts";

export const commitReducer = (lines: LineType[], commit: Commit): LineType[] => {
  switch (commit.method) {
    case "INSERT":
      return insertCommit(lines, commit.payload);
    case "DELETE":
      return lines;
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
