# elysiajs-sentry

[Sentry](https://docs.sentry.io/) plugin for Elysia server.

This plugin has NOT been tested on the Node runtime.

## Capture Issues

<img width="1507" alt="Screenshot 2025-01-04 at 2 16 05 PM" src="https://github.com/user-attachments/assets/f8fbcc1a-c1dc-4c28-8b12-481f949e9637" />

## Capture Traces

<img width="1508" alt="Screenshot 2025-01-04 at 2 15 30 PM" src="https://github.com/user-attachments/assets/c65a3d55-1b6d-4d8b-af81-ff9331419628" />

## Quickstart

1. [Create your Sentry project](https://docs.sentry.io/product/sentry-basics/integrate-frontend/create-new-project/).
2. Assign environment variables (optional).

    A.  Assign your DSN (from step 1) to `SENTRY_DSN`.

    B.  Assign your environment name (recommend `'development' | 'staging' | 'production'`) to `SENTRY_ENVIRONMENT`.

4. Import and use the plugin.

```
import { sentry } from 'elysiajs-sentry';
import { Elysia } from 'elysia';

const app = new Elysia()
  .use(sentry())
  .listen(3000);
```
