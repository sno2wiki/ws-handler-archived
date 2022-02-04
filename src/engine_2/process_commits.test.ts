import { assertEquals } from "std/testing/asserts";
import { processCommits } from "./process_commits.ts";

Deno.test("process 0 commit", () => {
  const actual = processCommits(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
    "commit_0",
    [],
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
  );
  assertEquals(
    actual.headCommitId,
    "commit_0",
  );
});

Deno.test("process single commit #1", () => {
  const actual = processCommits(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
    "commit_0",
    [
      {
        commitId: "commit_1",
        data: { "method": "INSERT", payload: { lineId: "line_1", index: 0, text: "A" } },
      },
    ],
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "A" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
  );
  assertEquals(
    actual.headCommitId,
    "commit_1",
  );
});

Deno.test("process single commit but failed #1", () => {
  const actual = processCommits(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
    "commit_0",
    [
      {
        commitId: "commit_1",
        data: { "method": "FOLD", payload: { lineId: "line_1" } },
      },
    ],
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
  );
  assertEquals(
    actual.headCommitId,
    "commit_0",
  );
  assertEquals(
    actual.error,
    { commitId: "commit_1", data: { type: "FOLD", message: "Cannot fold at the first line" } },
  );
});

Deno.test("process multiple commits #1", () => {
  const actual = processCommits(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
    "commit_0",
    [
      {
        commitId: "commit_1",
        data: { "method": "INSERT", payload: { lineId: "line_1", index: 0, text: "A" } },
      },
      {
        commitId: "commit_2",
        data: { "method": "INSERT", payload: { lineId: "line_1", index: 1, text: "B" } },
      },
    ],
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "AB" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "" }],
    ]),
  );
  assertEquals(
    actual.headCommitId,
    "commit_2",
  );
});

Deno.test("process multiple commits #2", () => {
  const actual = processCommits(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
    "commit_0",
    [
      {
        commitId: "commit_1",
        data: { "method": "DELETE", payload: { lineId: "line_1", index: 4 } },
      },
      {
        commitId: "commit_2",
        data: { "method": "DELETE", payload: { lineId: "line_1", index: 3 } },
      },
    ],
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "AB" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
  );
  assertEquals(
    actual.headCommitId,
    "commit_2",
  );
});

Deno.test("process multiple commits #3", () => {
  const actual = processCommits(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
    "commit_0",
    [
      {
        commitId: "commit_1",
        data: { "method": "INSERT", payload: { lineId: "line_1", index: 0, text: "A" } },
      },
      {
        commitId: "commit_2",
        data: { "method": "INSERT", payload: { lineId: "line_1", index: 1, text: "B" } },
      },
      {
        commitId: "commit_3",
        data: { "method": "DELETE", payload: { lineId: "line_1", index: 2 } },
      },
      {
        commitId: "commit_4",
        data: { "method": "DELETE", payload: { lineId: "line_1", index: 1 } },
      },
    ],
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
  );
  assertEquals(
    actual.headCommitId,
    "commit_4",
  );
});

Deno.test("process multiple commits #4", () => {
  const actual = processCommits(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
    "commit_0",
    [
      {
        commitId: "commit_1",
        data: { "method": "DELETE", payload: { lineId: "line_2", index: 2 } },
      },
      {
        commitId: "commit_2",
        data: { "method": "DELETE", payload: { lineId: "line_2", index: 1 } },
      },
      {
        commitId: "commit_3",
        data: { "method": "FOLD", payload: { lineId: "line_2" } },
      },
    ],
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: null, text: "ABCDGH" }],
    ]),
  );
  assertEquals(
    actual.headCommitId,
    "commit_3",
  );
});

Deno.test("process multiple commits #5", () => {
  const actual = processCommits(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
    "commit_0",
    [
      {
        commitId: "commit_1",
        data: { "method": "BREAK", payload: { lineId: "line_1", index: 2, newLineId: "newline_1" } },
      },
      {
        commitId: "commit_2",
        data: { "method": "BREAK", payload: { lineId: "newline_1", index: 0, newLineId: "newline_2" } },
      },
    ],
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: "newline_1", text: "AB" }],
      ["newline_1", { prevLineId: "line_1", postLineId: "newline_2", text: "" }],
      ["newline_2", { prevLineId: "newline_1", postLineId: "line_2", text: "CD" }],
      ["line_2", { prevLineId: "newline_2", postLineId: null, text: "EFGH" }],
    ]),
  );
  assertEquals(
    actual.headCommitId,
    "commit_2",
  );
});

Deno.test("process multiple commits but failed #1", () => {
  const actual = processCommits(
    new Map([
      ["line_1", { prevLineId: null, postLineId: "line_2", text: "ABCD" }],
      ["line_2", { prevLineId: "line_1", postLineId: null, text: "EFGH" }],
    ]),
    "commit_0",
    [
      {
        commitId: "commit_1",
        data: { "method": "DELETE", payload: { lineId: "line_2", index: 2 } },
      },
      {
        commitId: "commit_2",
        data: { "method": "DELETE", payload: { lineId: "line_2", index: 1 } },
      },
      {
        commitId: "commit_3",
        data: { "method": "FOLD", payload: { lineId: "line_2" } },
      },
      {
        commitId: "commit_4",
        data: { "method": "FOLD", payload: { lineId: "line_1" } },
      },
    ],
  );
  assertEquals(
    actual.lines,
    new Map([
      ["line_1", { prevLineId: null, postLineId: null, text: "ABCDGH" }],
    ]),
  );
  assertEquals(
    actual.headCommitId,
    "commit_3",
  );
  assertEquals(
    actual.error,
    { commitId: "commit_4", data: { type: "FOLD", message: "Cannot fold at the first line" } },
  );
});
