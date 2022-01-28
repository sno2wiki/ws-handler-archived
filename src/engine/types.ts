export type LineType = { lineId: string; nextLineId: string | null; text: string };

export type InsertCommitPayload = { lineId: string; cursor: number; text: string };
export type InsertCommitType = { method: "INSERT"; payload: InsertCommitPayload };

export type DeleteCommitPayload = { lineId: string; cursor: number };
export type DeleteCommitType = { method: "DELETE"; payload: DeleteCommitPayload };

export type EditCommit = InsertCommitType | DeleteCommitType;
