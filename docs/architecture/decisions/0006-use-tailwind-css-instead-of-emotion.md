# 6. Use tailwind css instead of emotion

Date: 2021-05-31

## Status

Accepted

Supercedes
[3. Use nextjs, express, emotion](0003-use-nextjs-express-stylecomponents.md)

## Context

[Tailwindcss](https://tailwindcss.com/) is:

> A utility-first CSS framework packed with classes like flex, pt-4, text-center
> and rotate-90 that can be composed to build any design, directly in your
> markup.

## Decision

- We will use `tailwindcss` instead of `emotion` for styling

## Consequences

| aspect                | easier | harder | risk | notes                                                                                                                                  |
| --------------------- | ------ | ------ | ---- | -------------------------------------------------------------------------------------------------------------------------------------- |
| create a style system | ✅     |        |      | `tailwind` provides a way to centralize the `style-system`. Whether `emotion` would require us to create a mini-style-system framework |
