import { LinesMap } from "./types.ts";

export type BreakPayload = { lineId: string; index: number; newLineId: string };
export const breakCommit = (lines: LinesMap, payload: BreakPayload): LinesMap => {
  const targetLine = lines.get(payload.lineId);
  if (!targetLine) throw new Error("Target line not found");

  if (!targetLine.postLineId) {
    return lines.set(
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
    );
  } else {
    const postLine = lines.get(targetLine.postLineId);
    if (!postLine) throw new Error("Post target line not found");

    return lines.set(
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
    );
  }
};
