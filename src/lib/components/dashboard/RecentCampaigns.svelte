<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Campaign } from '$lib/types/campaign.types';

	export let campaigns: Campaign[] = [];

	const platformStyle: Record<string, string> = {
		Facebook: 'bg-blue-950 text-blue-400',
		Instagram: 'bg-pink-950 text-pink-400',
		Google: 'bg-amber-950 text-amber-400',
		TikTok: 'bg-violet-950 text-violet-400'
	};

	function ctrColor(ctr: number): string {
		if (ctr >= 0.04) return 'text-emerald-400';
		if (ctr >= 0.02) return 'text-amber-400';
		return 'text-red-400';
	}

	function formatRupiah(n: number): string {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(n);
	}
</script>

<div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
	<div class="flex items-center justify-between px-4 py-3.5 border-b border-zinc-800">
		<p class="text-[13px] font-semibold text-zinc-300">Kampanye Terbaru</p>
		<a
			href={resolve('/campaigns')}
			class="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
		>
			Lihat semua →
		</a>
	</div>

	{#if campaigns.length === 0}
		<div class="py-12 text-center text-zinc-600 text-sm">
			Belum ada kampanye.
			<a href={resolve('/campaigns/new')} class="text-indigo-400 hover:text-indigo-300"
				>Buat sekarang</a
			>
		</div>
	{:else}
		<div class="divide-y divide-zinc-800/60">
			{#each campaigns as c (c.id)}
				<div
					class="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-3 px-4 py-3 hover:bg-zinc-800/40 transition-colors"
				>
					<span class="text-[12px] text-zinc-300 font-medium truncate">{c.name}</span>

					<span
						class="text-[10px] px-2 py-0.5 rounded-full font-semibold w-fit {platformStyle[
							c.platform
						] ?? 'bg-zinc-800 text-zinc-400'}"
					>
						{c.platform}
					</span>

					<span class="text-[12px] text-zinc-500 text-right">{formatRupiah(c.cost)}</span>

					<span class="text-[12px] font-semibold text-right {ctrColor(c.metrics.ctr)}">
						{(c.metrics.ctr * 100).toFixed(2)}%
					</span>

					<a
						href={resolve(`/campaigns/${c.id}/analyze`)}
						class="text-[10px] text-indigo-400 bg-indigo-950 border border-indigo-900 hover:bg-indigo-900 transition-colors rounded-md px-2.5 py-1 whitespace-nowrap"
					>
						Analisis AI
					</a>
				</div>
			{/each}
		</div>
	{/if}
</div>
