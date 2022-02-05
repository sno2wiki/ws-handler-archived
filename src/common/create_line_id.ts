import { customAlphabet } from "nanoid";

export const createLineId = () =>
  customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
    16,
  )();
