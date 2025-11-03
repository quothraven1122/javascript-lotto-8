import {
  getLottoCount,
  printLottoCount,
  printLottoNumbers,
  getWinningNumbers,
  getBonusNumber,
  printWinStats,
} from "./io.js";
import { getLottoNumbers, getWinCount, calculateReturn } from "./util.js";

const LottoRank = [
  { rank: 5, match: 3, prize: 5000, count: 0 },
  { rank: 4, match: 4, prize: 50000, count: 0 },
  { rank: 3, match: 5, prize: 1500000, count: 0 },
  { rank: 2, match: 5, bonus: true, prize: 30000000, count: 0 },
  { rank: 1, match: 6, prize: 2000000000, count: 0 },
];

class App {
  async run() {
    //로또 종이 개수 구하기
    const lottoCount = await getLottoCount();
    printLottoCount(lottoCount);

    //로또 종이들 랜덤 숫자 6개로 채워주기
    const lottoNumbers = getLottoNumbers(lottoCount);
    printLottoNumbers(lottoNumbers);

    //우승 숫자들 입력
    const winningNumbers = await getWinningNumbers();
    const bonusNumber = await getBonusNumber(winningNumbers);

    //얼마나 이겼는지 계산하기
    getWinCount(lottoNumbers, winningNumbers, bonusNumber, LottoRank);

    //수익 계산
    printWinStats(LottoRank, calculateReturn(lottoCount * 1000, LottoRank));
  }
}

export default App;
