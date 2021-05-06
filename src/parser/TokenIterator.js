import { PeekIterator } from "@/utils/iterator";
import { ParserException } from "@/enums/exception";

export class PeekTokenIterator extends PeekIterator {
  nextTextMatch(text) {
    let token = this.next();
    if (token.text !== text) {
      throw new ParserException(token);
    }
    return token;
  }
  nextTypeMatch(type) {
    let token = this.next();
    if (token.type !== type) {
      throw new ParserException(token);
    }
    return token;
  }
}
