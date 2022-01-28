import { documents } from "./storage.ts";
import { CommitUnion, DocumentType, LineType, ResponseDocument, ResponseDocumentLine } from "../types.ts";

export const parseLines = (lines: LineType[], firstLineId: string): ResponseDocumentLine[] => {
  const firstLine = lines.find((line) => line.lineId === firstLineId);
  if (!firstLine) throw new Error("Something broken");
  const sorted = [firstLine];
  for (let i = 0; i < lines.length; i++) {
    const nextLine = lines.find((line) => line.lineId === sorted[sorted.length - 1].nextLineId);
    if (!nextLine) break;
    sorted.push(nextLine);
  }
  return sorted.map(({ lineId, text }) => ({ lineId, text }));
};
export const parse = (document: DocumentType): ResponseDocument => {
  return {
    id: document.id,
    lines: parseLines(document.lines, document.firstLineId),
    latestCommitId: document.latestCommitId,
  };
};
