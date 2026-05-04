<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { authService } from '$lib/services/auth.service';

	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	const userEmail = derived(page, ($page) => $page.data.user?.email ?? '');

	// Resolve page title dari URL
	const pageTitle = derived(page, ($page) => {
		const path = $page.url.pathname;
		if (path === '/') return 'Dashboard';
		if (path === '/campaigns') return 'All Campaigns';
		if (path === '/campaigns/new') return 'New Campaign';
		if (path.includes('/analyze')) return 'AI Analysis';
		if (path.includes('/campaigns/')) return 'Campaign Detail';
		if (path === '/history') return 'Analysis History';
		return 'Campaign Analyzer';
	});

	function initials(email: string) {
		return email.slice(0, 2).toUpperCase();
	}

	async function handleLogout() {
		const supabase = $page.data.supabase;

		if (!supabase) {
			console.error('Supabase not ready');
			return;
		}

		const auth = authService(supabase);

		await auth.logout();

		goto(resolve('/login'));
	}
</script>

<header class="h-18 bg-[#0c0c0e] border-b border-zinc-900 flex items-center px-5 gap-4 shrink-0">
	<!-- Page Title -->
	<h1 class="text-[15px] font-semibold text-zinc-100 flex-1 tracking-tight">
		{$pageTitle}
	</h1>

	<div class="p-2.5 border-t border-zinc-900">
		<div
			class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-zinc-900 transition-colors group"
		>
			<div
				class="w-7 h-7 rounded-full bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 text-[10px] font-semibold shrink-0"
			>
				{initials($userEmail)}
			</div>
			<div class="flex-1 min-w-0">
				<p class="text-[11px] text-zinc-500 truncate">{$userEmail}</p>
			</div>
			<button
				on:click={handleLogout}
				class="text-zinc-700 hover:text-zinc-400 transition-colors p-0.5"
				title="Logout"
				aria-label="Logout"
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
					<polyline points="16 17 21 12 16 7" />
					<line x1="21" y1="12" x2="9" y2="12" />
				</svg>
			</button>
		</div>
	</div>
	<div class="flex items-center gap-2">
		<slot />
	</div>
</header>
