import { insertCommit, InsertCommitError, InsertPayload } from "./insert_commit.ts";
import { deleteCommit, DeleteCommitError, DeletePayload } from "./delete_commit.ts";
import { breakCommit, BreakCommitError, BreakPayload } from "./break_commit.ts";
import { foldCommit, FoldCommitError, FoldPayload } from "./fold_commit.ts";
import { LinesMap } from "./types.ts";

type HappenedError = {
  commitId: string;
  data:
    | { type: "INSERT"; message: string }
    | { type: "DELETE"; message: string }
    | { type: "BREAK"; message: string }
    | { type: "FOLD"; message: string };
};

export const processCommits = (
  initLines: LinesMap,
  initCommitId: string,
  commits: {
    commitId: string;
    data:
      | { method: "INSERT"; payload: InsertPayload }
      | { method: "DELETE"; payload: DeletePayload }
      | { method: "BREAK"; payload: BreakPayload }
      | { method: "FOLD"; payload: FoldPayload };
  }[],
): {
  lines: LinesMap;
  headCommitId: string;
  error?: HappenedError;
} => {
  let lines = initLines;
  let headCommitId = initCommitId;
  let error: HappenedError | null = null;
  for (const { commitId, data } of commits) {
    try {
      switch (data.method) {
        case "INSERT":
          lines = insertCommit(lines, data.payload);
          break;
        case "DELETE":
          lines = deleteCommit(lines, data.payload);
          break;
        case "BREAK":
          lines = breakCommit(lines, data.payload);
          break;
        case "FOLD":
          lines = foldCommit(lines, data.payload);
          break;
      }
      headCommitId = commitId;
    } catch (e) {
      if (e instanceof InsertCommitError) {
        error = { commitId, data: { type: "INSERT", message: e.message } };
        break;
      } else if (e instanceof DeleteCommitError) {
        error = { commitId, data: { type: "BREAK", message: e.message } };
        break;
      } else if (e instanceof BreakCommitError) {
        error = { commitId, data: { type: "BREAK", message: e.message } };
        break;
      } else if (e instanceof FoldCommitError) {
        error = { commitId, data: { type: "FOLD", message: e.message } };
        break;
      }
    }
  }
  return error ? { lines, headCommitId, error: error } : { lines, headCommitId };
};
