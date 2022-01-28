import { insertCommit } from "./insert_commit.ts";
import { assertEquals } from "std/testing/asserts";

Deno.test("insertCommit #1", () => {
  const actual = insertCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
    { lineId: "line_1", cursor: 0, text: "A" },
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: "line_2", text: "A" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
  );
});

Deno.test("insertCommit #2", () => {
  const actual = insertCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
    { lineId: "line_2", cursor: 0, text: "A" },
  );
  assertEquals(
    actual,
    [
      { lineId: "line_2", nextLineId: null, text: "A" },
      { lineId: "line_1", nextLineId: "line_2", text: "" },
    ],
  );
});
