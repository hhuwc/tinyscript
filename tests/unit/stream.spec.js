import { PeekIterator } from "@/utils/iterator";

describe("iterator", () => {
  it("test_lookahead", () => {
    const str = "abcdefg";
    const it = new PeekIterator(str);

    expect(it.next()).toBe("a");
    expect(it.peek()).toBe("b");
    expect(it.peek()).toBe("b");
    expect(it.next()).toBe("b");
    expect(it.next()).toBe("c");
    it.putBack();
    it.putBack();
    expect(it.peek()).toBe("b");
    expect(it.next()).toBe("b");
    expect(it.next()).toBe("c");
    expect(it.next()).toBe("d");

    expect(it.hasNext()).toBe(true);
    expect(it.next()).toBe("e");
    expect(it.next()).toBe("f");
    expect(it.next()).toBe("g");
    expect(it.hasNext()).toBe(true);
    expect(it.next()).toBe("\0");
    expect(it.hasNext()).toBe(false);
  });

  it("test_endToken", () => {
    const str = "abcdefg";
    const it = new PeekIterator(str, "\0");
    for (let i = 0; i < 8; i++) {
      if (i == 7) {
        expect(it.next()).toBe("\0");
      } else {
        expect(it.next()).toBe(str[i]);
      }
    }
  });
  it("peek_and_putBack", () => {
    const str = "ab";
    const it = new PeekIterator(str, "\0");
    it.next();
    it.peek();
    it.putBack();
    expect(it.peek()).toBe("a");
    expect(it.next()).toBe("a");
    expect(it.next()).toBe("b");
    it.peek();
    expect(it.next()).toBe("\0");
  });
});
