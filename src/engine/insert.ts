import { LineType } from "./commits.ts";
export type InsertCommitPayload = { lineId: string; cursor: number; text: string };
export type InsertCommit = { method: "INSERT"; payload: InsertCommitPayload };

export const insertText = (line: string, cursor: number, insert: string): string => {
  return `${line.slice(0, cursor)}${insert}${line.slice(cursor)}`;
};

export const insertCommit = (lines: LineType[], payload: InsertCommitPayload): LineType[] => {
  const index = lines.findIndex((line) => line.lineId === payload.lineId);
  if (index === -1) return lines;
  return [
    {
      ...lines[index],
      text: insertText(lines[index].text, payload.cursor, payload.text),
    },
    ...lines.slice(0, index),
    ...lines.slice(index),
  ];
};
