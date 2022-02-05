import { LinesMap } from "./types.ts";
import { insertText } from "./insert_text.ts";
export type InsertPayload = { lineId: string; index: number; text: string };
export class InsertCommitError extends Error {
  constructor(
    message: "The target line does not exist",
  ) {
    super(message);
  }
}
export const insertCommit = (lines: LinesMap, payload: InsertPayload): LinesMap => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) {
    throw new InsertCommitError(
      "The target line does not exist",
    );
  }

  return lines.set(payload.lineId, { ...targetLine, text: insertText(targetLine.text, payload.index, payload.text) });
};
