const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export const createServerApi = (fetch: typeof globalThis.fetch, accessToken?: string) => {
	return {
		async get<T>(path: string): Promise<T> {
			const res = await fetch(`${API_URL}${path}`, {
				headers: {
					Authorization: accessToken ? `Bearer ${accessToken}` : ''
				}
			});

			if (!res.ok) throw new Error(`API error: ${res.status}`);

			return res.json();
		}
	};
};
