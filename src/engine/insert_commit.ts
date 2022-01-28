import { InsertPayload, LineType } from "../types.ts";
import { insertText } from "./insert.ts";

export const insertCommit = (lines: LineType[], payload: InsertPayload): LineType[] => {
  const index = lines.findIndex((line) => line.lineId === payload.lineId);
  if (index === -1) {
    return lines;
  }
  return [
    {
      ...lines[index],
      text: insertText(lines[index].text, payload.cursor, payload.text),
    },
    ...lines.slice(0, index),
    ...lines.slice(index + 1),
  ];
};
