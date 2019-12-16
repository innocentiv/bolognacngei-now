import { computeDefaultInterest } from "./payment";

describe("Compute Default Interest", () => {
  test("date before end of registration", () => {
    expect(
      computeDefaultInterest(new Date("2019-12-16"), new Date("2019-12-15"))
    ).toBe(0);
  });

  test("date after end of registration", () => {
    expect(
      computeDefaultInterest(new Date("2019-12-16"), new Date("2019-12-17"))
    ).toBe(2000);
    expect(
      computeDefaultInterest(new Date("2019-12-16"), new Date("2020-01-17"))
    ).toBe(3000);
    expect(
      computeDefaultInterest(new Date("2019-12-16"), new Date("2020-02-17"))
    ).toBe(4000);
  });

  test("date after one year", () => {
    expect(
      computeDefaultInterest(new Date("2019-12-16"), new Date("2022-12-17"))
    ).toBe(5000);
  });
});
