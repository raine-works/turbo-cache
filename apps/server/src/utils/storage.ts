import { mkdir } from 'node:fs/promises';

export const initLocalStorage = async (dir: string) => {
	await mkdir(dir), { recursive: true };
	return {
		writeFile: async (path: string, data: ReadableStream) => {
			await Bun.write(`${dir}/${path}`, new Response(data));
		},
		streamFile: (path: string) => {
			return Bun.file(`${dir}/${path}`).stream();
		},
		exists: async (path: string) => {
			return await Bun.file(`${dir}/${path}`).exists();
		}
	};
};
