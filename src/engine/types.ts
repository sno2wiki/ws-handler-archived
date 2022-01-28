export type InsertPayload = { lineId: string; cursor: number; text: string };
export type InsertData = { method: "INSERT"; payload: InsertPayload };

export type DeletePayload = { lineId: string; cursor: number };
export type DeleteData = { method: "DELETE"; payload: DeletePayload };

export type BreakPayload = { lineId: string; cursor: number; newLineId: string };
export type BreakData = { method: "BREAK"; payload: BreakPayload };

export type FoldPayload = { lineId: string };
export type FoldData = { method: "FOLD"; payload: FoldPayload };

export type EditDataUnion =
  | InsertData
  | DeleteData
  | BreakData
  | FoldData;

export type EditCommitType = {
  commitId: string;
  previousCommitId: string;
  type: "EDIT";
  data: EditDataUnion;
};
export type CommitType = EditCommitType;
export type LineType = {
  lineId: string;
  nextLineId: string | null;
  text: string;
};

export type DocumentType = {
  lines: LineType[];
};
