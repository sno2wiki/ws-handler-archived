import { InsertCommitPayload, LineType, FoldCommitPayload } from "./types.ts";
import { insertText } from "./insert.ts";

export const foldCommit = (lines: LineType[], payload: FoldCommitPayload): LineType[] => {
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
