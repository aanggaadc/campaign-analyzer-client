<script context="module" lang="ts">
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authService } from '$lib/services/auth.service';
	import { authStore } from '$lib/stores/auth.store';
	import { derived } from 'svelte/store';
	import SidebarIcon from './SidebarIcon.svelte';

	const userEmail = derived(authStore, ($auth) => $auth?.email ?? '');

	function initials(email: string) {
		return email.slice(0, 2).toUpperCase();
	}

	const navGroups = [
		{
			label: 'Overview',
			items: [{ href: '/', label: 'Dashboard', icon: 'dashboard' }]
		},
		{
			label: 'Campaigns',
			items: [
				{ href: '/campaigns', label: 'All Campaigns', icon: 'list' },
				{ href: '/campaigns/new', label: 'New Campaign', icon: 'plus' }
			]
		},
		{
			label: 'AI Tools',
			items: [{ href: '/history', label: 'Analysis History', icon: 'history' }]
		}
	] as const;

	const bottomItems = [{ href: '/settings', label: 'Settings', icon: 'settings' }] as const;

	function isActive(href: string): boolean {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href);
	}

	async function handleLogout() {
		await authService.logout();
		goto(resolve('/login'));
	}
</script>

<aside class="w-55 h-screen bg-[#0c0c0e] border-r border-zinc-900 flex flex-col shrink-0">
	<!-- Brand -->
	<div class="flex items-center gap-2.5 px-4 py-5 border-b border-zinc-900">
		<div
			class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0"
		>
			CA
		</div>
		<span class="text-sm font-semibold text-zinc-100 tracking-tight">Campaign Analyzer</span>
	</div>

	<!-- Navigation -->
	<nav class="flex-1 px-2.5 py-3 overflow-y-auto space-y-0.5">
		{#each navGroups as group (group.label)}
			<p
				class="text-[10px] font-semibold text-zinc-700 uppercase tracking-widest px-2 pt-4 pb-1.5 first:pt-2"
			>
				{group.label}
			</p>
			{#each group.items as item (item.href)}
				<a
					href={resolve(item.href)}
					class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors group"
					class:active={isActive(item.href)}
					class:text-zinc-500={!isActive(item.href)}
					class:text-indigo-300={isActive(item.href)}
					class:bg-indigo-950={isActive(item.href)}
					class:hover:bg-zinc-900={!isActive(item.href)}
				>
					<SidebarIcon name={item.icon} active={isActive(item.href)} />
					<span class="font-medium" class:text-indigo-200={isActive(item.href)}>
						{item.label}
					</span>
				</a>
			{/each}
		{/each}

		<div class="pt-4">
			{#each bottomItems as item (item.href)}
				<a
					href={resolve(item.href)}
					class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-900 transition-colors"
					class:text-indigo-300={isActive(item.href)}
					class:bg-indigo-950={isActive(item.href)}
				>
					<SidebarIcon name={item.icon} active={isActive(item.href)} />
					{item.label}
				</a>
			{/each}
		</div>
	</nav>

	<!-- User Footer -->
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
</aside>
