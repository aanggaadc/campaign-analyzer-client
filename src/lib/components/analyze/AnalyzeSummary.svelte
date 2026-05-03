<script lang="ts">
	export let summary: string;
</script>

<div class="bg-indigo-950/40 border border-indigo-900/60 rounded-xl p-5">
	<div class="flex items-center gap-2.5 mb-3">
		<div
			class="w-7 h-7 rounded-lg bg-indigo-900/60 border border-indigo-800/60 flex items-center justify-center shrink-0"
		>
			<svg
				width="13"
				height="13"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#818cf8"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<line x1="12" y1="8" x2="12" y2="12" />
				<line x1="12" y1="16" x2="12.01" y2="16" />
			</svg>
		</div>
		<span class="text-[11px] font-semibold text-indigo-400 uppercase tracking-widest"
			>Ringkasan</span
		>
	</div>
	<p class="text-[13px] text-indigo-200 leading-relaxed">{summary}</p>
</div>
