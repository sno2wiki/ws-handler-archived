import { LinesMap } from "./types.ts";
import { deleteText } from "./delete_text.ts";
export type DeletePayload = { lineId: string; index: number };
export const deleteCommit = (lines: LinesMap, payload: DeletePayload): LinesMap => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) throw new Error("Target line not found");

  return lines.set(payload.lineId, { ...targetLine, text: deleteText(targetLine.text, payload.index) });
};
