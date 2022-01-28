import { LineType } from "./commits.ts";
import { deleteText } from "./delete.ts";

export type DeleteCommitPayload = { lineId: string; cursor: number };
export type DeleteCommitType = { method: "DELETE"; payload: DeleteCommitPayload };
export const deleteCommit = (lines: LineType[], payload: DeleteCommitPayload): LineType[] => {
  const index = lines.findIndex((line) => line.lineId === payload.lineId);
  if (index === -1) {
    return lines;
  }
  return [
    {
      ...lines[index],
      text: deleteText(lines[index].text, payload.cursor),
    },
    ...lines.slice(0, index),
    ...lines.slice(index + 1),
  ];
};
