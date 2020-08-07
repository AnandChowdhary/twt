import { sign, verify, decode, InvalidHmacError, validate } from "./index";

describe("sign", () => {
  it("generates a TWT", () => {
    expect(sign("hello", "secret")).toBe(
      "hello5112055c05f944f85755efc5cd8970e194e9f45b"
    );
    expect(sign("hello world", "secret")).toBe(
      "hello world03376ee7ad7bbfceee98660439a4d8b125122a5a"
    );
    expect(sign("hello", "secret-123")).toBe(
      "helloef86c4b807368c4e40be9e899d7824830e32a392"
    );
  });

  it("verifies a TWT", () => {
    expect(
      verify("hello5112055c05f944f85755efc5cd8970e194e9f45b", "secret")
    ).toBe("hello");
    expect(
      verify("hello world03376ee7ad7bbfceee98660439a4d8b125122a5a", "secret")
    ).toBe("hello world");
    expect(
      verify("helloef86c4b807368c4e40be9e899d7824830e32a392", "secret-123")
    ).toBe("hello");
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
      verify("hello5112055c05f944f85755efc5cd8970e194e9f45b", "invalid-secret");
    } catch (error) {
      expect(error).toBeDefined();
    }
    try {
      verify("hello5112055c05f944f85755efc5cd8970e194e9f45b", "invalid-secret");
    } catch (error) {
      expect(error.name).toBe("InvalidHmacError");
    }
  });

  it("decodes a TWT", () => {
    expect(decode("hello5112055c05f944f85755efc5cd8970e194e9f45b")).toBe(
      "hello"
    );
    expect(decode("hello world03376ee7ad7bbfceee98660439a4d8b125122a5a")).toBe(
      "hello world"
    );
    expect(decode("helloef86c4b807368c4e40be9e899d7824830e32a392")).toBe(
      "hello"
    );
    expect(decode("helloef86c4b807368c4e40be9e899d7824830e32a392")).toBe(
      "hello"
    );
    expect(decode("hellohellohellohellohellohellohellohellohello")).toBe(
      "hello"
    );
  });

  it("validates a TWT", () => {
    expect(
      validate("hello5112055c05f944f85755efc5cd8970e194e9f45b")
    ).toBeTruthy();
    expect(
      validate("hello1111111111111111111111111111111111111111")
    ).toBeTruthy();
    expect(validate("helloinvalid-length")).toBeFalsy();
    expect(validate("hello-no-period-seperator")).toBeFalsy();
  });
});
