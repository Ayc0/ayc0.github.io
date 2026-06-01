# Contributing

## Install

This project uses [pnpm](https://pnpm.io/). Once installed, you just have to run:

```bash
pnpm install
```

To install all dependencies.

## Run locally

Just run:

```bash
pnpm start
```

## IDE

This project relies on Astro & MDX. So make sure you have an IDE that supports both.

## Deploy

Everything is done via the CI automatically

### Publish to ATmosphere

To publish blog posts to the ATmosphere, we use https://sequoia.pub/.

TL;DR: to publish new blog posts, we only need to run:

```bash
pnpm sequoia deploy [--dry-run]
```

This will automatically add the `atUri` to the MDX’s frontmatters
