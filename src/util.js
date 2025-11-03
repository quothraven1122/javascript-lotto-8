import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

export const getLottoNumbers = (lottoCount) => {
  return Array.from(
    { length: lottoCount },
    () =>
      new Lotto(
        MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6).sort(
          (a, b) => a - b
        )
      )
  );
};
export const getWinCount = (
  lottoNumbers,
  winningNumbers,
  bonusNumber,
  LottoRank
) => {
  //[5등, 4등, 3등, 2등, 1등]
  lottoNumbers.forEach((lottoPaper) => {
    const matchCount = lottoPaper
      .getNumbers()
      .filter((num) => winningNumbers.includes(num)).length;
    if (matchCount === 6) LottoRank[4].count++;
    else if (matchCount === 5 && lottoPaper.getNumbers().includes(bonusNumber))
      LottoRank[3].count++;
    else if (matchCount === 5) LottoRank[2].count++;
    else if (matchCount === 4) LottoRank[1].count++;
    else if (matchCount === 3) LottoRank[0].count++;
  });
};
export const calculateReturn = (moneyUsed, LottoRank) => {
  let moneyEarned = 0;
  LottoRank.forEach((rank) => {
    moneyEarned += rank.prize * rank.count;
  });
  return parseFloat(((moneyEarned / moneyUsed) * 100).toFixed(2));
};
