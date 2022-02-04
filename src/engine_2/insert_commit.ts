import { LinesMap } from "./types.ts";
import { insertText } from "./insert_text.ts";
export type InsertPayload = { lineId: string; index: number; text: string };
export const insertCommit = (lines: LinesMap, payload: InsertPayload): LinesMap => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) throw new Error("Target line not found");

  return lines.set(payload.lineId, { ...targetLine, text: insertText(targetLine.text, payload.index, payload.text) });
};
