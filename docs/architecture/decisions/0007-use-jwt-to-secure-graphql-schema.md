# 7. Use jwt to secure graphql schema

Date: 2021-09-08

## Status

Accepted

## Context

- [Json Web Tokens](https://tools.ietf.org/html/rfc7519) (abbreviated `JWT`s)
  have become a standard for authorization in applicatons and APIs.
- JWTs are stateless.
- Once their issued, applications can validated JWTs by verifying their
  siganture.

## Decision

- We will use JWTs to authenticate and authorize the graphql schema.
- We will enforce JWTs at the graphql layer
- We will populate the JWT payload with roles. These roles will determine which
  GraphQL operations will be allowed for the user identified by the JWT.
- We will use [HS256](https://en.wikipedia.org/wiki/JSON_Web_Token#Structure) as
  the token signing algorithm.
- We will use the
  [Authorization header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization),
  with a `Bearer`.
  - e.g.:
    > `Authorization: Bearer JWTinBase64GoesHere`

## Consequences

- The UI will need to provide a JWT to perform authorized calls against the
  GraphQL schema.
- The UI will need to aqcuire and maintain valid JWTs.
- Developers will need to be concious of the size of the token.
- There's a shared key (used by the HMAC algorithm) that will need to be
  rotated.
