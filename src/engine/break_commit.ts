import { BreakPayload, InsertPayload, LineType } from "../types.ts";
import { insertText } from "./insert.ts";

export const breakCommit = (lines: LineType[], payload: BreakPayload): LineType[] => {
  const index = lines.findIndex((line) => line.lineId === payload.lineId);
  if (index === -1) {
    return lines;
  }
  return [
    {
      lineId: lines[index].lineId,
      nextLineId: payload.newLineId,
      text: lines[index].text.slice(0, payload.cursor),
    },
    {
      lineId: payload.newLineId,
      nextLineId: lines[index].nextLineId,
      text: lines[index].text.slice(payload.cursor),
    },
    ...lines.slice(0, index),
    ...lines.slice(index + 1),
  ];
};
