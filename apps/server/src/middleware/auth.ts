import { createMiddleware } from 'hono/factory';
import { env } from '@/utils/env';

export const auth = createMiddleware(async (c, next) => {
	const bearerToken = c.req.raw.headers.get('authorization')?.split('Bearer ')[1];
	if (bearerToken !== env.TURBO_TOKEN) {
		c.status(401);
		return c.text('Not Authorized!');
	} else {
		await next();
	}
});
