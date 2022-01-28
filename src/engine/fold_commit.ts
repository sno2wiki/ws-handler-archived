import { BreakPayload, FoldPayload, InsertPayload, LineType } from "./types.ts";
import { insertText } from "./insert.ts";

export const foldCommit = (lines: LineType[], payload: FoldPayload): LineType[] => {
  const beforeIndex = lines.findIndex((line) => line.nextLineId === payload.lineId);
  const targetIndex = lines.findIndex((line) => line.lineId === payload.lineId);
  if (beforeIndex === -1 || targetIndex === -1) {
    return lines;
  }

  const beforeLine = lines[beforeIndex];
  const targetLine = lines[targetIndex];
  const mergedLine: LineType = {
    lineId: beforeLine.lineId,
    nextLineId: targetLine.nextLineId,
    text: beforeLine.text + targetLine.text,
  };

  delete lines[beforeIndex];
  delete lines[targetIndex];

  return [mergedLine, ...lines].filter(Boolean);
};
