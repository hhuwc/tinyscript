import { PeekIterator } from "@/utils/iterator";
import Token, { TokenType } from "@/token";
import * as stringUtils from "@/utils/string";
import * as operators from "@/enums/operator";
import { LexicalException } from "@/enums/exception";

export default class Lexer {
  analyse(source) {
    const iterator = new PeekIterator(source, "\0");
    const tokens = [];
    let ch = undefined;
    while (iterator.hasNext()) {
      ch = iterator.next();
      // 流结束
      if (ch === "\0") {
        break;
      }
      const lookahead = iterator.peek();
      if (stringUtils.isWhiteSpace(ch)) {
        continue;
      }
      if (
        [
          operators.LEFT_BRACKET,
          operators.RIGHT_BRACKET,
          operators.LEFT_PAREN,
          operators.RIGHT_PAREN,
        ].includes(ch)
      ) {
        tokens.push(new Token(TokenType.BRACKET, ch));
        continue;
      }

      if ([operators.DOUBLEQUOTE, operators.SINGLEQUOTE].includes(ch)) {
        iterator.putBack();
        tokens.push(Token.makeString(iterator));
        continue;
      }

      if (stringUtils.isLetter(ch)) {
        iterator.putBack();
        tokens.push(Token.makeVarOrKeyword(iterator));
        continue;
      }

      if (stringUtils.isNumber(ch)) {
        iterator.putBack();
        tokens.push(Token.makeNumber(iterator));
        continue;
      }

      // 处理 3 * -5 ,-5 , 3 + 5 这种上下文有关的情况
      if (["+", "-"].includes(ch) && stringUtils.isNumber(lookahead)) {
        let lastToken = tokens[tokens.length - 1];
        if (!lastToken.isNumber() || lastToken.isOperator()) {
          iterator.putBack();
          tokens.push(Token.makeNumber(iterator));
          continue;
        }
      }

      if (stringUtils.isOperator(ch)) {
        iterator.putBack();
        tokens.push(Token.makeOperator(iterator));
        continue;
      }

      throw new LexicalException(`unexpected char ${ch}`);
    }

    return tokens;
  }
}
