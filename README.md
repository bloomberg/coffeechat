# Coffee Chat <!-- omit in toc -->

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Connect Mentors and Mentees by making the process of connecting and then
scheduling appointments as easy as possible.

## Menu <!-- omit in toc -->

- [Rationale](#rationale)
- [Quick Start](#quick-start)
- [Building](#building)
- [Installation](#installation)
- [Contributions](#contributions)
  - [Commit message standard](#commit-message-standard)
- [Local development](#local-development)
  - [Generate & update typescript types for GQL Schema](#generate--update-typescript-types-for-gql-schema)
  - [Run Database migrations](#run-database-migrations)
- [License](#license)
- [Code of Conduct](#code-of-conduct)
- [Security Vulnerability Reporting](#security-vulnerability-reporting)

## Rationale

## Quick Start

1. Clone this repository
1. `cp .npmrc.sample .npmrc`
1. Run `npm install`
1. `cp sample.env .env`.
1. `cd` to `local-env`, and start the local services `docker compose up -d`
1. `cd ..` to the root of this project
1. Run the migrations `npx prisma migrate reset`
1. Start the development server with `npm run dev`
1. Navigate to `localhost:4444` in your browser to view the React app.

> NOTE: the server will be listening in the port corresponding to the PORT
> variable in `.env`

## Building

## Installation

## Contributions

We :heart: contributions.

Have you had a good experience with this project? Why not share some love and
contribute code, or just let us know about any issues you had with it?

We welcome issue reports [here](../../issues); be sure to choose the proper
issue template for your issue, so that we can be sure you're providing the
necessary information.

Before sending a [Pull Request](../../pulls), please make sure you read our
[Contribution Guidelines](https://github.com/bloomberg/.github/blob/master/CONTRIBUTING.md).

### Commit message standard

This project aligns to the
[conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/)
commit-message standard, and the PR process will enforce this standards. Make
sure your PR's commit messages fulfill the standard.

## Local development

### Generate & update typescript types for GQL Schema

1. Start the server locally

```bash
npm run dev
```

2. Pull the schema into a centralized schema.graphql

Open another terminal window and then run.

```bash
npm run gql:update-schema-gql
```

1. Generate the typescript types for queries

```bash
npm run gql:generate-ts-for-queries
```

### Run Database migrations

1. Run a dev migration

```bash
npx prisma migrate dev
```

## License

Please read the [LICENSE](LICENSE) file.

## Code of Conduct

This project has adopted a
[Code of Conduct](https://github.com/bloomberg/.github/blob/master/CODE_OF_CONDUCT.md).
If you have any concerns about the Code, or behavior which you have experienced
in the project, please contact us at opensource@bloomberg.net.

## Security Vulnerability Reporting

If you believe you have identified a security vulnerability in this project,
please send email to the project team at opensource@bloomberg.net, detailing the
suspected issue and any methods you've found to reproduce it.

Please do NOT open an issue in the GitHub repository, as we'd prefer to keep
vulnerability reports private until we've had an opportunity to review and
address them.
