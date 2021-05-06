import AstNode, { AstNodeType } from "@/parser/AstNode";

// 表达式 一元 多元
export class Expr extends AstNode {
  /**
   * @param {AstNode} parent
   */
  constructor(parent) {
    super(parent);
  }

  /**
   * 表达式语法抽象
   * 左递归形式 left : E(k) -> E(k) op(k) E(k+1) | E(k+1)
   * 右递归形式 right:
   *                  E(k) -> E(k+1) E_(k)
   *                  E_(k) -> op(k) E(k+1) E_(k) | 空集
   */

  /**
   * @param {number} k
   * @returns {AstNode}
   */
  static E(k) {}

  /**
   * @param {number} k
   * @returns {AstNode}
   */
  static E_(k) {}

  static combine() {}
  static race() {}
}
