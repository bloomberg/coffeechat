# 2. Use commitlint

Date: 2021-05-01

## Status

Accepted

## Context

- [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) is a
  well-known standard for how teams should structure their commit-messages.

  _from the Conventional Commit site_:

  > The Conventional Commits specification is a lightweight convention on top of
  > commit messages. It provides an easy set of rules for creating an explicit
  > commit history; which makes it easier to write automated tools on top of.
  > This convention dovetails with SemVer, by describing the features, fixes,
  > and breaking changes made in commit messages.

- [Commitlint](https://github.com/conventional-changelog/commitlint) is a tool
  for enforcing commit messages

  _from the `commitlint` github repo_:

  > commitlint checks if your commit messages meet the conventional commit
  > format.

## Decision

- We will use `conventional-commits` in this project.
- We will enforce `conventional-commits` through the `commitlint` GitHub action.

## Consequences

### What becomes easier

- Using an automated tools for releases. e.g.:
  [semantic-release](https://github.com/semantic-release/semantic-release)
- Keeping a uniform format for commit messages
- Reviewing PRs, because reviewers will not need to worry about also reviewing
  commit message format.

### What becomes more difficult

- Pushing quick (wip) commits to a pull request will be more difficult as
  contributors will need to learn to use the right format.

### Risks introduced and mitigation

| Risk                                              | Mitigation                                                                              |
| ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| The automated PR check can frustrate contributors | Clearly outline in the README that contributors should use conventional commit messages |
| The automated PR check can frustrate contributors | Add conventional commit badge to README                                                 |
