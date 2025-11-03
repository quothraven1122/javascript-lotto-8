import { MissionUtils } from "@woowacourse/mission-utils";
import {
  getLottoCount,
  printLottoCount,
  printLottoNumbers,
  getWinningNumbers,
  getBonusNumber,
  printWinStats,
} from "./io.js";

const LottoRank = [
  { rank: 5, match: 3, prize: 5000, count: 0 },
  { rank: 4, match: 4, prize: 50000, count: 0 },
  { rank: 3, match: 5, prize: 1500000, count: 0 },
  { rank: 2, match: 5, bonus: true, prize: 30000000, count: 0 },
  { rank: 1, match: 6, prize: 2000000000, count: 0 },
];

const getLottoNumbers = (lottoCount) => {
  return Array.from({ length: lottoCount }, () =>
    MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b)
  );
};

const getWinCount = (lottoNumbers, winningNumbers, bonusNumber) => {
  //[5등, 4등, 3등, 2등, 1등]
  lottoNumbers.forEach((lottoPaper) => {
    const matchCount = lottoPaper.filter((num) =>
      winningNumbers.includes(num)
    ).length;
    if (matchCount === 6) LottoRank[4].count++;
    else if (matchCount === 5 && lottoPaper.includes(bonusNumber))
      LottoRank[3].count++;
    else if (matchCount === 5) LottoRank[2].count++;
    else if (matchCount === 4) LottoRank[1].count++;
    else if (matchCount === 3) LottoRank[0].count++;
  });
};
const calculateReturn = (moneyUsed) => {
  let moneyEarned = 0;
  LottoRank.forEach((rank) => {
    moneyEarned += rank.prize * rank.count;
  });
  return parseFloat(((moneyEarned / moneyUsed) * 100).toFixed(2));
};
class App {
  async run() {
    const lottoCount = await getLottoCount();
    printLottoCount(lottoCount);

    const lottoNumbers = getLottoNumbers(lottoCount);
    printLottoNumbers(lottoNumbers);

    const winningNumbers = await getWinningNumbers();
    const bonusNumber = await getBonusNumber(winningNumbers);

    getWinCount(lottoNumbers, winningNumbers, bonusNumber);

    printWinStats(LottoRank, calculateReturn(lottoCount * 1000));
  }
}

export default App;
