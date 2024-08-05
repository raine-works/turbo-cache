import { object, string, z } from 'zod';

const EnvSchema = object({
	NODE_ENV: z.enum(['development', 'test', 'production']),
	PORT: string().optional(),
	TURBO_TOKEN: z.string(),
	TZ: z.string(),
	LOCAL_STORAGE_DIR: z.string().optional()
});

export const env = EnvSchema.parse(Bun.env);
