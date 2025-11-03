import {
  checkMoneyInput,
  checkWinningNumbers,
  checkBonusNumber,
} from "../error.js";

// 공통 예외 메시지 상수
const ERROR_MESSAGES = {
  notNumber: "[ERROR] Input Error: Money must be a number",
  notInteger: "[ERROR] Input Error: Money must be an integer",
  notDivisible: "[ERROR] Input Error: Money must be divided by 1000",
  outOfBounds: "[ERROR] Input Error: Number out of bounds",
  notSix: "[ERROR] Input Error: Must be 6 numbers",
  duplicate: "[ERROR] Input Error: Duplicate numbers are not allowed",
};

describe("checkMoneyInput", () => {
  test("throws error when money is not a number", () => {
    expect(() => checkMoneyInput("abc")).toThrow(ERROR_MESSAGES.notNumber);
  });

  test("throws error when money is not an integer", () => {
    expect(() => checkMoneyInput("1000.5")).toThrow(ERROR_MESSAGES.notInteger);
  });

  test("throws error when money is not divisible by 1000", () => {
    expect(() => checkMoneyInput("2500")).toThrow(ERROR_MESSAGES.notDivisible);
  });

  test("passes when money is a valid multiple of 1000", () => {
    expect(() => checkMoneyInput("3000")).not.toThrow();
  });
});

describe("checkWinningNumbers", () => {
  test("throws error when not exactly 6 numbers", () => {
    expect(() => checkWinningNumbers([1, 2, 3, 4, 5])).toThrow(
      ERROR_MESSAGES.notSix
    );
  });

  test("throws error when number is not a number", () => {
    expect(() => checkWinningNumbers([1, 2, 3, 4, 5, "a"])).toThrow(
      ERROR_MESSAGES.notNumber
    );
  });

  test("throws error when number is not an integer", () => {
    expect(() => checkWinningNumbers([1, 2, 3, 4, 5, 6.7])).toThrow(
      ERROR_MESSAGES.notInteger
    );
  });

  test("throws error when number out of bounds (<1 or >45)", () => {
    expect(() => checkWinningNumbers([0, 2, 3, 4, 5, 6])).toThrow(
      ERROR_MESSAGES.outOfBounds
    );
    expect(() => checkWinningNumbers([1, 2, 3, 4, 5, 46])).toThrow(
      ERROR_MESSAGES.outOfBounds
    );
  });

  test("throws error when there are duplicate numbers", () => {
    expect(() => checkWinningNumbers([1, 2, 3, 3, 4, 5])).toThrow(
      ERROR_MESSAGES.duplicate
    );
  });

  test("passes when all numbers are valid", () => {
    expect(() => checkWinningNumbers([1, 2, 3, 4, 5, 6])).not.toThrow();
  });
});

describe("checkBonusNumber", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];

  test("throws error when bonus is not a number", () => {
    expect(() => checkBonusNumber("a", winningNumbers)).toThrow(
      ERROR_MESSAGES.notNumber
    );
  });

  test("throws error when bonus is not an integer", () => {
    expect(() => checkBonusNumber("7.5", winningNumbers)).toThrow(
      ERROR_MESSAGES.notInteger
    );
  });

  test("throws error when bonus is out of bounds", () => {
    expect(() => checkBonusNumber("0", winningNumbers)).toThrow(
      ERROR_MESSAGES.outOfBounds
    );
    expect(() => checkBonusNumber("46", winningNumbers)).toThrow(
      ERROR_MESSAGES.outOfBounds
    );
  });

  test("throws error when bonus number duplicates winning numbers", () => {
    expect(() => checkBonusNumber("3", winningNumbers)).toThrow(
      ERROR_MESSAGES.duplicate
    );
  });

  test("passes when bonus number is valid and unique", () => {
    expect(() => checkBonusNumber("10", winningNumbers)).not.toThrow();
  });
});
