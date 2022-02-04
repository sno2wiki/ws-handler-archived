import { LinesMap, Result } from "./types.ts";
import { insertText } from "./insert_text.ts";
export type InsertPayload = { lineId: string; index: number; text: string };
export const insertCommit = (lines: LinesMap, payload: InsertPayload): Result<
  "Target line not found"
> => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) return { lines: lines, result: "bad", reason: "Target line not found" };

  return {
    result: "ok",
    lines: lines.set(payload.lineId, { ...targetLine, text: insertText(targetLine.text, payload.index, payload.text) }),
  };
};
