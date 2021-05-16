# 4. Use use eslint-config-prettier instead of eslint-plugin-prettier

Date: 2021-05-17

## Status

Accepted

## Context

There are 2 ways to enable eslint+prettier integration:
[eslint-pluging-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
and
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier).

Originally, We were enforcing prettier through `eslint-plugin-pretter`. The
problem is that vscode shows a lot of errors as you're typing, and this is an
unnecessary distraction. These errors are all trivial formatting discrepancies.

## Decision

- We will use `eslint-config-prettier` to disable all `eslint` formatting rules.
- We will use the `prettier` tools (cli, and vscode plugin) to enforce
  formatting instead.

## Consequences

## What becomes easier?

- Coding becomes easier because there are no distracting red indicators for
  trivial formatting discrepancies.
- Formatting non-typescript/non-javascript resources becomes easier because
  `prettier` can format many other extensions. For example: `yaml`, `json`, and
  `markdown`

## What becomes harder?

- The `vscode` setup becomes more difficult because developers will need to
  configure many different vscode plugins to remain compliant.
  - **mitigation**: provide the necessary vscode settings in the project
    workspace.
- The PR process becomes more difficult because developers will need to ensure
  they format their code according to the standard prettier format, and now this
  includes non-js/non-ts files.
  - **mitigation**
    - Provide `vscode` settings.
    - Provide `npm.scripts` to format the workspace.
- Setting up CI becomes more difficult because we will need an additional job to
  enforce formatting.
