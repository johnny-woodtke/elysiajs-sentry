import { opentelemetry } from '@elysiajs/opentelemetry'
import * as Sentry from '@sentry/bun'
import Elysia from 'elysia'

const dsn = Bun.env.SENTRY_DSN
if (!dsn) {
	throw new Error('SENTRY_DSN is not set')
}

const environment = Bun.env.SENTRY_ENVIRONMENT
if (!environment) {
	throw new Error('SENTRY_ENVIRONMENT is not set')
}

export default function init(options?: Sentry.BunOptions) {
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
			error: ({ error }) => {
				Sentry.captureException(error)
			}
		})
}
