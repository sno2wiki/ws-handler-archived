export type { DocumentContent, EditCommit, HappenedError, LinesMap } from "../../engine/mod.ts";

export type StorageLine = { id: string; text: string };
export type StorageDocument = { lines: StorageLine[]; headCommitId: string };
