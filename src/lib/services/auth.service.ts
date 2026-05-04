import type { SupabaseClient } from '@supabase/supabase-js';

export const authService = (supabase: SupabaseClient) => ({
	async register(email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});
		if (error) throw error;
		return data;
	},

	async login(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) throw error;
		return data;
	},

	async logout() {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
	},
});
