<script context="module" lang="ts">
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import SidebarIcon from './SidebarIcon.svelte';

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

	function isActive(href: string): boolean {
		if (href === '/') return $page.url.pathname === '/dashboard';
		return $page.url.pathname === href;
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
	</nav>
</aside>
