import type { HappenedError } from "../engine_2/mod.ts";
export const logger = (error: HappenedError) => console.dir(error);
