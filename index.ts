import { createHmac } from "crypto";

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
export const verify = (twt: string, secret: string) => "";

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
export const decode = (twt: string) => "";
