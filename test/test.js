const assert = require("assert");
const { expect } = require("chai");
const app = require("../App");

describe("Calculator", function () {
  it("If the function receives a string it should return an integer", function () {
    assert.equal(typeof app.calculator("1234"), "number");
  });

  it("Given the function receives an impossible equation, it should return -1", function () {
    assert.equal(app.calculator("2-1?=5"), -1);
  });

  it("Given the function receives a valid addition equation, it should return the value of the ?", function () {
    assert.equal(app.calculator("1+1=?"), 2);
  });

  it("Given the function receives a valid subtraction equation, it should return the value of the ?", function () {
    assert.equal(app.calculator("6-3=?"), 3);
  });

  it("Given the function receives a valid multiplication equation, it should return the value of the ?", function () {
    assert.equal(app.calculator("1*4=?"), 4);
  });
});
