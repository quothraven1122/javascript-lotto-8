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
const checkMoneyInput = (money) => {
  if (isNaN(money))
    throw new Error("[ERROR] Input Error: Money Needs to be Int");
  if (money % 1000 !== 0)
    throw new Error("[ERROR] Input Error: Money Needs to be Divided by 1000");
};
class App {
  async run() {
    const lottoCount = await getLottoCount();
  }
}

export default App;
