import { opentelemetry } from '@elysiajs/opentelemetry'
import * as Sentry from '@sentry/bun'
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

	console.log('🔎 Sentry initialized')

	return (
		new Elysia()
			.decorate('Sentry', Sentry)
			.use(opentelemetry())
			// Capture exceptions
			.onError(
				{ as: 'global' },
				function captureException({ error, Sentry }) {
					Sentry.captureException(error)
				}
			)
			// Need this to inject attributes into the span
			// https://github.com/elysiajs/opentelemetry/issues/40
			.onAfterResponse(
				{ as: 'global' },
				function injectAttributes({
					body,
					cookie,
					params,
					request,
					response,
					route,
					server,
					store,
					headers,
					path,
					query
				}) {}
			)
	)
}
