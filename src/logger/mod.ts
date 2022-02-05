import type { HappenedError } from "../engine/mod.ts";
export const logger = (error: HappenedError) => console.dir(error);
