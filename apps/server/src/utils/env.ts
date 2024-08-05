import { object, string, z } from 'zod';

const EnvSchema = object({
	NODE_ENV: z.enum(['development', 'test', 'production']),
	PORT: string(),
	TURBO_TOKEN: z.string(),
	TZ: z.string()
});

export const env = EnvSchema.parse(Bun.env);
