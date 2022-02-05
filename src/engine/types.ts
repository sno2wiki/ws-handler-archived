import { InsertPayload } from "./insert_commit.ts";
import { DeletePayload } from "./delete_commit.ts";
import { BreakPayload } from "./break_commit.ts";
import { FoldPayload } from "./fold_commit.ts";

export type LinesMap = Map<string, { prevLineId: string | null; postLineId: string | null; text: string }>;
export type EditCommit = {
  commitId: string;
  data:
    | { method: "INSERT"; payload: InsertPayload }
    | { method: "DELETE"; payload: DeletePayload }
    | { method: "BREAK"; payload: BreakPayload }
    | { method: "FOLD"; payload: FoldPayload };
};

type EditMethodUnion = EditCommit["data"]["method"];

export type HappenedError = {
  commitId: string;
  data: { type: EditMethodUnion; message: string };
};

export type DocumentContent = {
  lines: LinesMap;
  headCommitId: string;
};
