import { Hono } from 'hono';
import { stream } from 'hono/streaming';
import { initLocalStorage } from '@/utils/storage';
import events from '@/routes/artifacts/events';
import status from '@/routes/artifacts/status';

const localStorage = await initLocalStorage('/tmp/test');

const app = new Hono()
	.route('/events', events)
	.route('/status', status)
	.get('/:hash', async (c) => {
		if (c.req.method === 'HEAD') {
			const hash = c.req.param('hash');
			const team = c.req.query('teamId') ?? c.req.query('slug');
			if (await localStorage.exists(`${team}/${hash}`)) {
				return c.json({});
			} else {
				return c.notFound();
			}
		} else {
			c.res.headers.set('Content-Type', 'application/octet-stream');
			const hash = c.req.param('hash');
			const team = c.req.query('teamId') ?? c.req.query('slug');
			if (await localStorage.exists(`${team}/${hash}`)) {
				c.res.headers.set('Content-Type', 'application/octet-stream');
				return stream(c, async (stream) => {
					stream.onAbort(() => {
						console.log('Aborted!');
					});
					await stream.pipe(localStorage.streamFile(`${team}/${hash}`));
				});
			} else {
				return c.notFound();
			}
		}
	})
	.put('/:hash', async (c) => {
		const hash = c.req.param('hash');
		const team = c.req.query('teamId') ?? c.req.query('slug');
		const buffer = await c.req.arrayBuffer();
		const stream = new ReadableStream({
			start(controller) {
				controller.enqueue(buffer);
				controller.close();
			}
		});
		await localStorage.writeFile(`${team}/${hash}`, stream);
		return c.json({ urls: [`${team}/${hash}`] });
	});

export default app;
