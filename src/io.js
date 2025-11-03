import { Console } from "@woowacourse/mission-utils";
import {
  checkMoneyInput,
  checkWinningNumbers,
  checkBonusNumber,
} from "./error.js";

//공통 io
const tryCatch = async (prompt, validator, processInput = (x) => x) => {
  const input = await Console.readLineAsync(prompt);
  try {
    validator(input);
    return processInput(input);
  } catch (e) {
    Console.print(e.message);
  }
};

//특수 io
export const getLottoCount = async () => {
  while (true) {
    const money = await tryCatch(
      "구입금액을 입력해 주세요.\n",
      checkMoneyInput,
      (m) => m / 1000
    );
    if (money !== undefined) return money;
  }
};
export const printLottoCount = (lottoCount) => {
  Console.print(`\n${lottoCount}개를 구매했습니다.`);
};
export const printLottoNumbers = (lottoNumbers) => {
  lottoNumbers.forEach((lottoPaper) => Console.print(lottoPaper));
};
export const getWinningNumbers = async () => {
  while (true) {
    const numbers = await tryCatch(
      "\n당첨 번호를 입력해 주세요.\n",
      (input) => checkWinningNumbers(input.split(",").map(Number)),
      (input) => input.split(",").map(Number)
    );
    if (numbers) return numbers;
  }
};
export const getBonusNumber = async (winningNumbers) => {
  while (true) {
    const bonus = await tryCatch(
      "\n보너스 번호를 입력해 주세요.\n",
      (b) => checkBonusNumber(b, winningNumbers),
      Number
    );
    if (bonus) return bonus;
  }
};
export const printWinStats = (lottoRank, returnRate) => {
  Console.print("\n당첨 통계\n---");
  lottoRank.forEach((win) => {
    if (win.bonus)
      Console.print(
        `${
          win.match
        }개 일치, 보너스 볼 일치 (${win.prize.toLocaleString()}원) - ${
          win.count
        }개`
      );
    else
      Console.print(
        `${win.match}개 일치 (${win.prize.toLocaleString()}원) - ${win.count}개`
      );
  });
  Console.print(`총 수익률은 ${returnRate}%입니다.`);
};
