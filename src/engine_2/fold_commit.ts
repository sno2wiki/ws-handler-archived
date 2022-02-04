import { LinesMap, Result } from "./types.ts";

export type FoldPayload = { lineId: string };
export const foldCommit = (lines: LinesMap, payload: FoldPayload): Result<
  | "Target line not found"
  | "Cannot fold first line"
  | "Preveous line not found"
  | "Post line not found"
> => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) return { lines: lines, result: "bad", reason: "Target line not found" };

  if (!targetLine.prevLineId) return { lines: lines, result: "bad", reason: "Cannot fold first line" };
  const prevLine = lines.get(targetLine.prevLineId);
  if (!prevLine) return { lines: lines, result: "bad", reason: "Preveous line not found" };

  if (targetLine.postLineId && !lines.has(targetLine.postLineId)) {
    return {
      lines: lines,
      result: "bad",
      reason: "Post line not found",
    };
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

  return {
    result: "ok",
    lines: lines,
  };
};
