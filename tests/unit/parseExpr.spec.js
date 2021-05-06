import { PeekTokenIterator } from "@/parser/TokenIterator";
import AstNode from "@/parser/AstNode";
import { Expr } from "@/parser/Expr";
import { Scalar } from "@/parser/Factor";
import Lexer from "@/lexer";
import { PeekIterator } from "@/utils/iterator";

// 求解 1+2+3 这种
// Expr -> digit + Expr | digit

class SimpleParser {
  /**
   * @param {PeekTokenIterator} iterator
   */
  static parse(iterator) {
    let expr = new Expr(null);
    // 右递归形式先吃掉一个token
    let scalar = new Scalar(expr, iterator);
    // 基准条件
    if (!iterator.hasNext()) {
      return scalar;
    }
    const op = iterator.next();
    // 递归条件
    expr.label = op.text;
    expr.token = op;
    expr.addChild(scalar);

    const nextExpr = this.parse(iterator);
    expr.addChild(nextExpr);

    return expr;
  }
}

describe("parser simple expr", () => {
  it("test 1+2-4", () => {
    const source = "1 + 2 -  4";
    const lexer = new Lexer();
    const tokens = lexer.analyse(source);

    const iterator = new PeekTokenIterator(tokens);

    const exprs = SimpleParser.parse(iterator);

    console.log(exprs.print());
  });
});
