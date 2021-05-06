import AstNode, { AstNodeType } from "@/parser/AstNode";
import { PeekTokenIterator } from "@/parser/TokenIterator";
import { TokenType } from "@/token";

// 因子就是操作两边可以用于计算的
export class Factor extends AstNode {
  /**
   * @param {AstNode} parent
   * @param {PeekTokenIterator} iterator
   */
  constructor(parent, iterator) {
    super(parent);
    let token = iterator.next();

    if (token.type === TokenType.VARIABLE) {
      this.type = AstNodeType.VARIABLE;
    } else {
      this.type = AstNodeType.SCALAR;
    }

    this.token = token;
    this.label = token.text;
  }
}

export class Variable extends Factor {}

export class Scalar extends Factor {}
