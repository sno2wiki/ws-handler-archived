import { DocumentContent, LinesMap } from "./types.ts";

export const simplifyLinesMap = (lines: LinesMap): { id: string; text: string }[] => {
  return [];
};

export const simplifyContent = (content: DocumentContent) => {
  return {
    headCommitId: content.headCommitId,
    lines: simplifyLinesMap(content.lines),
  };
};
