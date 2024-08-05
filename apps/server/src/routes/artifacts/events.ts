import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono().post(
	'/',
	zValidator(
		'json',
		z.array(
			z.object({
				sessionId: z.string(),
				source: z.string(),
				hash: z.string(),
				event: z.string(),
				duration: z.string()
			})
		)
	),
	async (c) => {
		return c.json({});
	}
);

export default app;
