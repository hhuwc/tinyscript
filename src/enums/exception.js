import Token from "@/token";

export class LexicalException extends Error {}

export class ParserException extends Error {
  /**
   * @param {Token|string} message
   */
  constructor(message) {
    super();
    if (typeof message === "string") {
      this.message = message;
    }
    // 参数重载
    if (message instanceof Token) {
      this.message = `Syntax Error, unexpected token ${message.text}`;
    }
  }
}
