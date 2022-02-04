import { LinesMap, Result } from "./types.ts";

export type BreakPayload = { lineId: string; index: number; newLineId: string };
export const breakCommit = (lines: LinesMap, payload: BreakPayload): Result<
  | "Target line not found"
  | "Post target line not found"
> => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) return { lines: lines, result: "bad", reason: "Target line not found" };

  if (!targetLine.postLineId) {
    return {
      result: "ok",
      lines: lines.set(
        payload.lineId,
        {
          ...targetLine,
          postLineId: payload.newLineId,
          text: targetLine.text.slice(0, payload.index),
        },
      ).set(
        payload.newLineId,
        {
          prevLineId: payload.lineId,
          postLineId: null,
          text: targetLine.text.slice(payload.index),
        },
      ),
    };
  } else {
    const postLine = lines.get(targetLine.postLineId);
    if (!postLine) return { lines: lines, result: "bad", reason: "Post target line not found" };

    return {
      result: "ok",
      lines: lines.set(
        payload.lineId,
        {
          ...targetLine,
          postLineId: payload.newLineId,
          text: targetLine.text.slice(0, payload.index),
        },
      ).set(
        payload.newLineId,
        {
          prevLineId: payload.lineId,
          postLineId: targetLine.postLineId,
          text: targetLine.text.slice(payload.index),
        },
      ).set(
        targetLine.postLineId,
        {
          ...postLine,
          prevLineId: payload.newLineId,
        },
      ),
    };
  }
};
