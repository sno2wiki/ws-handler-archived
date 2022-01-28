export const deleteText = (line: string, cursor: number): string => {
  if (cursor === 0) return line;
  else if (line.length < cursor) return deleteText(line, line.length);
  else return `${line.slice(0, cursor - 1)}${line.slice(cursor)}`;
};
