export const deleteText = (line: string, index: number): string => {
  if (index === 0) return line;
  else if (line.length < index) return deleteText(line, line.length);
  else return `${line.slice(0, index - 1)}${line.slice(index)}`;
};
