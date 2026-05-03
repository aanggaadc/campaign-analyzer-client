<script lang="ts">
	export let actions: string[];
</script>

<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
	<div class="flex items-center gap-2.5 mb-4">
		<div
			class="w-7 h-7 rounded-lg bg-amber-950/60 border border-amber-900/60 flex items-center justify-center shrink-0"
		>
			<svg
				width="13"
				height="13"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#fbbf24"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
			</svg>
		</div>
		<span class="text-[11px] font-semibold text-amber-400 uppercase tracking-widest"
			>Prioritas Tindakan</span
		>
	</div>

	<div class="divide-y divide-zinc-800/60">
		{#each actions as action, i (action)}
			<div class="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
				<div
					class="w-5 h-5 rounded-md bg-indigo-950 border border-indigo-900 flex items-center justify-center shrink-0 mt-0.5"
				>
					<span class="text-[10px] font-bold text-indigo-400">{i + 1}</span>
				</div>
				<p class="text-[12px] text-zinc-300 leading-relaxed font-medium">{action}</p>
			</div>
		{/each}
	</div>
</div>
