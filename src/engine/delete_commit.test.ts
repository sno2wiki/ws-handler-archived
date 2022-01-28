import { deleteCommit } from "./delete_commit.ts";
import { assertEquals } from "std/testing/asserts";

Deno.test("deleteCommit #1", () => {
  const actual = deleteCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
    { lineId: "line_1", cursor: 4, },
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABC" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
  );
});

Deno.test("deleteCommit #2", () => {
  const actual = deleteCommit(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "ABCD" },
    ],
    { lineId: "line_2", cursor: 4, },
  );
  assertEquals(
    actual,
    [
      { lineId: "line_2", nextLineId: null, text: "ABC" },
      { lineId: "line_1", nextLineId: "line_2", text: "" },
    ],
  );
});
