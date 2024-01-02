import { add, willSumExceedOneHundred, validateTitle } from "./test-sample";

describe("", () => {
  test("add: 1 + 2 = 3", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("a + b > 100", () => {
    expect(willSumExceedOneHundred(100, 1)).toBe(true);
    expect(willSumExceedOneHundred(100, 0)).toBe(false);
    expect(willSumExceedOneHundred(0, 100)).toBe(false);
    expect(willSumExceedOneHundred(1, 100)).toBe(true);
  });

  test("is throwing error", () => {
    expect(() => add(-10, 100)).toThrow();
    // expectの中身をアロー関数にしないとエラーになる
    // toThrowは「例外が発生する関数」かどうかを判定するので関数を渡す
    // expect(add(-10, 110)).toThrow();
  });

  test("例外がスローされないため失敗する", () => {
    // expect(() => add(70, 80)).toThrow();
  });

  test("タイトルのバリデーション 1文字以上20文字以下になっているか", () => {
    expect(validateTitle("a")).toBeTruthy();
    expect(validateTitle("")).toBeFalsy();
    expect(
      validateTitle("サンプルテキストですサンプルテキストです")
    ).toBeTruthy();
    expect(
      validateTitle("サンプルテキストですサンプルテキストです。")
    ).toBeFalsy();
  });
});
