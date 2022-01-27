import { ulid } from "ulid";
import { nanoid } from "nanoid";

export const createCommitId = () => ulid();
export const createLineId = () => nanoid(16);
