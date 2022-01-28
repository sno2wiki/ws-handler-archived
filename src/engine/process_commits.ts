import { insertCommit } from "./insert_commit.ts";
import { deleteCommit } from "./delete_commit.ts";
import { breakCommit } from "./break_commit.ts";
import { foldCommit } from "./fold_commit.ts";
import { EditCommit, LineType } from "./types.ts";

export const processCommits = (lines: LineType[], commits: EditCommit[]) => {
  for (const commit of commits) {
    switch (commit.method) {
      case "INSERT":
        lines = insertCommit(lines, commit.payload);
        break;
      case "DELETE":
        lines = deleteCommit(lines, commit.payload);
        break;
      case "BREAK":
        lines = breakCommit(lines, commit.payload);
        break;
      case "FOLD":
        lines = foldCommit(lines, commit.payload);
        break;
      default:
        break;
    }
  }
  return lines;
};
