import { LinesMap } from "./types.ts";

export type FoldPayload = { lineId: string };
export const foldCommit = (lines: LinesMap, payload: FoldPayload): LinesMap => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) {
    throw new Error("Target line not found");
  }
  if (!targetLine.prevLineId) {
    throw new Error("Cannot fold first line");
  }
  const prevLine = lines.get(targetLine.prevLineId);
  if (!prevLine) {
    throw new Error("Preveous line not found");
  }
  if (targetLine.postLineId && !lines.has(targetLine.postLineId)) {
    throw new Error("Post line not found");
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
