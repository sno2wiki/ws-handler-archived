import { DocumentContent, LinesMap } from "./types.ts";

export const simplifyLinesMap = (map: LinesMap): { id: string; text: string }[] => {
  const lines = [...map.entries()].map(([lineId, rest]) => ({ lineId, ...rest }));
  const firstLine = lines.find(({ prevLineId }) => prevLineId === null);
  if (!firstLine) throw new Error("First line does not exist");

  const sorted = [firstLine];
  for (let i = 0; i < lines.length - 1; i++) {
    const nextLineId = sorted[i].postLineId;
    if (!nextLineId) throw new Error("Next line id does not exist");
    const nextLine = lines.find(({ lineId }) => lineId === nextLineId);
    if (!nextLine) throw new Error("Next line does not exist");
    sorted.push(nextLine);
  }

  return sorted.map(({ lineId, text }) => ({ text, id: lineId }));
};

export const simplifyContent = (content: DocumentContent) => {
  return {
    headCommitId: content.headCommitId,
    lines: simplifyLinesMap(content.lines),
  };
};
