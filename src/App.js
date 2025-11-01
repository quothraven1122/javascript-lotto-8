import { Console, MissionUtils } from "@woowacourse/mission-utils";

const getLottoCount = async () => {
  const money = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
  return money / 1000;
};

class App {
  async run() {
    const lottoCount = await getLottoCount();
  }
}

export default App;
