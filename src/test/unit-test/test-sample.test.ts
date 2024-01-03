import {
  add,
  willSumExceedOneHundred,
  validateTitle,
  wait,
  timeout,
} from "./test-sample";

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

describe("数値の検証", () => {
  test("検証値は期待値と等しい", () => {
    expect(add(10, 20)).toEqual(30);
  });
  test("検証値は期待値より大きい", () => {
    expect(add(10, 20)).toBeGreaterThan(10);
  });
  test("検証値は期待値より小さい", () => {
    expect(add(10, 20)).toBeLessThan(100);
  });
});

describe("検証値が文字列に含まれているか", () => {
  test("検証値が文字列に含まれているか", () => {
    expect("こんにちは、世界").toContain("世界");
  });
  test("期待値が文字列にマッチしているか", () => {
    expect("こんにちは世界").toMatch(/世界/);
  });
});

describe("非同期のテスト", () => {
  test("指定時間待つと経過時間を持ってresolveされる", () => {
    return wait(500).then((duration) => expect(duration).toBe(500));
  });
  test("指定時間待つと、経過時間を持ってresolveされる", async () => {
    await expect(wait(500)).resolves.toBe(500);
  });
  test("指定時間待つと経過時間を持ってrejectされる", async () => {
    return timeout(500).catch((duration) => {
      expect(duration).toBe(500);
    });
  });
  test("指定時間待つと経過時間を持ってrejectされる", async () => {
    return expect(timeout(500)).rejects.toBe(500);
  });
});
