import { sign } from "./index";

describe("sign", () => {
  it("generates a TWT", () => {
    expect(sign("hello", "secret")).toBe(
      "hello.5112055c05f944f85755efc5cd8970e194e9f45b"
    );
  });
});
