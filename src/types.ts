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

export type InitCommitType = {
  commitId: string;
  previousCommitId: null;
  type: "INIT";
};
export type CommitUnion = InitCommitType | EditCommitType;
export type LineType = {
  lineId: string;
  nextLineId: string | null;
  text: string;
};

export type DocumentType = {
  id: string;
  lines: LineType[];
  firstLineId: LineType["lineId"];
  latestCommitId: CommitUnion["commitId"];
};

export type ResponseDocumentLine = { lineId: string; text: string };
export type ResponseDocument = {
  id: string;
  lines: ResponseDocumentLine[];
  latestCommitId: DocumentType["latestCommitId"];
};
