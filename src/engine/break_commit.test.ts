import { breakCommit } from "./break_commit.ts";
import { assertEquals } from "std/testing/asserts";

Deno.test("breakCommit #1", () => {
  const actual = breakCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGI" },
    ],
    { lineId: "line_1", index: 4, newLineId: "newline" },
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: "newline", text: "ABCD" },
      { lineId: "newline", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "EFGI" },
    ],
  );
});

Deno.test("breakCommit #2", () => {
  const actual = breakCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGI" },
    ],
    { lineId: "line_2", index: 4, newLineId: "newline" },
  );
  assertEquals(
    actual,
    [
      { lineId: "line_2", nextLineId: "newline", text: "EFGI" },
      { lineId: "newline", nextLineId: null, text: "" },
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
    ],
  );
});

Deno.test("breakCommit #3", () => {
  const actual = breakCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGI" },
    ],
    { lineId: "line_1", index: 2, newLineId: "newline" },
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: "newline", text: "AB" },
      { lineId: "newline", nextLineId: "line_2", text: "CD" },
      { lineId: "line_2", nextLineId: null, text: "EFGI" },
    ],
  );
});
