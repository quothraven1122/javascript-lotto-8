export const checkMoneyInput = (num) => {
  const money = Number(num);
  if (isNaN(money))
    throw new Error("[ERROR] Input Error: Money must be a number");
  if (!Number.isInteger(money))
    throw new Error("[ERROR] Input Error: Money must be an integer");
  if (money % 1000 !== 0)
    throw new Error("[ERROR] Input Error: Money must be divided by 1000");
};
export const checkWinningNumbers = (winningNumbers) => {
  if (winningNumbers.length !== 6)
    throw new Error("[ERROR] Input Error: Must be 6 numbers");
  winningNumbers.forEach((num) => {
    if (isNaN(num))
      throw new Error("[ERROR] Input Error: Number must be a number");
    if (!Number.isInteger(num))
      throw new Error("[ERROR] Input Error: Number must be an integer");
    if (num > 45 || num < 1)
      throw new Error("[ERROR] Input Error: Number out of bounds");
  });
  if (new Set(winningNumbers).size !== winningNumbers.length)
    throw new Error("[ERROR] Input Error: Duplicate numbers are not allowed");
};
export const checkBonusNumber = (num, winningNumbers) => {
  const bonusNumber = Number(num);
  if (isNaN(bonusNumber))
    throw new Error("[ERROR] Input Error: Number must be a number");
  if (!Number.isInteger(bonusNumber))
    throw new Error("[ERROR] Input Error: Number must be an integer");
  if (bonusNumber > 45 || bonusNumber < 1)
    throw new Error("[ERROR] Input Error: Number out of bounds");
  if (winningNumbers.includes(bonusNumber))
    throw new Error("[ERROR] Input Error: Duplicate numbers are not allowed");
};
