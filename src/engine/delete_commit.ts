import { DeletePayload, LineType } from "./types.ts";
import { deleteText } from "./delete.ts";

export const deleteCommit = (lines: LineType[], payload: DeletePayload): LineType[] => {
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
