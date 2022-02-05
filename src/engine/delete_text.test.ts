import { assertEquals, assertThrows } from "std/testing/asserts";
import { deleteText } from "./delete_text.ts";
Deno.test("空文字列に対して1文字削除", () => {
  const actual = deleteText("", 0);

  assertEquals(actual, "");
});

Deno.test("0文字目を削除しても何も起こらない", () => {
  const actual = deleteText("ABC", 0);

  assertEquals(actual, "ABC");
});

Deno.test("1文字目を削除", () => {
  const actual = deleteText("ABC", 1);

  assertEquals(actual, "BC");
});

Deno.test("2文字目を削除", () => {
  const actual = deleteText("ABC", 2);

  assertEquals(actual, "AC");
});

Deno.test("文字列長番目の文字を挿入", () => {
  const actual = deleteText("ABC", 3);

  assertEquals(actual, "AB");
});

Deno.test("文字列長以上を指定した場合最後の文字を削除", () => {
  const actual = deleteText("ABC", 4);

  assertEquals(actual, "AB");
});
