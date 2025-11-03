//공통 에러 확인
const checkNumber = (num) => {
  if (isNaN(num))
    throw new Error("[ERROR] Input Error: Money must be a number");
  if (!Number.isInteger(num))
    throw new Error("[ERROR] Input Error: Money must be an integer");
};
const checkLottoNumbers = (num) => {
  checkNumber(num);
  if (num > 45 || num < 1)
    throw new Error("[ERROR] Input Error: Number out of bounds");
};

//특수 에러 확인
export const checkMoneyInput = (num) => {
  const money = Number(num);
  checkNumber(money);
  if (money % 1000 !== 0)
    throw new Error("[ERROR] Input Error: Money must be divided by 1000");
};
export const checkWinningNumbers = (winningNumbers) => {
  if (winningNumbers.length !== 6)
    throw new Error("[ERROR] Input Error: Must be 6 numbers");
  winningNumbers.forEach((num) => {
    checkLottoNumbers(num);
  });
  if (new Set(winningNumbers).size !== winningNumbers.length)
    throw new Error("[ERROR] Input Error: Duplicate numbers are not allowed");
};
export const checkBonusNumber = (num, winningNumbers) => {
  const bonusNumber = Number(num);
  checkLottoNumbers(bonusNumber);
  if (winningNumbers.includes(bonusNumber))
    throw new Error("[ERROR] Input Error: Duplicate numbers are not allowed");
};
