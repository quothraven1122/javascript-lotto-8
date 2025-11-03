import { MissionUtils } from "@woowacourse/mission-utils";

class Lotto {
  #numbers = [];
  #rankings = [
    { rank: 5, match: 3, prize: 5000, count: 0 },
    { rank: 4, match: 4, prize: 50000, count: 0 },
    { rank: 3, match: 5, prize: 1500000, count: 0 },
    { rank: 2, match: 5, bonus: true, prize: 30000000, count: 0 },
    { rank: 1, match: 6, prize: 2000000000, count: 0 },
  ];

  constructor(count) {
    this.#numbers = Array.from({ length: count }, () =>
      MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6).sort(
        (a, b) => a - b
      )
    );
  }

  evaluate(winningNumbers, bonusNumber) {
    this.#numbers.forEach((lottoPaper) => {
      const matchCount = lottoPaper.filter((num) =>
        winningNumbers.includes(num)
      ).length;

      if (matchCount === 6) this.#rankings[4].count++;
      else if (matchCount === 5 && lottoPaper.includes(bonusNumber))
        this.#rankings[3].count++;
      else if (matchCount === 5) this.#rankings[2].count++;
      else if (matchCount === 4) this.#rankings[1].count++;
      else if (matchCount === 3) this.#rankings[0].count++;
    });
  }

  calculateReturn() {
    const totalSpent = this.#numbers.length * 1000;
    const totalEarned = this.#rankings.reduce(
      (sum, r) => sum + r.prize * r.count,
      0
    );
    return parseFloat(((totalEarned / totalSpent) * 100).toFixed(2));
  }

  get numbers() {
    return this.#numbers;
  }

  get rankings() {
    return this.#rankings;
  }
}

export default Lotto;
