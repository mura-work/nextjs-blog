import { add, willSumExceedOneHundred } from "./test-sample";

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
});
