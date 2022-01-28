import { assertEquals, assertThrows } from "std/testing/asserts";
import { insert } from "./insert.ts";
Deno.test("空文字列に対して文字を挿入", () => {
  const actual = insert("", 0, "A");

  assertEquals(actual, "A");
});

Deno.test("カーソル位置が0で0文字目に文字を挿入", () => {
  const actual = insert("ABC", 0, "D");

  assertEquals(actual, "DABC");
});

Deno.test("カーソル位置が1で文字を挿入", () => {
  const actual = insert("ABC", 1, "D");

  assertEquals(actual, "ADBC");
});

Deno.test("カーソル位置が文字列長と同じで文字を挿入", () => {
  const actual = insert("ABC", 3, "D");

  assertEquals(actual, "ABCD");
});

Deno.test("カーソル位置が文字列長以上の場合最後に挿入", () => {
  const actual = insert("ABC", 4, "D");

  assertEquals(actual, "ABCD");
});
