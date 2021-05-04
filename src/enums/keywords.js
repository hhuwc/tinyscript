const keywords = [
  "if",
  "else",
  "while",
  "break",
  "var",
  "func",
  "return",
  "for",
];

export const isKeyword = (str) => {
  return keywords.includes(str);
};

export default keywords;
