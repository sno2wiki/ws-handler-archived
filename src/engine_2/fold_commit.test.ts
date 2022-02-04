import { foldCommit } from "./fold_commit.ts";
import { assertEquals } from "std/testing/asserts";

Deno.test("foldCommit #1", () => {
  const actual = foldCommit(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: "line_3", text: "EFGH" }],
      ["line_3", { prevLineId: "line_2", postLineId: null, text: "IJKL" }],
    ]),
    { lineId: "line_2" },
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_3", text: "ABCDEFGH" }],
      ["line_3", { prevLineId: "line_1", postLineId: null, text: "IJKL" }],
    ]),
  );
});

Deno.test("foldCommit #2", () => {
  const actual = foldCommit(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: "line_3", text: "EFGH" }],
      ["line_3", { prevLineId: "line_2", postLineId: null, text: "IJKL" }],
    ]),
    { lineId: "line_3" },
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGHIJKL" }],
    ]),
  );
});

Deno.test("foldCommit #3", () => {
  const actual = foldCommit(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
    { lineId: "line_2" },
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: null, text: "ABCDEFGH" }],
    ]),
  );
});
