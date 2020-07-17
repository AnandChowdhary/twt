# 🤏 Tiny Web Tokens (TWT)

Tiny Web Tokens (TWT) are like JSON Web Tokens (JWT), but for tiny payloads. They're an opinionated, non-standard way to generate and validate string payloads.

[![Node CI](https://img.shields.io/github/workflow/status/koj-co/twt/Node%20CI?label=GitHub%20CI&logo=github)](https://github.com/koj-co/twt/actions)
[![Travis CI](https://img.shields.io/travis/koj-co/twt?label=Travis%20CI&logo=travis%20ci&logoColor=%23fff)](https://travis-ci.org/koj-co/twt)
[![Coverage](https://coveralls.io/repos/github/koj-co/twt/badge.svg?branch=master&v=2)](https://coveralls.io/github/koj-co/twt?branch=master)
[![Dependencies](https://img.shields.io/librariesio/release/npm/twt)](https://libraries.io/npm/twt)
[![License](https://img.shields.io/npm/l/twt)](https://github.com/koj-co/twt/blob/master/LICENSE)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/twt.svg)](https://snyk.io/test/npm/twt)
[![Based on Node.ts](https://img.shields.io/badge/based%20on-node.ts-brightgreen)](https://github.com/AnandChowdhary/node.ts)
[![npm type definitions](https://img.shields.io/npm/types/twt.svg)](https://unpkg.com/browse/twt/dist/index.d.ts)
[![npm package](https://img.shields.io/npm/v/twt.svg)](https://www.npmjs.com/package/node.ts)
[![npm downloads](https://img.shields.io/npm/dw/twt)](https://www.npmjs.com/package/node.ts)
[![Contributors](https://img.shields.io/github/contributors/koj-co/twt)](https://github.com/koj-co/twt/graphs/contributors)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![npm](https://nodei.co/npm/twt.png)](https://www.npmjs.com/package/twt)

_Looking for the Twitter CLI `twt`? See the docs for v0.x on [GitHub](https://github.com/geoffreydhuyvetters/twt) or [npm](https://www.npmjs.com/package/twt/v/0.10.4)._

## 📋 Spec

A TWT is a URL-safe string with a payload and its computed HMAC SHA-1, separated by a period. The length of a TWT is the length of its payload + 31 characters. For example:

```
hello.5112055c05f944f85755efc5cd8970e194e9f45b
```

In the above example, the payload is `hello`, and its hash is `5112055c05f944f85755efc5cd8970e194e9f45b`, signed using the secret key `secret`.

### Is TWT a replacement for JWT?

TWT is not a replacement for JWT, and you should use JWTs for most use cases. TWTs are only useful for no-expiry, string payloads. The use case is instead of using a random-character string, use its TWT, so that users cannot modify it.

You should **not** use TWT:

- For secure authentication tokens
- When you want token expiry
- When your payload is a JSON object
- When you want to customize the algorithm
- When you need to sign with RSA keys

However, you can use TWT when your payload is a single string with no expiry and you don't want users to modify them, in use cases like:

- Sessions tokens
- Unique user IDs

## 💡 Usage

Install the package from [npm](https://www.npmjs.com/package/twt):

```bash
npm install twt
```

Import and use;

```ts
import { sign, verify, decode } from "twt";
const SECRET = "your-super-safe-secret";

sign("hello", SECRET);
// hello.5112055c05f944f85755efc5cd8970e194e9f45b

verify("hello.5112055c05f944f85755efc5cd8970e194e9f45b", SECRET);
// hello

verify("hello.this-is-not-the-correct-hmac", SECRET);
// Throws an InvalidHmacError

decode("hello.this-is-not-the-correct-hmac");
// hello
```

## 👩‍💻 Development

Build TypeScript:

```bash
npm run build
```

Run unit tests and view coverage:

```bash
npm run test-without-reporting
```

## 📄 License

- Code: [MIT](./LICENSE) © [Koj](https://koj.co)
- Thanks to [Geoffrey Dhuyvetters](https://github.com/geoffreydhuyvetters) for the npm package name `twt`
