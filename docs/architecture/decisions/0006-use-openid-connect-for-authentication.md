# 6. Use openid connect for authentication

Date: 2021-09-07

## Status

Accepted

## Context

- [OpenId-Connect](https://openid.net/connect/) is a standard for identity
  verification. It runs on top of [Oauth 2.0](https://oauth.net/2/).
- "Log in with google" buttons and integrations use OpenId-Connect.

## Decision

- We will use OpenId Connect for login
- We will focus on making the MVP of this project work with:
  - Google's OpenId connect implementation
  - Bloomberg's internal OpenId Connect system
- We will NOT support logging in with a username + password.

## Consequences

- Users of this app will be able to use any OpenId Connect compliant provider to
  log in their users.
- Users of this app will be able to use Google login.
- User of this app will be able to use Bloomberg OpenId Connect login.
- Multifactor authentication will be delegated to the OpenId-Connect
  implementation. e.g.: Google login will prompt users for MFA if that's
  enabled.
