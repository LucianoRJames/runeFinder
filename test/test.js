const assert = require("assert");
const { expect } = require("chai");
const app = require("../App");

describe("missingNumberCalculator", function () {
  it("Given the function receives a string it should return an integer", function () {
    assert.equal(typeof app.missingNumberCalculator("1+1=?"), "number");
  });

  it("Given the function receives an argument that is not of type string, it should return a type error", function () {
    expect(app.missingNumberCalculator.bind(app, 123)).to.throw(
      "Arguments must be of type String"
    );
  });

  it("Given the function receives an impossible equation, it should return -1", function () {
    assert.equal(app.missingNumberCalculator("2-1?=5"), -1);
  });

  it("Given the function receives a valid addition equation, it should return the value of the ?", function () {
    assert.equal(app.missingNumberCalculator("1+1=?"), 2);
  });

  it("Given the function receives a valid subtraction equation, it should return the value of the ?", function () {
    assert.equal(app.missingNumberCalculator("6-3=?"), 3);
  });

  it("Given the function receives a valid multiplication equation, it should return the value of the ?", function () {
    assert.equal(app.missingNumberCalculator("1*4=?"), 4);
  });
});

describe("stringParser", function () {
  it("Given the function receives a string it should return an array", function () {
    assert.equal(Array.isArray(app.stringParser("1+1=?")), true);
  });

  it("Given the function receives an multiplication equation, it should split the string into its components (number 1, operator, number 2, equals sign, number 3) as an array", function () {
    expect(app.stringParser("1*4=?")).to.eql(["1", "*", "4", "=", "?"]);
  });
  it("Given the function receives an substitution equation, it should split the string into its components (number 1, operator, number 2, equals sign, number 3) as an array", function () {
    expect(app.stringParser("6-3=?")).to.eql(["6", "-", "3", "=", "?"]);
  });
  it("Given the function receives an addidion equation, it should split the string into its components (number 1, operator, number 2, equals sign, number 3) as an array", function () {
    expect(app.stringParser("1+1=?")).to.eql(["1", "+", "1", "=", "?"]);
  });

  it("Given the function receives an equation that is in the incorrect format, it should return an error", function () {
    expect(app.stringParser.bind(app, "testString")).to.throw(
      "The string must be in the form of an equation"
    );
  });

  it("Given the function receives an equation that has multiple operators, it should return an error", function () {
    expect(app.stringParser.bind(app, "1+1+1=?")).to.throw(
      "The equation can only have 1 operator"
    );
  });

  it("Given the function receives an equation that doesn't contain numbers or ?, it should return an error", function () {
    expect(app.stringParser.bind(app, "test+string=?")).to.throw(
      "The equation must only contain numbers or ?"
    );
  });
});

describe("questionmarkFinder", function () {
  it("Given the function receives an array , it should return an array", function () {
    assert.equal(
      Array.isArray(app.questionmarkFinder(["1", "+", "1", "=", "?"])),
      true
    );
  });

  it("Given a number in the array has a ?, return an array containing the position of the number in the array", function () {
    expect(app.questionmarkFinder(["?", "+", "1", "=", "3"])).to.eql([0]);
  });

  it("Given multiple numbers in the array has a ?, return an array containing the position of the numbers in the array", function () {
    expect(app.questionmarkFinder(["?", "+", "?", "=", "3"])).to.eql([0, 2]);
  });
});
