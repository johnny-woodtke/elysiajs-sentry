import { sentry } from '../src'

import { Elysia, t } from 'elysia'

const app = new Elysia()
	.use(sentry())
	.get('/', ({ Sentry }) => {
		const message = 'Hello World'
		Sentry.captureMessage(message)
		return message
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
