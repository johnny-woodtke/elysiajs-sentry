import * as Sentry from '@sentry/bun'
import { opentelemetry } from '@elysiajs/opentelemetry'
import Elysia from 'elysia'

export function sentry(options?: Sentry.BunOptions) {
	const dsn = options?.dsn ?? Bun.env.SENTRY_DSN
	if (!dsn) {
		throw new Error('Must provide a DSN')
	}

	const environment = options?.environment ?? Bun.env.SENTRY_ENVIRONMENT

	Sentry.init({
		dsn,
		environment,
		integrations: [Sentry.bunServerIntegration()],
		tracesSampleRate: 1.0,
		...options
	})

	return new Elysia()
		.decorate('Sentry', Sentry)
		.use(opentelemetry())
		.guard({
			as: 'global',
			error: ({ error, Sentry }) => {
				Sentry.captureException(error)
			}
		})
}
