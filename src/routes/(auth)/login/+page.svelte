<script lang="ts">
	import { authService } from '$lib/services/auth.service';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let email = '';
	let password = '';
	let loading = false;
	let error = '';

	async function handleLogin() {
		if (loading) return;
		loading = true;
		error = '';
		try {
			await authService.login(email, password);
			goto(resolve('/dashboard'));
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			error = e.message ?? 'Login gagal';
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen bg-surface flex items-center justify-center p-4">
	<div class="w-full max-w-md">
		<!-- Logo / Brand -->
		<div class="text-center mb-8">
			<div class="inline-flex items-center gap-2 mb-4">
				<div
					class="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm"
				>
					CA
				</div>
				<span class="text-xl font-semibold text-zinc-100">Campaign Analyzer</span>
			</div>
			<p class="text-zinc-400 text-sm">AI-powered campaign insights</p>
		</div>

		<div class="bg-surface-card border border-zinc-800 rounded-2xl p-8">
			<h1 class="text-2xl font-semibold text-zinc-100 mb-6">Masuk</h1>

			{#if error}
				<div
					class="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-red-400 text-sm"
				>
					{error}
				</div>
			{/if}

			<div class="space-y-4">
				<div>
					<label for="email" class="block text-sm text-zinc-400 mb-1.5">Email</label>
					<input
						bind:value={email}
						type="email"
						placeholder="you@example.com"
						class="w-full bg-surface-elevated border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
					/>
				</div>
				<div>
					<label for="password" class="block text-sm text-zinc-400 mb-1.5">Password</label>
					<input
						bind:value={password}
						type="password"
						placeholder="••••••••"
						class="w-full bg-surface-elevated border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
					/>
				</div>

				<button
					on:click={handleLogin}
					disabled={loading}
					class="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-medium rounded-xl py-3 transition-colors mt-2"
				>
					{loading ? 'Masuk...' : 'Masuk'}
				</button>
			</div>

			<p class="text-center text-zinc-500 text-sm mt-6">
				Belum punya akun?
				<a href={resolve('/register')} class="text-accent hover:text-accent-hover transition-colors"
					>Daftar</a
				>
			</p>
		</div>
	</div>
</div>
