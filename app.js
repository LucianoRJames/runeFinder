const missingNumberCalculator = (equation) => {
  if (typeof equation !== "string") {
    throw new Error("Arguments must be of type String");
  }
  return 1;
};

const stringParser = (equation) => {
  let operator;
  if (equation.includes("*")) {
    operator = "*";
  } else if (equation.includes("-")) {
    operator = "-";
  } else if (equation.includes("+")) {
    operator = "+";
  } else {
    throw new Error("The string must be in the form of an equation");
  }

  const firstNumber = equation.split(operator);
  const otherNumbers = firstNumber[1].split("=");
  const splitArray = [
    firstNumber[0],
    operator,
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
