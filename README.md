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

A TWT is a URL-safe string with a payload and its computed HMAC MD5. The length of a TWT is the length of its payload + 32 characters. For example:

```
hellobade63863c61ed0b3165806ecd6acefc
```

In the above example, the payload is `hello`, and its hash is `bade63863c61ed0b3165806ecd6acefc`, signed using the secret key `secret`.

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
- Unique user ID parameters in URLs
- Fingerprint cookies

### TWTs are Tiny

Compared to a JWT which includes information about the algorithm and base64-encodes the JSON object, TWTs are much smaller because they are hardcoded to use HMAC with MD5 (which is insecure but short, and works very well for this use case) and only support a string.

A JWT signed with `secret` and one key-value pair `{ session_id: "fYbiqoTfXHtW6xPuq7hs" }` is **131 characters** long, whereas a TWT with the value `fYbiqoTfXHtW6xPuq7hs` is only 52 characters long, less than half of the JWT length.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiZlliaXFvVGZYSHRXNnhQdXE3aHMifQ.vrMGzUZ7qt4KXbBRG9VAVlVRGFLXTXYs0cAjQJpSc4s
```

### Example use case

For example, if you have a webpage http://example.com/profile?id=3 where the user with ID = 3 can edit their profile, you can use a TWT instead: http://example.com/profile?id=3eccbc87e4b5ce2fe28308fd9f2a7baf3. This means that users cannot change the ID from the address bar to impersonate someone else (of course, there are other checks to ensure permissions, but you get the idea).

At [Koj](https://koj.co), we're using TWT as part of our onboarding process. When a new user signs up on https://koj.co/en-ch/get-started, we ask them their name and generate a unique ID for their onboarding session. Then, we redirect them to https://koj.co/en-ch/get-started/fYbiqoTfXHtW6xPuq7hsdaa019dae774e16ea5e3cb5e9c1cf72a/furniture/bed, for example, when we ask for their bed preference. In this case, the user's session ID is `fYbiqoTfXHtW6xPuq7hs`, but we use a TWT in the URL. This means that that users cannot simply change the session ID from the address bar to impersonate someone else.

## 💡 Usage

Install the package from [npm](https://www.npmjs.com/package/twt):

```bash
npm install twt
```

Import and use:

```ts
import { sign, verify, decode, validate } from "twt";
const SECRET = "your-super-safe-secret";

sign("hello", SECRET);
// hellobade63863c61ed0b3165806ecd6acefc

verify("hellobade63863c61ed0b3165806ecd6acefc", SECRET);
// hello

verify("hello.this-is-not-the-correct-hmac", SECRET);
// Throws an InvalidHmacError

decode("hello.this-is-not-the-correct-hmac");
// hello

validate("hellobade63863c61ed0b3165806ecd6acefc");
// true

sign("hello", SECRET, 10);
// hellobade63863c with 10 characters length
```

Note: For the secret you should generate and use a random 160-bit key.

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

<p align="center">
  <a href="https://koj.co">
    <img width="44" alt="Koj" src="https://kojcdn.com/v1593890002/website-v2/logo_mcxuwq.svg">
  </a>
</p>
<p align="center">
  <sub>An open source project by <a href="https://koj.co">Koj</a>. <br> <a href="https://koj.co">Furnish your home in style, for as low as CHF175/month →</a></sub>
</p>
