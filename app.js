const missingNumberCalculator = (equation) => {
  if (typeof equation !== "string") {
    throw new Error("Arguments must be of type String");
  }
  const splitString = stringParser(equation);
  const positions = questionmarkFinder(splitString);
  let result = -1;
  for (let i = 0; i <= 9; i++) {
    positions.forEach((element) => {
      splitString[element].replace("?", i);
    });

    switch (splitString[1]) {
      case "+":
        if (splitString[0] + splitString[2] === splitString[4]) {
          result = i;
        }
        break;

      case "-":
        if (splitString[0] - splitString[2] === splitString[4]) {
          result = i;
        }
        break;

      case "*":
        if (splitString[0] * splitString[2] === splitString[4]) {
          result = i;
        }
        break;

      default:
        throw new Error("The argument must be in the form of an equation");
    }
  }
  return result;
};

const questionmarkFinder = (numbersArray) => {
  const positions = [];
  for (let i = 0; i < numbersArray.length; i++) {
    if (numbersArray[i].includes("?")) {
      positions.push(i);
    }
  }
  return positions;
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
  if (firstNumber.length > 2) {
    throw new Error("The equation can only have 1 operator");
  }
  const otherNumbers = firstNumber[1].split("=");
  if (
    Number.isNaN(Number(parseInt(firstNumber[0]))) === true &&
    firstNumber[0].includes("?") === false
  ) {
    throw new Error("The equation must only contain numbers or ?");
  } else if (
    Number.isNaN(Number(parseInt(otherNumbers[0]))) === true &&
    otherNumbers[0].includes("?") === false
  ) {
    throw new Error("The equation must only contain numbers or ?");
  } else if (
    Number.isNaN(Number(parseInt(otherNumbers[1]))) === true &&
    otherNumbers[1].includes("?") === false
  ) {
    throw new Error("The equation must only contain numbers or ?");
  }
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
  questionmarkFinder,
};
