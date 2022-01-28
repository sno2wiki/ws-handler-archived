export const insertText = (line: string, cursor: number, insert: string): string => {
  return `${line.slice(0, cursor)}${insert}${line.slice(cursor)}`;
};
