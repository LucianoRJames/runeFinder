const assert = require("assert");
const { expect } = require("chai");
const app = require("../App");

describe("missingNumberCalculator", function () {
  it("Given the function receives a string it should return an integer", function () {
    assert.equal(typeof app.missingNumberCalculator("1234"), "number");
  });

  it("Given the function receives an argument that is not of type string, it should return a type error", function () {
    assert.throws(
      () => {
        app.missingNumberCalculator(123);
      },
      Error,
      "Type error: arguments must be of type String"
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
    assert.equal(Array.isArray(app.stringParser("1234")), true);
  });

  it("Given the function receives an equation, it should split the string into its components (number 1, operator, number 2, equals sign, number 3) as an array", function () {
    expect(app.stringParser("1*4=?")).to.eql(["1", "*", "4", "=", "?"]);
  });
});
