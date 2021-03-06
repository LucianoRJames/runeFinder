const assert = require("assert");
const { expect } = require("chai");
const rewire = require("rewire");
const app = rewire("../App");
const getSplitEquation = app.__get__("getSplitEquation");
const getUnknownNumbersPositions = app.__get__("getUnknownNumbersPositions");
const replaceQuestionmark = app.__get__("replaceQuestionmark");

describe("calculateMissingNumber", function () {
  it("Given the function receives a string it should return an integer", function () {
    assert.equal(typeof app.calculateMissingNumber("1+1=?"), "number");
  });

  it("Given the function receives an argument that is not of type string, it should return a type error", function () {
    expect(app.calculateMissingNumber.bind(app, 123)).to.throw(
      "Arguments must be of type String"
    );
  });

  it("Given the function receives an impossible equation, it should return -1", function () {
    assert.equal(app.calculateMissingNumber("2-1?=5"), -1);
  });

  it("Given the function receives a valid addition equation, it should return the value of the ?", function () {
    assert.equal(app.calculateMissingNumber("1+1=?"), 2);
  });

  it("Given the function receives a valid subtraction equation, it should return the value of the ?", function () {
    assert.equal(app.calculateMissingNumber("6-3=?"), 3);
  });

  it("Given the function receives a valid multiplication equation, it should return the value of the ?", function () {
    assert.equal(app.calculateMissingNumber("1*4=?"), 4);
  });
  it("Given that one of the numbers in the equation is greater than 1000000, it should return an error", function () {
    expect(app.calculateMissingNumber.bind(app, "1000001*4=?")).to.throw(
      "Number is too large"
    );
  });
  it("Given that one of the numbers in the equation is less than -1000000, it should return an error", function () {
    expect(app.calculateMissingNumber.bind(app, "-1000001*4=?")).to.throw(
      "Number is too small"
    );
  });
  it("Given the function receives an equation with a negative number, it should return the value of the ?", function () {
    assert.equal(app.calculateMissingNumber("-1*4=-?"), 4);
  });
  it("Given the function receives an equation with a negative number and a subtraction, it should return the value of the ?", function () {
    assert.equal(app.calculateMissingNumber("-1-4=-?"), 5);
  });
  it("Given the function receives an equation with multiple ? values, it should return the value of the ?", function () {
    assert.equal(app.calculateMissingNumber("?+1?=18"), 4);
  });
  it("Given the function receives an equation with ? in the middle of a number, it should return the value of the ?", function () {
    assert.equal(app.calculateMissingNumber("123*45?=5?088"), 6);
  });
  it("Given the function receives an equation which has multiple possible values for ?, it should return the lowest value of the ?", function () {
    assert.equal(app.calculateMissingNumber("11?+0=11?"), 0);
  });
});

describe("getSplitEquation", function () {
  it("Given the function receives a string it should return an array", function () {
    assert.equal(Array.isArray(getSplitEquation("1+1=?")), true);
  });

  it("Given the function receives an multiplication equation, it should split the string into its components (number 1, operator, number 2, equals sign, number 3) as an array", function () {
    expect(getSplitEquation("1*4=?")).to.eql(["1", "*", "4", "=", "?"]);
  });
  it("Given the function receives an substitution equation, it should split the string into its components (number 1, operator, number 2, equals sign, number 3) as an array", function () {
    expect(getSplitEquation("6-3=?")).to.eql(["6", "-", "3", "=", "?"]);
  });
  it("Given the function receives an addidion equation, it should split the string into its components (number 1, operator, number 2, equals sign, number 3) as an array", function () {
    expect(getSplitEquation("1+1=?")).to.eql(["1", "+", "1", "=", "?"]);
  });

  it("Given the function receives an equation that is in the incorrect format, it should return an error", function () {
    expect(getSplitEquation.bind(app, "testString")).to.throw(
      "The string must be in the form of an equation and only contain numbers or ?"
    );
  });

  it("Given the function receives an equation that has multiple operators, it should return an error", function () {
    expect(getSplitEquation.bind(app, "1+1+1=?")).to.throw(
      "The equation can only have 1 operator"
    );
  });

  it("Given the function receives an equation that doesn't contain numbers or ?, it should return an error", function () {
    expect(getSplitEquation.bind(app, "test+string=?")).to.throw(
      "The string must be in the form of an equation and only contain numbers or ?"
    );
  });
});

describe("getUnknownNumbersPositions", function () {
  it("Given the function receives an array , it should return an array", function () {
    assert.equal(
      Array.isArray(getUnknownNumbersPositions(["1", "+", "1", "=", "?"])),
      true
    );
  });

  it("Given a number in the array has a ?, return an array containing the position of the number in the array", function () {
    expect(getUnknownNumbersPositions(["?", "+", "1", "=", "3"])).to.eql([0]);
  });

  it("Given multiple numbers in the array has a ?, return an array containing the position of the numbers in the array", function () {
    expect(getUnknownNumbersPositions(["?", "+", "1?", "=", "3"])).to.eql([
      0, 2,
    ]);
  });
});

describe("replaceQuestionmark", function () {
  it("Given the function receives a string it should return an string", function () {
    assert.equal(typeof replaceQuestionmark("12?", 3), "string");
  });

  it("Given the function receives a string containing a question mark and an integer, it should replace that ? with the integer", function () {
    assert.equal(replaceQuestionmark("12?", 3), "123");
  });
});
