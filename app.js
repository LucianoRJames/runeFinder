const missingNumberCalculator = (equation) => {
  if (typeof equation !== "string") {
    throw new Error("Type error: arguments must be of type String");
  }
  return 1;
};

const stringParser = (equation) => {
  const firstNumber = equation.split("*");
  const otherNumbers = firstNumber[1].split("=");
  const splitArray = [
    firstNumber[0],
    "*",
    otherNumbers[0],
    "=",
    otherNumbers[1],
  ];
  return splitArray;
};
module.exports = {
  stringParser,
  missingNumberCalculator,
};
