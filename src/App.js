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
    MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6)
  );
};
const getWinningNumbers = async () => {
  while (true) {
    const input = await Console.readLineAsync("\n당첨 번호를 입력해 주세요.\n");
    const winningNumbers = input.split(",");
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
  winningNumbers.forEach((i) => {
    const num = Number(i);
    if (isNaN(num))
      throw new Error("[ERROR] Input Error: Number must be a number");
    if (!Number.isInteger(num))
      throw new Error("[ERROR] Input Error: Number must be an integer");
    else if (num > 45 || num < 1)
      throw new Error("[ERROR] Input Error: Number Out of Bounds");
  });
};
const getBonusNumber = async () => {
  while (true) {
    const bonusNumber = await Console.readLineAsync(
      "\n보너스 번호를 입력해 주세요.\n"
    );
    try {
      checkBonusNumber(bonusNumber);
    } catch (e) {
      Console.print(e.message);
      continue;
    }
    return bonusNumber;
  }
};
const checkBonusNumber = (num) => {
  const bonusNumber = Number(num);
  if (isNaN(bonusNumber))
    throw new Error("[ERROR] Input Error: Number must be a number");
  if (!Number.isInteger(bonusNumber))
    throw new Error("[ERROR] Input Error: Number Needs to be Int");
  if (bonusNumber > 45 || bonusNumber < 1)
    throw new Error("[ERROR] Input Error: Number Out of Bounds");
};
class App {
  async run() {
    const lottoCount = await getLottoCount();
    const lottoNumbers = getLottoNumbers(lottoCount);
    const winningNumbers = await getWinningNumbers();
    const bonusNumber = await getBonusNumber();
  }
}

export default App;
