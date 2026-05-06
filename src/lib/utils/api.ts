import type { SupabaseClient } from '@supabase/supabase-js';
import type { ApiClient } from '$lib/types/api';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export const createApi = (supabase: SupabaseClient): ApiClient => {
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

	return {
		async get<T>(path: string): Promise<T> {
			const headers = await getAuthHeaders();
			const res = await fetch(`${API_URL}${path}`, { headers });

			if (!res.ok) throw new Error(`API error: ${res.status}`);

			return res.json();
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
		async upload<T>(path: string, formData: FormData): Promise<T> {
			const { Authorization } = await getAuthHeaders();

			const res = await fetch(`${API_URL}${path}`, {
				method: 'POST',
				headers: { Authorization },
				body: formData
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
};
