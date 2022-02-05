export const insertText = (line: string, index: number, insert: string): string => {
  return `${line.slice(0, index)}${insert}${line.slice(index)}`;
};
