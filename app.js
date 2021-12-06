const missingNumberCalculator = (equation) => {
  if (typeof equation !== "string") {
    throw new Error("Arguments must be of type String");
  }
  const splitString = stringParser(equation);
  const positions = questionmarkFinder(splitString);
  let result = -1;
  const unknownNumbers = [];
  for (let i = 0; i <= 9; i++) {
    let counter = 0;
    positions.forEach((element) => {
      if (i === 0) {
        unknownNumbers.push(splitString[element]);
      }
      splitString[element] = replaceQuestionmark(unknownNumbers[counter], i);
      counter += 1;
    });
    if (splitString[1] === "+") {
      if (
        parseInt(splitString[0]) + parseInt(splitString[2]) ===
        parseInt(splitString[4])
      ) {
        result = i;
      }
    } else if (splitString[1] === "-") {
      if (
        parseInt(splitString[0]) - parseInt(splitString[2]) ===
        parseInt(splitString[4])
      ) {
        result = i;
      }
    } else {
      if (
        parseInt(splitString[0]) * parseInt(splitString[2]) ===
        parseInt(splitString[4])
      ) {
        result = i;
      }
    }
  }
  return result;
};

const replaceQuestionmark = (questionString, number) => {
  return questionString.replace("?", number);
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
console.log(missingNumberCalculator("123*45?=5?088"));
module.exports = {
  stringParser,
  missingNumberCalculator,
  questionmarkFinder,
  replaceQuestionmark,
};
