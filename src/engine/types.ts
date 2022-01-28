export type LineType = { lineId: string; nextLineId: string | null; text: string };

export type InsertCommitPayload = { lineId: string; cursor: number; text: string };
export type InsertCommitType = { method: "INSERT"; payload: InsertCommitPayload };

export type DeleteCommitPayload = { lineId: string; cursor: number };
export type DeleteCommitType = { method: "DELETE"; payload: DeleteCommitPayload };

export type FoldCommitPayload = { lineId: string; cursor: number; newLineId: string };
export type FoldCommitType = { method: "FOLD"; payload: FoldCommitPayload };

export type EditCommit = InsertCommitType | DeleteCommitType | FoldCommitType;
