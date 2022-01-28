import { LineType } from "./commits.ts";
export type DeleteCommitPayload = { lineId: string; cursor: number };
export type DeleteCommit = { method: "DELETE"; payload: DeleteCommitPayload };

export const deleteText = (line: string, cursor: number): string => {
  if (cursor === 0) return line;
  else if (line.length < cursor) return deleteText(line, line.length);
  else return `${line.slice(0, cursor - 1)}${line.slice(cursor)}`;
};

export const deleteCommit = (lines: LineType[], payload: DeleteCommitPayload): LineType[] => {
  const index = lines.findIndex((line) => line.lineId === payload.lineId);
  if (index === -1) return lines;
  return [
    {
      ...lines[index],
      text: deleteText(lines[index].text, payload.cursor),
    },
    ...lines.slice(0, index),
    ...lines.slice(index),
  ];
};
