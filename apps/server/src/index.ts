import { Hono } from 'hono';
import { logger } from '@/middleware/logger';
import { auth } from '@/middleware/auth';
import { env } from '@/utils/env';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import artifacts from '@/routes/artifacts/index';

const app = new Hono()
	.basePath('/v8')
	.use(logger)
	.use(
		'/*',
		zValidator(
			'header',
			z.object({
				authorization: z.string().refine((value) => value.startsWith('Bearer '), {
					message: 'Invalid Authorization header.'
				})
			})
		),
		auth
	)
	.use('/*', zValidator('query', z.object({ teamId: z.string() }).or(z.object({ slug: z.string() }))))
	.route('/artifacts', artifacts);

export default {
	port: env.PORT ?? 8000,
	fetch: app.fetch
};
