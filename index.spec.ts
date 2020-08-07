import { sign, verify, decode, validate } from "./index";

describe("sign", () => {
  it("generates a TWT", () => {
    expect(sign("hello", "secret")).toBe(
      "hellobade63863c61ed0b3165806ecd6acefc"
    );
    expect(sign("hello world", "secret")).toBe(
      "hello world78d6997b1230f38e59b6d1642dfaa3a4"
    );
    expect(sign("hello", "secret-123")).toBe(
      "hello81ac4b5504d8139113528f7f6c7642bd"
    );
  });

  it("verifies a TWT", () => {
    expect(verify("hellobade63863c61ed0b3165806ecd6acefc", "secret")).toBe(
      "hello"
    );
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
    expect(decode("hello world78d6997b1230f38e59b6d1642dfaa3a4")).toBe(
      "hello world"
    );
    expect(decode("hello81ac4b5504d8139113528f7f6c7642bd")).toBe("hello");
    expect(decode("hello81ac4b5504d8139113528f7f6c7642bd")).toBe("hello");
    expect(decode("hellohellohellohellohellohellohellohe")).toBe("hello");
  });

  it("validates a TWT", () => {
    expect(validate("hellobade63863c61ed0b3165806ecd6acefc")).toBeTruthy();
    expect(
      validate("hello1111111111111111111111111111111111111111")
    ).toBeTruthy();
    expect(validate("helloinvalid-length")).toBeFalsy();
    expect(validate("hello-no-period-seperator")).toBeFalsy();
  });
});
