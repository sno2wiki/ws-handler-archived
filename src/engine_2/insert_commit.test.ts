import { insertCommit } from "./insert_commit.ts";
import { assertEquals } from "std/testing/asserts";

Deno.test("insertCommit #1", () => {
  const actual = insertCommit(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
    { lineId: "line_1", index: 0, text: "A" },
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "A" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
  );
});
Deno.test("insertCommit #2", () => {
  const actual = insertCommit(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
    { lineId: "line_1", index: 2, text: "E" },
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABECD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
  );
});

Deno.test("insertCommit #2", () => {
  const actual = insertCommit(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
    { lineId: "line_1", index: 4, text: "E" },
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCDE" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
  );
});
