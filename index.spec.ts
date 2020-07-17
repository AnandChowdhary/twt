import { sign, verify, decode, InvalidHmacError } from "./index";

describe("sign", () => {
  it("generates a TWT", () => {
    expect(sign("hello", "secret")).toBe(
      "hello.5112055c05f944f85755efc5cd8970e194e9f45b"
    );
    expect(sign("hello world", "secret")).toBe(
      "hello world.03376ee7ad7bbfceee98660439a4d8b125122a5a"
    );
    expect(sign("hello", "secret-123")).toBe(
      "hello.ef86c4b807368c4e40be9e899d7824830e32a392"
    );
  });

  it("verifies a TWT", () => {
    expect(
      verify("hello.5112055c05f944f85755efc5cd8970e194e9f45b", "secret")
    ).toBe("hello");
    expect(
      verify("hello world.03376ee7ad7bbfceee98660439a4d8b125122a5a", "secret")
    ).toBe("hello world");
    expect(
      verify("hello.ef86c4b807368c4e40be9e899d7824830e32a392", "secret-123")
    ).toBe("hello");
    try {
      verify("hello.invalid hmac", "secret");
    } catch (error) {
      expect(error).toBeDefined();
    }
    try {
      verify("hello.invalid hmac", "secret");
    } catch (error) {
      expect(error.name).toBe("InvalidHmacError");
    }
    try {
      verify(
        "hello.5112055c05f944f85755efc5cd8970e194e9f45b",
        "invalid-secret"
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
    try {
      verify(
        "hello.5112055c05f944f85755efc5cd8970e194e9f45b",
        "invalid-secret"
      );
    } catch (error) {
      expect(error.name).toBe("InvalidHmacError");
    }
  });

  it("decodes a TWT", () => {
    expect(decode("hello.5112055c05f944f85755efc5cd8970e194e9f45b")).toBe(
      "hello"
    );
    expect(decode("hello world.03376ee7ad7bbfceee98660439a4d8b125122a5a")).toBe(
      "hello world"
    );
    expect(decode("hello.ef86c4b807368c4e40be9e899d7824830e32a392")).toBe(
      "hello"
    );
    expect(decode("hello.invalid hmac")).toBe("hello");
    expect(decode("hello world.invalid hmac")).toBe("hello world");
    expect(decode("hello.invalid hmac")).toBe("hello");
  });
});
