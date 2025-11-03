import {
  getLottoCount,
  printLottoCount,
  printLottoNumbers,
  getWinningNumbers,
  getBonusNumber,
  printWinStats,
} from "./io.js";
import Lotto from "./Lotto.js";

class App {
  async run() {
    const lottoCount = await getLottoCount();
    printLottoCount(lottoCount);

    const lotto = new Lotto(lottoCount);
    printLottoNumbers(lotto.numbers);

    const winningNumbers = await getWinningNumbers();
    const bonusNumber = await getBonusNumber(winningNumbers);

    lotto.evaluate(winningNumbers, bonusNumber);

    printWinStats(lotto.rankings, lotto.calculateReturn());
  }
}

export default App;
