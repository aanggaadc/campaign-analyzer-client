<script lang="ts">
	import type { Campaign } from '$lib/types/campaign.types';

	export let campaign: Campaign;

	function formatRp(n: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(n);
	}

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function formatNum(n: number) {
		return new Intl.NumberFormat('id-ID').format(n);
	}

	$: durationDays =
		campaign.date_start && campaign.date_end
			? Math.ceil(
					(new Date(campaign.date_end).getTime() - new Date(campaign.date_start).getTime()) /
						(1000 * 60 * 60 * 24)
				)
			: null;

	const rows = [
		{ key: 'Platform', val: () => campaign.platform },
		{ key: 'Total Biaya', val: () => formatRp(campaign.cost) },
		{ key: 'Impressions', val: () => formatNum(campaign.impressions ?? 0) },
		{ key: 'Total Klik', val: () => formatNum(campaign.clicks) },
		{ key: 'Konversi', val: () => formatNum(campaign.conversions) },
		{ key: 'Mulai', val: () => formatDate(campaign.date_start) },
		{ key: 'Selesai', val: () => formatDate(campaign.date_end) },
		{ key: 'Durasi', val: () => (durationDays ? `${durationDays} hari` : '—') }
	];
</script>

<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
	<p class="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-4">
		Detail Kampanye
	</p>

	<div class="divide-y divide-zinc-800/60">
		{#each rows as row (row.key)}
			<div class="flex items-center justify-between py-2.5">
				<span class="text-[12px] text-zinc-500">{row.key}</span>
				<span class="text-[12px] text-zinc-300 font-medium">{row.val()}</span>
			</div>
		{/each}
	</div>
</div>
