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
export const sign = (payload: string, secret: string) =>
  `${payload}${createHmac("md5", secret).update(payload).digest("hex")}`;

/**
 * Verify a TWT using its secret
 * @param twt - TWT
 * @param secret - Secret
 * @example
 * // returns "hello"
 * verify("hello5112055c05f944f85755efc5cd8970e194e9f45b", "secret");
 * @example
 * // Throws an InvalidHmacError
 * verify("hellothis-is-not-the-correct-hmac", "secret");
 * @example
 * // Throws an InvalidHmacError
 * verify("hello5112055c05f944f85755efc5cd8970e194e9f45b", "incorrect-secret");
 */
export const verify = (twt: string, secret: string) => {
  const [payload, hmac] = [
    twt.substring(0, twt.length - 40),
    twt.substr(twt.length - 40),
  ];
  if (createHmac("md5", secret).update(payload).digest("hex") !== hmac)
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
export const decode = (twt: string) => twt.substring(0, twt.length - 40);

/**
 * Validate a TWT **without** verifying it
 * @param twt - TWT
 * @example
 * // returns true
 * decode("hello5112055c05f944f85755efc5cd8970e194e9f45b");
 * @example
 * // returns false
 * decode("hellothis-is-not-40-characters");
 * // returns true
 * decode("hellothis-is-40-characters-abcdefghijklmnopqr");
 */
export const validate = (twt: string) => {
  const [payload, hmac] = [
    twt.substring(0, twt.length - 40),
    twt.substr(twt.length - 40),
  ];
  return twt.length === payload.length + 40 && hmac.length === 40;
};
