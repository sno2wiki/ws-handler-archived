import { foldCommit } from "./fold_commit.ts";
import { assertEquals } from "std/testing/asserts";

Deno.test("foldCommit #1", () => {
  const actual = foldCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: "line_3", text: "EFGI" },
      { lineId: "line_3", nextLineId: null, text: "JKLM" },
    ],
    { lineId: "line_2" },
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: "line_3", text: "ABCDEFGI" },
      { lineId: "line_3", nextLineId: null, text: "JKLM" },
    ],
  );
});

Deno.test("foldCommit #2", () => {
  const actual = foldCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: "line_3", text: "EFGI" },
      { lineId: "line_3", nextLineId: null, text: "JKLM" },
    ],
    { lineId: "line_3" },
  );
  assertEquals(
    actual,
    [
      { lineId: "line_2", nextLineId: null, text: "EFGIJKLM" },
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
    ],
  );
});
