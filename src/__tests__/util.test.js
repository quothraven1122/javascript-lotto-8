import { jest } from "@jest/globals";
import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "../Lotto.js";
import { getLottoNumbers, getWinCount, calculateReturn } from "../util.js";

describe("Lotto Helper Functions", () => {
  describe("getLottoNumbers", () => {
    test("returns the correct number of Lotto instances", () => {
      // mock the random number generator
      jest
        .spyOn(MissionUtils.Random, "pickUniqueNumbersInRange")
        .mockImplementation(() => [1, 2, 3, 4, 5, 6]);

      const lottoNumbers = getLottoNumbers(3);
      expect(lottoNumbers.length).toBe(3);
      lottoNumbers.forEach((lotto) => {
        expect(lotto).toBeInstanceOf(Lotto);
        expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
      });

      MissionUtils.Random.pickUniqueNumbersInRange.mockRestore();
    });
  });

  describe("getWinCount", () => {
    const LottoRank = [
      { rank: 5, match: 3, prize: 5000, count: 0 },
      { rank: 4, match: 4, prize: 50000, count: 0 },
      { rank: 3, match: 5, prize: 1500000, count: 0 },
      { rank: 2, match: 5, bonus: true, prize: 30000000, count: 0 },
      { rank: 1, match: 6, prize: 2000000000, count: 0 },
    ];

    test("counts matches correctly", () => {
      const lottoNumbers = [
        new Lotto([1, 2, 3, 7, 8, 9]), // 3 matches -> 5등
        new Lotto([1, 2, 3, 4, 8, 9]), // 4 matches -> 4등
        new Lotto([1, 2, 3, 4, 5, 9]), // 5 matches -> 3등
        new Lotto([1, 2, 3, 4, 5, 7]), // 5 matches + bonus = 2등
        new Lotto([1, 2, 3, 4, 5, 6]), // 6 matches -> 1등
      ];

      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      getWinCount(lottoNumbers, winningNumbers, bonusNumber, LottoRank);

      expect(LottoRank[0].count).toBe(1); // 3 matches
      expect(LottoRank[1].count).toBe(1); // 4 matches
      expect(LottoRank[2].count).toBe(1); // 5 matches
      expect(LottoRank[3].count).toBe(1); // 5 matches + bonus
      expect(LottoRank[4].count).toBe(1); // 6 matches
    });
  });

  describe("calculateReturn", () => {
    test("calculates correct return rate", () => {
      const LottoRank = [
        { rank: 5, match: 3, prize: 5000, count: 1 }, // 5,000
        { rank: 4, match: 4, prize: 50000, count: 1 }, // 50,000
        { rank: 3, match: 5, prize: 1500000, count: 1 }, // 1,500,000
        { rank: 2, match: 5, bonus: true, prize: 30000000, count: 1 }, // 30,000,000
        { rank: 1, match: 6, prize: 2000000000, count: 1 }, // 2,000,000,000
      ];

      const moneyUsed = 1000 * 5; // 로또 종이 5장 샀음
      const returnRate = calculateReturn(moneyUsed, LottoRank);

      const expected = (
        ((5000 + 50000 + 1500000 + 30000000 + 2000000000) / moneyUsed) *
        100
      ).toFixed(2);
      expect(returnRate).toBe(parseFloat(expected));
    });
  });
});
