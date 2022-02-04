import { LinesMap, StorageLine } from "./types.ts";

export const buildLinesMap = (lines: StorageLine[]): LinesMap => {
  const map: LinesMap = new Map();
  lines.forEach(({ id, ...rest }, i) =>
    map.set(id, {
      ...rest,
      prevLineId: 0 < i ? lines[i - 1].id : null,
      postLineId: i < lines.length - 1 ? lines[i + 1].id : null,
    })
  );
  return map;
};
