const calculateMissingNumber = (equation) => {
  if (typeof equation !== "string") {
    throw new Error("Arguments must be of type String");
  }
  const upperNumberLimit = 1000000;
  const lowerNumberLimit = -1000000;
  const maxPossibleNumber = 9;
  const splitEquation = getSplitEquation(equation);
  const unknownNumbersPositions = getUnknownNumbersPositions(splitEquation);
  const operator = splitEquation[1];
  const unknownNumbers = [];
  let result = -1;
  unknownNumbersPositions.forEach((index) => {
    unknownNumbers.push(splitEquation[index]);
  });
  for (let i = 0; i <= maxPossibleNumber; i += 1) {
    let counter = 0;
    unknownNumbersPositions.forEach((element) => {
      splitEquation[element] = replaceQuestionmark(unknownNumbers[counter], i);
      counter += 1;
    });
    const firstNumber = splitEquation[0];
    const secondNumber = splitEquation[2];
    const thirdNumber = splitEquation[4];
    if (
      parseInt(firstNumber) > upperNumberLimit ||
      parseInt(secondNumber) > upperNumberLimit ||
      parseInt(thirdNumber) > upperNumberLimit
    ) {
      throw new Error("Number is too large");
    } else if (
      parseInt(firstNumber) < lowerNumberLimit ||
      parseInt(secondNumber) < lowerNumberLimit ||
      parseInt(thirdNumber) < lowerNumberLimit
    ) {
      throw new Error("Number is too small");
    }
    if (operator === "+") {
      if (
        parseInt(firstNumber) + parseInt(secondNumber) ===
        parseInt(thirdNumber)
      ) {
        result = i;
        break;
      }
    } else if (operator === "-") {
      if (
        parseInt(firstNumber) - parseInt(secondNumber) ===
        parseInt(thirdNumber)
      ) {
        result = i;
        break;
      }
    } else {
      if (
        parseInt(firstNumber) * parseInt(secondNumber) ===
        parseInt(thirdNumber)
      ) {
        result = i;
        break;
      }
    }
  }
  return result;
};

const replaceQuestionmark = (questionString, number) => {
  return questionString.replace("?", number);
};

const getUnknownNumbersPositions = (numbersArray) => {
  const unknownNumbersPositions = [];
  for (let i = 0; i < numbersArray.length; i += 1) {
    if (numbersArray[i].includes("?")) {
      unknownNumbersPositions.push(i);
    }
  }
  return unknownNumbersPositions;
};

const getSplitEquation = (equation) => {
  let operator;
  const maxPossibleNumbers = 3;
  const multiplicationRegex = /-?[0-9|?]+[*]-?[0-9|?]+=-?[0-9|?]+/;
  const subtractionRegex = /-?[0-9|?]+[\-]-?[0-9|?]+=-?[0-9|?]+/;
  const additionRegex = /-?[0-9|?]+[+]-?[0-9|?]+=-?[0-9|?]+/;
  const numberRegex = /-?[0-9|?]+/g;
  const secondNumberCheckRegex = /[0-9|?]-[0-9|?]/g;
  if (multiplicationRegex.test(equation)) {
    operator = "*";
  } else if (additionRegex.test(equation)) {
    operator = "+";
  } else if (subtractionRegex.test(equation)) {
    operator = "-";
  } else {
    throw new Error(
      "The string must be in the form of an equation and only contain numbers or ?"
    );
  }
  const equationsplitIntoNumbers = equation.match(numberRegex);
  if (equationsplitIntoNumbers.length > maxPossibleNumbers) {
    throw new Error("The equation can only have 1 operator");
  }
  const firstNumber = equationsplitIntoNumbers[0];
  let secondNumber = equationsplitIntoNumbers[1];
  if (secondNumberCheckRegex.test(equation)) {
    secondNumber = secondNumber.substring(1);
  }
  const thirdNumber = equationsplitIntoNumbers[2];
  if (
    Number.isNaN(Number(parseInt(firstNumber))) &&
    firstNumber.includes("?") === false
  ) {
    throw new Error("The equation must only contain numbers or ?");
  } else if (
    Number.isNaN(Number(parseInt(secondNumber))) &&
    secondNumber.includes("?") === false
  ) {
    throw new Error("The equation must only contain numbers or ?");
  } else if (
    Number.isNaN(Number(parseInt(thirdNumber))) &&
    thirdNumber.includes("?") === false
  ) {
    throw new Error("The equation must only contain numbers or ?");
  }
  const splitEquation = [firstNumber, operator, secondNumber, "=", thirdNumber];
  return splitEquation;
};
module.exports = {
  calculateMissingNumber,
};
