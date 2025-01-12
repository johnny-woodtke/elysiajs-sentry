import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'

import { sentry } from '../src'

const app = new Elysia()
	.use(sentry())
	.use(cors())
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
	.use(swagger())
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
