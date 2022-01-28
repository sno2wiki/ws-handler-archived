import { foldCommit } from "./fold_commit.ts";
import { assertEquals } from "std/testing/asserts";

Deno.test("foldCommit #1", () => {
  const actual = foldCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGI" },
    ],
    { lineId: "line_1", cursor: 4, newLineId: "newline" },
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

Deno.test("foldCommit #2", () => {
  const actual = foldCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGI" },
    ],
    { lineId: "line_2", cursor: 4, newLineId: "newline" },
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


Deno.test("foldCommit #3", () => {
  const actual = foldCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGI" },
    ],
    { lineId: "line_1", cursor: 2, newLineId: "newline" },
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
