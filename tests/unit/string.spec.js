import { isLetter, isNumber, isOperator, isLiteral } from "@/utils/string";

describe("stringUtils", () => {
  it("test stringUtils", () => {
    expect(isLetter("a")).toBeTruthy();
    expect(isOperator("*")).toBeTruthy();
    expect(isOperator("/")).toBeTruthy();
    expect(isNumber("1")).toBeTruthy();
    expect(isNumber("n")).toBeFalsy();
    expect(isLiteral("1")).toBeTruthy();
    expect(isLiteral("_")).toBeTruthy();
    expect(isLiteral("*")).toBeFalsy();
  });
});
