export const isLetter = (str) => {
  return /^[a-zA-Z]$/.test(str);
};

export const isNumber = (str) => {
  return /^[0-9]$/.test(str);
};

export const isLiteral = (str) => {
  return /^[_a-zA-Z0-9]$/.test(str);
};

export const isOperator = (str) => {
  return /^[+-\\*/<>=!&|^%,;{}()]$/.test(str);
};

export const isWhiteSpace = (str) => {
  return /^\s$/.test(str);
};
