const CACHE_SIZE = 5;

export class PeekIterator {
  constructor(iteratorable, endToken = "\0") {
    this.iterator = iteratorable?.[Symbol.iterator]?.();
    this.endToken = endToken;

    // 已经访问过的值的缓存队列  push shift pop
    this.cacheQueue = [];
    // 放回栈 push pop
    this.putBackStack = [];
  }
  hasNext() {
    return this.peek() !== undefined;
  }
  peek() {
    // 如果放回栈中有元素
    if (this.putBackStack.length > 0) {
      const val = this.putBackStack.pop();
      this.putBackStack.push(val);
      return val;
    }
    let val = this.next();
    if (val !== undefined) {
      this.putBack();
    }
    return val;
  }
  next() {
    let val;
    if (this.putBackStack.length > 0) {
      val = this.putBackStack.pop();
    } else {
      val = this.iterator.next()?.value;
      if (val === undefined) {
        const temp = this.endToken;
        // 标记下endToken 已经被消费了
        this.endToken = undefined;
        val = temp;
      }
    }
    if (val !== undefined) {
      if (this.cacheQueue.length === CACHE_SIZE) {
        this.cacheQueue.shift();
      }
      this.cacheQueue.push(val);
    }
    return val;
  }
  putBack() {
    // 将队列尾部的值放入 放回栈
    if (this.cacheQueue.length > 0) {
      this.putBackStack.push(this.cacheQueue.pop());
    }
  }
}
