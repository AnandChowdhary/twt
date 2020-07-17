import { createHmac } from "crypto";

/**
 * InvalidHmacError is thrown when HMACs don't match
 * @source https://rclayton.silvrback.com/custom-errors-in-node-js
 */
export class InvalidHmacError extends Error {
  constructor(message?: any) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Generate a new TWT from a payload and signature
 * @param payload - Payload
 * @param secret - Secret
 * @example
 * // returns "hello.5112055c05f944f85755efc5cd8970e194e9f45b"
 * sign("hello", "secret");
 */
export const sign = (payload: string, secret: string) =>
  `${payload}.${createHmac("sha1", secret).update(payload).digest("hex")}`;

/**
 * Verify a TWT using its secret
 * @param twt - TWT
 * @param secret - Secret
 * @example
 * // returns "hello"
 * verify("hello.5112055c05f944f85755efc5cd8970e194e9f45b", "secret");
 * @example
 * // Throws an InvalidHmacError
 * verify("hello.this-is-not-the-correct-hmac", "secret");
 * @example
 * // Throws an InvalidHmacError
 * verify("hello.5112055c05f944f85755efc5cd8970e194e9f45b", "incorrect-secret");
 */
export const verify = (twt: string, secret: string) => {
  const [payload, hmac] = twt.split(/\.(?=[^\.]+$)/);
  if (createHmac("sha1", secret).update(payload).digest("hex") !== hmac)
    throw new InvalidHmacError();
  return payload;
};

/**
 * Decode a TWT **without** verifying it (not recommended)
 * @param twt - TWT
 * @example
 * // returns "hello"
 * decode("hello.5112055c05f944f85755efc5cd8970e194e9f45b");
 * @example
 * // returns "hello"
 * decode("hello.this-is-not-the-correct-hmac");
 */
export const decode = (twt: string) => twt.split(/\.(?=[^\.]+$)/)[0];

/**
 * Validate a TWT **without** verifying it
 * @param twt - TWT
 * @example
 * // returns true
 * decode("hello.5112055c05f944f85755efc5cd8970e194e9f45b");
 * @example
 * // returns false
 * decode("hello.this-is-not-40-characters");
 * // returns true
 * decode("hello.this-is-40-characters-abcdefghijklmnopqr");
 */
export const validate = (twt: string) => {
  const [payload, hmac] = twt.split(/\.(?=[^\.]+$)/);
  return (
    twt.includes(".") &&
    twt.length === payload.length + 41 &&
    hmac.length === 40
  );
};
