import sentry from '../src'

import { Elysia, t } from 'elysia'

const app = new Elysia()
	.use(sentry())
	.get('/', ({ Sentry }) => {
		Sentry.captureMessage('Hello World')
		return 'Hello World'
	})
	.get(
		'/error/:message',
		({ params: { message } }) => {
			throw new Error(message)
		},
		{
			params: t.Object({
				message: t.String()
			})
		}
	)
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
