<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="flex flex-col items-center justify-center py-20 space-y-4 text-center">
	<div
		class="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center"
	>
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#3f3f46"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
		</svg>
	</div>
	<div>
		<p class="text-[13px] font-medium text-zinc-500">Belum ada riwayat analisis</p>
		<p class="text-[12px] text-zinc-700 mt-1">Buka campaign dan klik "Analisis AI" untuk memulai</p>
	</div>
	<a
		href={resolve("/campaigns")}
		class="text-[12px] text-indigo-400 hover:text-indigo-300 border border-indigo-900/60 hover:border-indigo-800 bg-indigo-950/30 px-4 py-2 rounded-lg transition-colors"
	>
		Lihat Campaigns →
	</a>
</div>
