import { sign, verify, decode, validate } from "./index";

describe("sign", () => {
  it("generates a TWT", () => {
    expect(sign("hello", "secret")).toBe(
      "hellobade63863c61ed0b3165806ecd6acefc"
    );
    expect(sign("hello", "secret", 10)).toBe("hellobade63863c");
    expect(sign("hello world", "secret")).toBe(
      "hello world78d6997b1230f38e59b6d1642dfaa3a4"
    );
    expect(sign("hello", "secret-123")).toBe(
      "hello81ac4b5504d8139113528f7f6c7642bd"
    );
  });

  it("generates a TWT using SHA-256", () => {
    expect(sign("hello", "secret", 64, "sha256")).toBe(
      "hello88aab3ede8d3adf94d26ab90d3bafd4a2083070c3bcce9c014ee04a443847c0b"
    );
  });

  it("verifies a TWT", () => {
    expect(verify("hellobade63863c61ed0b3165806ecd6acefc", "secret")).toBe(
      "hello"
    );
    expect(verify("hellobade63863c", "secret", 10)).toBe("hello");
    expect(
      verify("hello world78d6997b1230f38e59b6d1642dfaa3a4", "secret")
    ).toBe("hello world");
    expect(verify("hello81ac4b5504d8139113528f7f6c7642bd", "secret-123")).toBe(
      "hello"
    );
    try {
      verify("helloinvalid hmac", "secret");
    } catch (error) {
      expect(error).toBeDefined();
    }
    try {
      verify("helloinvalid hmac", "secret");
    } catch (error) {
      expect(error.name).toBe("InvalidHmacError");
    }
    try {
      verify("hellobade63863c61ed0b3165806ecd6acefc", "invalid-secret");
    } catch (error) {
      expect(error).toBeDefined();
    }
    try {
      verify("hellobade63863c61ed0b3165806ecd6acefc", "invalid-secret");
    } catch (error) {
      expect(error.name).toBe("InvalidHmacError");
    }
  });

  it("decodes a TWT", () => {
    expect(decode("hellobade63863c61ed0b3165806ecd6acefc")).toBe("hello");
    expect(decode("hellobade63863c", 10)).toBe("hello");
    expect(decode("hello world78d6997b1230f38e59b6d1642dfaa3a4")).toBe(
      "hello world"
    );
    expect(decode("hello81ac4b5504d8139113528f7f6c7642bd")).toBe("hello");
    expect(decode("hello81ac4b5504d8139113528f7f6c7642bd")).toBe("hello");
    expect(decode("hellohellohellohellohellohellohellohe")).toBe("hello");
  });

  it("validates a TWT", () => {
    expect(validate("hellobade63863c61ed0b3165806ecd6acefc")).toBeTruthy();
    expect(validate("hellobade63863c", 10)).toBeTruthy();
    expect(
      validate("hello1111111111111111111111111111111111111111")
    ).toBeTruthy();
    expect(validate("helloinvalid-length")).toBeFalsy();
    expect(validate("hello-no-period-seperator")).toBeFalsy();
  });
});
