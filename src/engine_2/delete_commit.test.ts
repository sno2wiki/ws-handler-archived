import { deleteCommit } from "./delete_commit.ts";
import { assertEquals } from "std/testing/asserts";

Deno.test("deleteCommit #1", () => {
  const actual = deleteCommit(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
    { lineId: "line_1", index: 4 },
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABC" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
  );
});
