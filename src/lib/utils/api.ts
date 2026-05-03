import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

async function getAuthHeaders(): Promise<Record<string, string>> {
	const {
		data: { session }
	} = await supabase.auth.getSession();
	if (!session) throw new Error('Not authenticated');
	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${session.access_token}`
	};
}

export const api = {
	async get<T>(path: string): Promise<T> {
		const headers = await getAuthHeaders();
		const res = await fetch(`${API_URL}${path}`, { headers });
		if (!res.ok) throw new Error(`API error: ${res.status}`);
		const json = await res.json();
		return json;
	},

	async post<T>(path: string, body: unknown): Promise<T> {
		const headers = await getAuthHeaders();
		const res = await fetch(`${API_URL}${path}`, {
			method: 'POST',
			headers,
			body: JSON.stringify(body)
		});
		if (!res.ok) throw new Error(`API error: ${res.status}`);
		const json = await res.json();
		return json.data;
	},

	async delete(path: string): Promise<void> {
		const headers = await getAuthHeaders();
		const res = await fetch(`${API_URL}${path}`, { method: 'DELETE', headers });
		if (!res.ok) throw new Error(`API error: ${res.status}`);
	}
};
