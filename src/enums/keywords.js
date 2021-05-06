const keywords = [
  "if",
  "else",
  "while",
  "break",
  "continue",
  "for",
  "var",
  "func",
  "return",
];

export const isKeyword = (str) => {
  return keywords.includes(str);
};

export default keywords;
