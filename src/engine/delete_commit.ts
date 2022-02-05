import { LinesMap } from "./types.ts";
import { deleteText } from "./delete_text.ts";
export type DeletePayload = { lineId: string; index: number };
export class DeleteCommitError extends Error {
  constructor(
    message: "The target line does not exist",
  ) {
    super(message);
  }
}
export const deleteCommit = (lines: LinesMap, payload: DeletePayload): LinesMap => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) {
    throw new DeleteCommitError(
      "The target line does not exist",
    );
  }

  return lines.set(payload.lineId, { ...targetLine, text: deleteText(targetLine.text, payload.index) });
};
