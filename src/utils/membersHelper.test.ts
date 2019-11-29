import { mapDateToExport, dateToIsoDate } from "./membersHelper";

describe("Format Data Strings", () => {
  test("format italian date", () => {
    expect(mapDateToExport("31/12/68")).toBe("31/12/1968");
    expect(mapDateToExport("31/12/1948")).toBe("31/12/1948");
  });

  test("format iso date", () => {
    expect(mapDateToExport("1968-12-31")).toBe("31/12/1968");
  });

  test("format date to iso date", () => {
    expect(dateToIsoDate("1968-12-31")).toBe("1968-12-31");
    expect(dateToIsoDate("31/12/68")).toBe("1968-12-31");
    expect(dateToIsoDate("31/12/1968")).toBe("1968-12-31");
  });

  test("empty string", () => {
    expect(mapDateToExport("")).toBe("");
    expect(dateToIsoDate("")).toBe("");
  });
});
