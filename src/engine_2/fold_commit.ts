import { LinesMap } from "./types.ts";

export type FoldPayload = { lineId: string };
export class FoldCommitError extends Error {
  constructor(
    message:
      | "The target line does not exist"
      | "The line before the target does not exist"
      | "The line after the target does not exist"
      | "Cannot fold at the first line",
  ) {
    super(message);
  }
}
export const foldCommit = (lines: LinesMap, payload: FoldPayload): LinesMap => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) {
    throw new FoldCommitError("The target line does not exist");
  }
  if (!targetLine.prevLineId) {
    throw new FoldCommitError("Cannot fold at the first line");
  }
  const prevLine = lines.get(targetLine.prevLineId);
  if (!prevLine) {
    throw new FoldCommitError("The line before the target does not exist");
  }
  if (targetLine.postLineId && !lines.has(targetLine.postLineId)) {
    throw new FoldCommitError("The line after the target does not exist");
  }

  lines.set(targetLine.prevLineId, {
    ...prevLine,
    postLineId: targetLine.postLineId,
    text: prevLine.text + targetLine.text,
  });
  lines.delete(payload.lineId);
  if (targetLine.postLineId) {
    lines.set(targetLine.postLineId, { ...lines.get(targetLine.postLineId)!, prevLineId: targetLine.prevLineId });
  }

  return lines;
};
