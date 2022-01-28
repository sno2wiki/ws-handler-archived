export type LineType = { lineId: string; nextLineId: string | null; text: string };
export type Commit = InsertCommitType | DeleteCommitType;

import { insertCommit, InsertCommitType } from "./insert_commit.ts";
import { deleteCommit, DeleteCommitType } from "./delete_commit.ts";

export const processCommits = (lines: LineType[], commits: Commit[]) => {
  for (const commit of commits) {
    switch (commit.method) {
      case "INSERT":
        lines = insertCommit(lines, commit.payload);
        break;
      case "DELETE":
        lines = deleteCommit(lines, commit.payload);
        break;
      default:
        break;
    }
  }
  return lines;
};
