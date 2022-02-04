import { breakCommit } from "./break_commit.ts";
import { assertEquals } from "std/testing/asserts";

Deno.test("breakCommit #1", () => {
  const actual = breakCommit(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
    { lineId: "line_1", index: 4, newLineId: "newline" },
  );
  assertEquals(actual.result, "ok");
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "newline", text: "ABCD" }],
      ["newline", { prevLineId: "line_1", postLineId: "line_2", text: "" }],
      ["line_2", { prevLineId: "newline", postLineId: null, text: "EFGH" }],
    ]),
  );
});

Deno.test("breakCommit #2", () => {
  const actual = breakCommit(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
    { lineId: "line_2", index: 4, newLineId: "newline" },
  );
  assertEquals(actual.result, "ok");
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: "newline", text: "EFGH" }],
      ["newline", { prevLineId: "line_2", postLineId: null, text: "" }],
    ]),
  );
});

Deno.test("breakCommit #3", () => {
  const actual = breakCommit(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
    { lineId: "line_1", index: 2, newLineId: "newline" },
  );
  assertEquals(actual.result, "ok");
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "newline", text: "AB" }],
      ["newline", { prevLineId: "line_1", postLineId: "line_2", text: "CD" }],
      ["line_2", { prevLineId: "newline", postLineId: null, text: "EFGH" }],
    ]),
  );
});
