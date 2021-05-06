import AstNode, { AstNodeType } from "@/parser/AstNode";

export class Statement extends AstNode {}

// 代码块
export class Block extends Statement {
  /**
   * @param {AstNode} parent
   */
  constructor(parent) {
    super(parent, AstNodeType.BLOCK, "block");
  }
}

export class IfStmt extends Statement {
  /**
   * @param {AstNode} parent
   */
  constructor(parent) {
    super(parent, AstNodeType.IF_STMT, "if");
  }
}

export class DeclareStmt extends Statement {
  /**
   * @param {AstNode} parent
   */
  constructor(parent) {
    super(parent, AstNodeType.DECLARE_STMT, "declare");
  }
}

export class ForStmt extends Statement {
  /**
   * @param {AstNode} parent
   */
  constructor(parent) {
    super(parent, AstNodeType.FOR_STMT, "for");
  }
}

export class FuncStmt extends Statement {
  /**
   * @param {AstNode} parent
   */
  constructor(parent) {
    super(parent, AstNodeType.FUNC_STMT, "func");
  }
}

export class WhileStmt extends Statement {
  /**
   * @param {AstNode} parent
   */
  constructor(parent) {
    super(parent, AstNodeType.WHILE_STMT, "while");
  }
}
