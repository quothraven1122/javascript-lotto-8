import { Console, MissionUtils } from "@woowacourse/mission-utils";

const getLottoCount = async () => {
  while (true) {
    const money = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
    try {
      checkMoneyInput(money);
    } catch (e) {
      Console.print(e.message);
      continue;
    }
    return money / 1000;
  }
};
const checkMoneyInput = (num) => {
  const money = Number(num);
  if (isNaN(money))
    throw new Error("[ERROR] Input Error: Money must be a number");
  if (!Number.isInteger(money))
    throw new Error("[ERROR] Input Error: Money must be an integer");
  if (money % 1000 !== 0)
    throw new Error("[ERROR] Input Error: Money must be divided by 1000");
};
const getLottoNumbers = (lottoCount) => {
  return Array.from({ length: lottoCount }, () =>
    MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b)
  );
};
const getWinningNumbers = async () => {
  while (true) {
    const input = await Console.readLineAsync("\n당첨 번호를 입력해 주세요.\n");
    const winningNumbers = input.split(",").map(Number);
    try {
      checkWinningNumbers(winningNumbers);
    } catch (e) {
      Console.print(e.message);
      continue;
    }
    return winningNumbers;
  }
};
const checkWinningNumbers = (winningNumbers) => {
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
const getBonusNumber = async (winningNumbers) => {
  while (true) {
    const bonusNumber = await Console.readLineAsync(
      "\n보너스 번호를 입력해 주세요.\n"
    );
    try {
      checkBonusNumber(bonusNumber, winningNumbers);
    } catch (e) {
      Console.print(e.message);
      continue;
    }
    return Number(bonusNumber);
  }
};
const checkBonusNumber = (num, winningNumbers) => {
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
const getWinCount = (lottoNumbers, winningNumbers, bonusNumber) => {
  //[5등, 4등, 3등, 2등, 1등]
  const winCount = Array(5).fill(0);
  lottoNumbers.forEach((lottoPaper) => {
    const matchCount = lottoPaper.filter((num) =>
      winningNumbers.includes(num)
    ).length;
    if (matchCount === 6) winCount[4]++;
    else if (matchCount === 5 && lottoPaper.includes(bonusNumber))
      winCount[3]++;
    else if (matchCount === 5) winCount[2]++;
    else if (matchCount === 4) winCount[1]++;
    else if (matchCount === 3) winCount[0]++;
  });
  return winCount;
};
class App {
  async run() {
    const lottoCount = await getLottoCount();
    Console.print(`\n${lottoCount}개를 구매했습니다.`);

    const lottoNumbers = getLottoNumbers(lottoCount);
    lottoNumbers.forEach((lottoPaper) => Console.print(lottoPaper));

    const winningNumbers = await getWinningNumbers();
    const bonusNumber = await getBonusNumber(winningNumbers);

    const winCount = getWinCount(lottoNumbers, winningNumbers, bonusNumber);
    Console.print(winCount);
  }
}

export default App;
