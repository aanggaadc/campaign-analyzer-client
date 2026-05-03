<script lang="ts">
	export let title: string;
	export let items: string[];
	export let variant: 'issues' | 'recommendations' = 'issues';

	const config = {
		issues: {
			dotColor: 'bg-red-500',
			titleColor: 'text-red-400',
			iconColor: '#f87171',
			iconBg: 'bg-red-950/60 border-red-900/60',
			cardBorder: 'border-zinc-800',
			icon: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`
		},
		recommendations: {
			dotColor: 'bg-teal-400',
			titleColor: 'text-teal-400',
			iconColor: '#2dd4bf',
			iconBg: 'bg-teal-950/60 border-teal-900/60',
			cardBorder: 'border-zinc-800',
			icon: `<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`
		}
	};

	$: c = config[variant];
</script>

<div class="bg-zinc-900 border {c.cardBorder} rounded-xl p-5">
	<div class="flex items-center gap-2.5 mb-4">
		<div class="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 {c.iconBg}">
			<svg
				width="13"
				height="13"
				viewBox="0 0 24 24"
				fill="none"
				stroke={c.iconColor}
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				{#if variant === 'issues'}
					<path
						d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
					/><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
				{:else}
					<polyline points="9 11 12 14 22 4" /><path
						d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
					/>
				{/if}
			</svg>
		</div>
		<span class="text-[11px] font-semibold uppercase tracking-widest {c.titleColor}">{title}</span>
	</div>

	<div class="divide-y divide-zinc-800/60">
		{#each items as item (item)}
			<div class="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
				<div class="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 {c.dotColor}"></div>
				<p class="text-[12px] text-zinc-400 leading-relaxed">{item}</p>
			</div>
		{/each}
	</div>
</div>
