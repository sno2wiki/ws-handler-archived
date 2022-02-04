import { LinesMap, Result } from "./types.ts";
import { deleteText } from "./delete_text.ts";
export type DeletePayload = { lineId: string; index: number };
export const deleteCommit = (lines: LinesMap, payload: DeletePayload): Result<
  "Target line not found"
> => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) return { lines: lines, result: "bad", reason: "Target line not found" };

  return {
    result: "ok",
    lines: lines.set(payload.lineId, { ...targetLine, text: deleteText(targetLine.text, payload.index) }),
  };
};
