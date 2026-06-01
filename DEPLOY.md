# Deploy

Everything is done via the CI automatically

## Publish to ATmosphere

To publish blog posts to the ATmosphere, we use https://sequoia.pub/.

TL;DR: to publish new blog posts, we only need to run:

```bash
pnpm sequoia deploy [--dry-run]
```

This will automatically add the `atUri` to the MDX’s frontmatters
