import { assertEquals } from "std/testing/asserts";
import { processCommits } from "./process_commits.ts";

Deno.test("0コミットを処理する", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
    [],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
  );
});
Deno.test("複数のコミットを処理する #1", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
    [
      { "method": "INSERT", payload: { lineId: "line_1", cursor: 0, text: "A" } },
      { "method": "INSERT", payload: { lineId: "line_1", cursor: 1, text: "B" } },
    ],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: "line_2", text: "AB" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
  );
});

Deno.test("複数のコミットを処理する #2", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
    [
      { "method": "INSERT", payload: { lineId: "line_2", cursor: 0, text: "A" } },
      { "method": "INSERT", payload: { lineId: "line_2", cursor: 1, text: "B" } },
    ],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_2", nextLineId: null, text: "AB" },
      { lineId: "line_1", nextLineId: "line_2", text: "" },
    ],
  );
});

Deno.test("複数のコミットを処理する #3", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
    [
      { "method": "INSERT", payload: { lineId: "line_1", cursor: 0, text: "A" } },
      { "method": "INSERT", payload: { lineId: "line_2", cursor: 0, text: "A" } },
      { "method": "INSERT", payload: { lineId: "line_2", cursor: 1, text: "B" } },
    ],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_2", nextLineId: null, text: "AB" },
      { lineId: "line_1", nextLineId: "line_2", text: "A" },
    ],
  );
});

Deno.test("複数のコミットを処理する #4", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGH" },
    ],
    [
      { "method": "DELETE", payload: { lineId: "line_1", cursor: 3 } },
      { "method": "DELETE", payload: { lineId: "line_1", cursor: 2 } },
    ],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: "line_2", text: "AD" },
      { lineId: "line_2", nextLineId: null, text: "EFGH" },
    ],
  );
});

Deno.test("複数のコミットを処理する #5", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGH" },
    ],
    [
      { "method": "DELETE", payload: { lineId: "line_2", cursor: 3 } },
      { "method": "DELETE", payload: { lineId: "line_2", cursor: 2 } },
    ],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_2", nextLineId: null, text: "EH" },
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
    ],
  );
});

Deno.test("複数のコミットを処理する #6", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGH" },
    ],
    [
      { "method": "DELETE", payload: { lineId: "line_1", cursor: 3 } },
      { "method": "DELETE", payload: { lineId: "line_2", cursor: 3 } },
      { "method": "DELETE", payload: { lineId: "line_2", cursor: 2 } },
    ],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_2", nextLineId: null, text: "EH" },
      { lineId: "line_1", nextLineId: "line_2", text: "ABD" },
    ],
  );
});

Deno.test("複数のコミットを処理する #7", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
    [
      { "method": "INSERT", payload: { lineId: "line_1", cursor: 0, text: "A" } },
      { "method": "INSERT", payload: { lineId: "line_1", cursor: 1, text: "B" } },
      { "method": "DELETE", payload: { lineId: "line_1", cursor: 1 } },
      { "method": "DELETE", payload: { lineId: "line_1", cursor: 1 } },
    ],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
  );
});

Deno.test("複数のコミットを処理する #8", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
    [
      { "method": "INSERT", payload: { lineId: "line_1", cursor: 0, text: "A" } },
      { "method": "INSERT", payload: { lineId: "line_1", cursor: 1, text: "B" } },
      { "method": "INSERT", payload: { lineId: "line_1", cursor: 2, text: "C" } },
      { "method": "INSERT", payload: { lineId: "line_1", cursor: 3, text: "D" } },
      { "method": "BREAK", payload: { lineId: "line_1", cursor: 2, newLineId: "newline" } },
    ],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: "newline", text: "AB" },
      { lineId: "newline", nextLineId: "line_2", text: "CD" },
      { lineId: "line_2", nextLineId: null, text: "" },
    ],
  );
});

Deno.test("複数のコミットを処理する #9", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGH" },
    ],
    [
      { "method": "DELETE", payload: { lineId: "line_2", cursor: 4 } },
      { "method": "DELETE", payload: { lineId: "line_2", cursor: 3 } },
      { "method": "DELETE", payload: { lineId: "line_2", cursor: 2 } },
      { "method": "DELETE", payload: { lineId: "line_2", cursor: 1 } },
      { "method": "FOLD", payload: { lineId: "line_2" } },
    ],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: null, text: "ABCD" },
    ],
  );
});

Deno.test("複数のコミットを処理する #10", () => {
  const actual = processCommits(
    [
      { lineId: "line_1", nextLineId: "line_2", text: "ABCD" },
      { lineId: "line_2", nextLineId: null, text: "EFGH" },
    ],
    [
      { "method": "DELETE", payload: { lineId: "line_2", cursor: 2 } },
      { "method": "DELETE", payload: { lineId: "line_2", cursor: 1 } },
      { "method": "FOLD", payload: { lineId: "line_2" } },
    ],
  );
  assertEquals(
    actual,
    [
      { lineId: "line_1", nextLineId: null, text: "ABCDGH" },
    ],
  );
});
