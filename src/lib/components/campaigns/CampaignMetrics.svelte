<script lang="ts">
	export let ctr: number = 0;
	export let cpc: number = 0;
	export let cpa: number = 0;

	function formatRp(n: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(n);
	}

	// Threshold warna CTR
	$: ctrColor = ctr >= 0.04 ? 'text-emerald-400' : ctr >= 0.02 ? 'text-amber-400' : 'text-red-400';

	$: ctrLabel =
		ctr >= 0.04 ? 'Performa baik' : ctr >= 0.02 ? 'Perlu perhatian' : 'Di bawah rata-rata';
</script>

<div class="grid grid-cols-3 gap-3">
	<!-- CTR -->
	<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
		<p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2">CTR</p>
		<p class="text-[22px] font-semibold tracking-tight leading-none {ctrColor}">
			{(ctr * 100).toFixed(2)}%
		</p>
		<p class="text-[10px] text-zinc-700 mt-2">{ctrLabel}</p>
	</div>

	<!-- CPC -->
	<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
		<p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2">CPC</p>
		<p class="text-[22px] font-semibold text-zinc-100 tracking-tight leading-none">
			{cpc > 0 ? formatRp(cpc) : '—'}
		</p>
		<p class="text-[10px] text-zinc-700 mt-2">Cost per klik</p>
	</div>

	<!-- CPA -->
	<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
		<p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2">CPA</p>
		<p class="text-[22px] font-semibold text-zinc-100 tracking-tight leading-none">
			{cpa > 0 ? formatRp(cpa) : '—'}
		</p>
		<p class="text-[10px] text-zinc-700 mt-2">Cost per konversi</p>
	</div>
</div>
