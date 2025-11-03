import { Console } from "@woowacourse/mission-utils";
import {
  checkMoneyInput,
  checkWinningNumbers,
  checkBonusNumber,
} from "./error.js";

export const getLottoCount = async () => {
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
export const printLottoCount = (lottoCount) => {
  Console.print(`\n${lottoCount}개를 구매했습니다.`);
};
export const printLottoNumbers = (lottoNumbers) => {
  lottoNumbers.forEach((lottoPaper) => Console.print(lottoPaper));
};
export const getWinningNumbers = async () => {
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
export const getBonusNumber = async (winningNumbers) => {
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
