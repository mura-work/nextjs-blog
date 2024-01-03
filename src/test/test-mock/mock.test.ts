import { greet, sayGoodbye } from "./mock";

jest.mock("./mock.ts", () => ({
  ...jest.requireActual("./mock.ts"),
  sayGoodbye: (name: string) => `Good bye, ${name}.`,
}));

describe("モックを使用したテスト", () => {
  test("挨拶を返す（本来の実装通り）", () => {
    expect(greet("Taro")).toBe("Hello! Taro.");
  });
  test("さよならを返す（本来の実装ではない）", () => {
    const message = `${sayGoodbye("Taro")} See you.`;
    expect(message).toBe("Good bye, Taro. See you.");
  });
});
