import fs from 'fs';
import path from 'path';

export const initLocalStorage = (dirPath: string) => {
	const basePath = path.resolve(dirPath);
	if (!fs.existsSync(basePath)) {
		fs.mkdirSync(basePath, { recursive: true });
	}
	return {
		writeFile: async (path: string, data: ReadableStream) => {
			await Bun.write(`${basePath}/${path}`, new Response(data));
		},
		streamFile: (path: string) => {
			return Bun.file(`${basePath}/${path}`).stream();
		},
		exists: async (path: string) => {
			return await Bun.file(`${basePath}/${path}`).exists();
		}
	};
};
