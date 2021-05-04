import { PeekIterator } from "@/utils/iterator";
import { isLiteral, isNumber } from "@/utils/string";
import { isKeyword } from "@/enums/keywords";
import { LexicalException } from "@/enums/exception";

export const TokenType = {
  KEYWORD: Symbol("keyword"),
  VARIABLE: Symbol("variable"),
  OPERATOR: Symbol("operator"),
  BRACKET: Symbol("bracket"),
  PAREN: Symbol("parentheses"),
  STRING: Symbol("string"),
  FLOAT: Symbol("float"),
  INT: Symbol("int"),
  BOOLEAN: Symbol("boolean"),
};

export default class Token {
  constructor(type, text) {
    this.type = type;
    this.text = text;
  }

  toString() {
    return `type ${this.type.toString()}, text ${this.text}`;
  }

  isVariable() {
    return this.type === TokenType.VARIABLE;
  }

  isNumber() {
    return this.type === TokenType.INT || this.type === TokenType.FLOAT;
  }

  isOperator() {
    return this.type === TokenType.OPERATOR;
  }

  isScalar() {
    return [
      TokenType.BOOLEAN,
      TokenType.INT,
      TokenType.FLOAT,
      TokenType.STRING,
    ].includes(this.type);
  }

  /**
   * @param {PeekIterator} iterator
   */
  static makeVarOrKeyword(iterator) {
    let s = "";
    while (iterator.hasNext()) {
      const lookahead = iterator.peek();
      if (isLiteral(lookahead)) {
        s += lookahead;
        iterator.next();
      } else {
        break;
      }
    }

    // 判断是关键词还是变量
    if (isKeyword(s)) {
      return new Token(TokenType.KEYWORD, s);
    }

    if (s === "true" || s === "false") {
      return new Token(TokenType.BOOLEAN, s);
    }

    return new Token(TokenType.VARIABLE, s);
  }

  /**
   * @param {PeekIterator} iterator
   */
  static makeString(iterator) {
    let str = "";
    // 初始状态
    let state = 0;
    let ch = undefined;
    const DoubleQuote = '"';
    const SingleQuote = "'";
    while (iterator.hasNext()) {
      ch = iterator.next();
      switch (state) {
        case 0:
          if (ch === DoubleQuote) {
            state = 1;
          } else if (ch === SingleQuote) {
            state = 2;
          }
          str += ch;
          break;

        case 1:
          if (ch === DoubleQuote) {
            return new Token(TokenType.STRING, str + ch);
          } else {
            str += ch;
          }
          break;
        case 2:
          if (ch === SingleQuote) {
            return new Token(TokenType.STRING, str + ch);
          } else {
            str += ch;
          }
          break;
      }
    }
    throw new LexicalException(`unexpected char ${ch}`);
  }

  /**
   * @param {PeekIterator} iterator
   */
  static makeOperator(iterator) {
    let str = "";
    let state = 0;
    let ch = undefined;
    while (iterator.hasNext()) {
      ch = iterator.next();
      switch (state) {
        case 0:
          switch (ch) {
            case ",":
            case ";":
              return new Token(TokenType.OPERATOR, ch);
            // x xx x= 形式操作符
            case "+":
            case "-":
            case ">":
            case "<":
            case "|":
            case "&":
              str += ch;
              state = 1;
              break;
            // x x= 形式操作符
            case "*":
            case "/":
            case "^":
            case "%":
            case "!":
            case "=":
              str += ch;
              state = 2;
              break;
            default:
              break;
          }
          break;
        case 1: {
          if (ch === "=" || str[str.length - 1] === ch) {
            return new Token(TokenType.OPERATOR, str + ch);
          } else {
            iterator.putBack();
            return new Token(TokenType.OPERATOR, str);
          }
        }
        case 2: {
          if (ch === "=") {
            return new Token(TokenType.OPERATOR, str + ch);
          } else {
            iterator.putBack();
            return new Token(TokenType.OPERATOR, str);
          }
        }
      }
    }
    throw new LexicalException(`unexpected char ${ch}`);
  }

  /**
   * @param {PeekIterator} iterator
   * 仅仅支持 0.111 1000 1000.33 三种数字 小数点前面的0 不可以省略
   */
  static makeNumber(iterator) {
    let str = "";
    // 初始状态
    let state = 0;
    let ch = undefined;
    while (iterator.hasNext()) {
      ch = iterator.peek();
      switch (state) {
        case 0:
          {
            if (isNumber(ch)) {
              str += ch;
              state = 1;
              iterator.next();
            } else if (ch === "+" || ch === "-") {
              str += ch;
              state = 2;
              iterator.next();
            } else {
              throw new LexicalException(`unexpected char ${ch}`);
            }
          }
          break;
        case 1:
          {
            if (isNumber(ch)) {
              str += ch;
              iterator.next();
            } else if (ch === ".") {
              state = 3;
              str += ch;
              iterator.next();
            } else {
              return new Token(TokenType.INT, str);
            }
          }
          break;
        case 2:
          {
            if (isNumber(ch)) {
              str += ch;
              state = 1;
              iterator.next();
            } else {
              throw new LexicalException(`unexpected char ${ch}`);
            }
          }
          break;
        case 3:
          {
            if (isNumber(ch)) {
              str += ch;
              iterator.next();
            } else if (
              ch === "." ||
              (str[str.length - 1] === "." && !isNumber(ch)) // 100.  100..
            ) {
              throw new LexicalException(`unexpected char ${ch}`);
            } else {
              return new Token(TokenType.FLOAT, str);
            }
          }
          break;
      }
    }
    throw new LexicalException(`unexpected char ${ch}`);
  }
}
