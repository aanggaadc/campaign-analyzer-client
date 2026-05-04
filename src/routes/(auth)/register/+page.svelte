<script lang="ts">
	import { page } from '$app/stores';
	import { authService } from '$lib/services/auth.service';
	import { resolve } from '$app/paths';

	let email = '',
		password = '',
		confirm = '';
	let loading = false,
		error = '',
		success = false;

	async function handleRegister() {
		if (password !== confirm) {
			error = 'Password tidak cocok';
			return;
		}

		const supabase = $page.data.supabase;

		if (!supabase) {
			error = 'Supabase belum ready';
			return;
		}

		const auth = authService(supabase);

		loading = true;
		error = '';

		try {
			await auth.register(email, password);
			success = true;
		} catch (e) {
			const errorMessage = e instanceof Error ? e.message : 'Registrasi Gagal';
			error = errorMessage;
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen bg-surface flex items-center justify-center p-4">
	<div class="w-full max-w-md">
		<div class="text-center mb-8">
			<div class="inline-flex items-center gap-2 mb-4">
				<div
					class="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm"
				>
					CA
				</div>
				<span class="text-xl font-semibold text-zinc-100">Campaign Analyzer</span>
			</div>
		</div>

		<div class="bg-surface-card border border-zinc-800 rounded-2xl p-8">
			{#if success}
				<div class="text-center py-4">
					<div class="text-green-400 text-lg font-medium mb-2">Registrasi berhasil!</div>
					<p class="text-zinc-400 text-sm mb-4">Cek email kamu untuk konfirmasi akun.</p>
					<a href={resolve('/login')} class="text-accent hover:text-accent-hover text-sm"
						>Kembali ke login</a
					>
				</div>
			{:else}
				<h1 class="text-2xl font-semibold text-zinc-100 mb-6">Buat Akun</h1>
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
							placeholder="Min. 8 karakter"
							class="w-full bg-surface-elevated border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
						/>
					</div>
					<div>
						<label for="confirm" class="block text-sm text-zinc-400 mb-1.5"
							>Konfirmasi Password</label
						>
						<input
							bind:value={confirm}
							type="password"
							placeholder="Ulangi password"
							class="w-full bg-surface-elevated border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
						/>
					</div>
					<button
						on:click={handleRegister}
						disabled={loading}
						class="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-medium rounded-xl py-3 transition-colors mt-2"
					>
						{loading ? 'Mendaftar...' : 'Daftar'}
					</button>
				</div>
				<p class="text-center text-zinc-500 text-sm mt-6">
					Sudah punya akun?
					<a href={resolve('/login')} class="text-accent hover:text-accent-hover transition-colors"
						>Masuk</a
					>
				</p>
			{/if}
		</div>
	</div>
</div>
