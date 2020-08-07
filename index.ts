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
 * // returns "hello5112055c05f944f85755efc5cd8970e194e9f45b"
 * sign("hello", "secret");
 */
export const sign = (payload: string, secret: string, length = 32) =>
  `${payload}${createHmac("md5", secret)
    .update(payload)
    .digest("hex")
    .substring(0, length)}`;

/**
 * Verify a TWT using its secret
 * @param twt - TWT
 * @param secret - Secret
 * @example
 * // returns "hello"
 * verify("hello5112055c05f944f85755efc5cd8970e194e9f45b", "secret");
 * @example
 * // Throws an InvalidHmacError
 * verify("hello-this-is-not-the-correct-hmac", "secret");
 * @example
 * // Throws an InvalidHmacError
 * verify("hello5112055c05f944f85755efc5cd8970e194e9f45b", "incorrect-secret");
 */
export const verify = (twt: string, secret: string, length = 32) => {
  const [payload, hmac] = [
    twt.substring(0, twt.length - length),
    twt.substr(twt.length - length),
  ];
  if (
    createHmac("md5", secret)
      .update(payload)
      .digest("hex")
      .substr(0, length) !== hmac
  )
    throw new InvalidHmacError();
  return payload;
};

/**
 * Decode a TWT **without** verifying it (not recommended)
 * @param twt - TWT
 * @example
 * // returns "hello"
 * decode("hello5112055c05f944f85755efc5cd8970e194e9f45b");
 * @example
 * // returns "hello"
 * decode("hellothis-is-not-the-correct-hmac");
 */
export const decode = (twt: string, length = 32) =>
  twt.substring(0, twt.length - length);

/**
 * Validate a TWT **without** verifying it
 * @param twt - TWT
 * @example
 * // returns true
 * decode("hello5112055c05f944f85755efc5cd8970e194e9f45b");
 * @example
 * // returns false
 * decode("hellothis-is-not-32-characters");
 * // returns true
 * decode("hellothis-is-32-characters-abcdefghijklmnopqr");
 */
export const validate = (twt: string, length = 32) => {
  const [payload, hmac] = [
    twt.substring(0, twt.length - length),
    twt.substr(twt.length - length),
  ];
  return twt.length === payload.length + length && hmac.length === length;
};
