import { PeekIterator } from "@/utils/iterator";
import Token, { TokenType } from "@/token";
import { LexicalException } from "@/enums/exception";
import Lexer from "@/lexer";

describe("lexer test", () => {
  it("test makeVarOrKeyword", () => {
    const it = new PeekIterator("if abc", "\0");
    const token1 = Token.makeVarOrKeyword(it);
    const token2 = Token.makeVarOrKeyword(it);

    expect(token1.type).toBe(TokenType.KEYWORD);
    expect(token2.type).toBe(TokenType.VARIABLE);

    const it1 = new PeekIterator("true abc", "\0");
    const token3 = Token.makeVarOrKeyword(it1);
    const token4 = Token.makeVarOrKeyword(it1);

    expect(token3.type).toBe(TokenType.BOOLEAN);
    expect(token3.text).toBe("true");
    expect(token4.type).toBe(TokenType.VARIABLE);
  });

  it("test make correct string ", () => {
    const strings = ['"123"', "'hahaha'"];

    for (const str of strings) {
      const it1 = new PeekIterator(str, "\0");
      const token = Token.makeString(it1);
      expect(token.type).toBe(TokenType.STRING);
    }
  });
  it("test make wrong string ", () => {
    const strings = ['"123', "'hahaha"];

    for (const str of strings) {
      const it1 = new PeekIterator(str, "\0");
      const t = () => {
        Token.makeString(it1);
      };
      expect(t).toThrow(LexicalException);
    }
  });
  it("test operator ", () => {
    const strings = [
      ",",
      ";",
      "+",
      "++",
      "+=",
      "--",
      "-=",
      "*",
      "*=",
      "/",
      "/=",
      ">",
      ">>",
      ">=",
      "&",
      "&&",
      "&=",
    ];

    for (const str of strings) {
      const it1 = new PeekIterator(str, "\0");
      const token = Token.makeOperator(it1);
      expect(token.type).toBe(TokenType.OPERATOR);
      expect(token.text).toBe(str);
    }
  });
  it("test number", () => {
    const strings = ["100 aaa", "-50 bbb", "0.50ccc", "-100.50*13"];
    const results = ["100", "-50", "0.50", "-100.50"];

    for (let index = 0; index < strings.length; index++) {
      const it1 = new PeekIterator(strings[index], "\0");
      const token = Token.makeNumber(it1);
      expect(token.text).toBe(results[index]);

      expect(token.type).toBe(
        results[index].includes(".") ? TokenType.FLOAT : TokenType.INT
      );
    }
  });
  it("test wrong number", () => {
    const strings = ["+", ".100", "50.00.00", "100.", "10.."];

    for (const str of strings) {
      const it1 = new PeekIterator(str, "\0");
      const t = () => {
        Token.makeNumber(it1);
      };
      expect(t).toThrow(LexicalException);
    }
  });

  it("test expression", () => {
    const source = "(a+b)^100.12 == +100 * -20";
    const lexer = new Lexer();
    const tokens = lexer.analyse(source);

    const result = [
      "(",
      "a",
      "+",
      "b",
      ")",
      "^",
      "100.12",
      "==",
      "+100",
      "*",
      "-20",
    ];

    for (let index = 0; index < tokens.length; index++) {
      expect(tokens[index].text).toBe(result[index]);
    }
    console.log(tokens);
  });

  it("test func", () => {
    const source = `func(a,b){
      var a = -100 +20
      return a
    }`;
    const lexer = new Lexer();
    const tokens = lexer.analyse(source);
    const result = [
      "func",
      "(",
      "a",
      ",",
      "b",
      ")",
      "{",
      "var",
      "a",
      "=",
      "-100",
      "+",
      "20",
      "return",
      "a",
      "}",
    ];

    for (let index = 0; index < tokens.length; index++) {
      expect(tokens[index].text).toBe(result[index]);
    }
    console.log(tokens);
  });
});
