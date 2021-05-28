# 5. Use eslint-plugin-inclusive-language

Date: 2021-05-27

## Status

Accepted

## Context

[Eslint-plugin-inclusive-language](https://github.com/muenzpraeger/eslint-plugin-inclusive-language)
is used to raise awareness for using inclusive language in your codebase. There
are 2 main advantages of using this plugin:

1. For reporting non-inclusive terms in the codebase
2. Suggesting suitable inclusive alternatives for the reported non-inclusive
   terms.

The plugin comes with a
[default wordlist](https://github.com/muenzpraeger/eslint-plugin-inclusive-language/blob/primary/lib/config/inclusive-words.json)
which includes most frequently used non-inclusive terms. In addition to the
default list, one can also add a custom list of words to be reported.

## Decision

- We will use `eslint-plugin-inclusive-language` to make the codebase free of
  non-inclusive terms.
- In addition to default list, we will also add more words to the custom list to
  make the plugin more powerful.

## What becomes easier?

- Helps raise awareness amongst developers and start learning about inclusive
  language.
- Automated check to spot non-inclusive terms which sometimes can be easy to
  miss by humans.
