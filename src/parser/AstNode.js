import Token from "@/token";

export const AstNodeType = {
  BLOCK: Symbol("block"), // 代码块
  BINARY_EXPR: Symbol("binary_expr"), // 1+1 二元表达式
  UNITARY_EXPR: Symbol("unitary_expr"), // ++i 一元表达式
  VARIABLE: Symbol("variable"),
  SCALAR: Symbol("scalar"), // 1.0 true
  IF_STMT: Symbol("if_stmt"),
  WHILE_STMT: Symbol("while_stmt"),
  FOR_STMT: Symbol("for_stmt"),
  ASSIGN_STMT: Symbol("assign_stmt"),
  FUNC_STMT: Symbol("func_stmt"),
  DECLARE_STMT: Symbol("declare_stmt"),
};

export default class AstNode {
  /** @type {AstNode[]}*/
  children = [];

  /** @type {AstNode}*/
  parent = null;

  /**
   *  @type {string}
   * 备注标签
   */
  label = "";

  /** @type {Token}*/
  token = null;

  // 节点类型 AstNodeType
  type = null;

  /**
   * @param {AstNode} parent
   * @param {string} label
   */
  constructor(parent, type, label) {
    this.parent = parent;
    this.type = type;
    this.label = label;
  }

  /**
   * @returns {AstNode}
   */
  getChild(index) {
    return this.children[index];
  }

  /**
   * @param {AstNode} child
   */
  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  // 打印调试
  print(indent = 0) {
    let str = this.label?.padStart(indent) + "\n";
    str += this.children?.map((child) => child.print(indent + 1)).join("");
    return str;
  }
}
