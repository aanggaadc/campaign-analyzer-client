import { writable, derived } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

function createAuthStore() {
	const { subscribe, set } = writable<User | null>(null);

	return {
		subscribe,
		setUser: (user: User | null) => set(user),
		clear: () => set(null)
	};
}

export const authStore = createAuthStore();
export const isAuthenticated = derived(authStore, ($auth) => $auth !== null);
