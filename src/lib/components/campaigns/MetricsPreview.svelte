<script lang="ts">
	export let impressions: number = 0;
	export let clicks: number = 0;
	export let conversions: number = 0;
	export let cost: number = 0;

	$: ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
	$: cpc = clicks > 0 ? cost / clicks : 0;
	$: cpa = conversions > 0 ? cost / conversions : 0;

	function formatRp(n: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(n);
	}

	$: ctrQuality = ctr >= 4 ? 'good' : ctr >= 2 ? 'mid' : ctr > 0 ? 'bad' : 'empty';
	const qualityColor: Record<string, string> = {
		good: 'text-emerald-400',
		mid: 'text-amber-400',
		bad: 'text-red-400',
		empty: 'text-zinc-600'
	};
</script>

<div
	class="bg-indigo-950/40 border border-indigo-900/60 rounded-xl p-4 flex items-center justify-between gap-4"
>
	<div class="flex items-center gap-2">
		<div class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
		<span class="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider"
			>Preview Metrik</span
		>
	</div>

	<div class="flex gap-6">
		<div class="text-right">
			<p class="text-[13px] font-semibold {qualityColor[ctrQuality]}">
				{ctr.toFixed(2)}%
			</p>
			<p class="text-[10px] text-indigo-800 mt-0.5">CTR</p>
		</div>
		<div class="text-right">
			<p class="text-[13px] font-semibold text-indigo-200">
				{clicks > 0 ? formatRp(cpc) : '—'}
			</p>
			<p class="text-[10px] text-indigo-800 mt-0.5">CPC</p>
		</div>
		<div class="text-right">
			<p class="text-[13px] font-semibold text-indigo-200">
				{conversions > 0 ? formatRp(cpa) : '—'}
			</p>
			<p class="text-[10px] text-indigo-800 mt-0.5">CPA</p>
		</div>
	</div>
</div>
