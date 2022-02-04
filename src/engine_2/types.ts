export type LinesMap = Map<string, { prevLineId: string | null; postLineId: string | null; text: string }>;
export type Result<TReason extends string> =
  & { lines: LinesMap }
  & ({ result: "ok" } | { result: "bad"; reason: TReason });
