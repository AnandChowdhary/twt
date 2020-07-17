import { sign } from "./index";

describe("TWT signing", () => {
  it("works", () => {
    expect(sign("", "")).toBe("");
  });
});
