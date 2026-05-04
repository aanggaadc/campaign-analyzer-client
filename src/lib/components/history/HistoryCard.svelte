<script lang="ts">
import { resolve } from '$app/paths';
	import type { AnalysisHistory } from '$lib/types/campaign.types';

	export let item: AnalysisHistory;

	const platformStyle: Record<string, string> = {
		Facebook: 'bg-blue-950 text-blue-400',
		Instagram: 'bg-pink-950 text-pink-400',
		Google: 'bg-amber-950 text-amber-400',
		TikTok: 'bg-violet-950 text-violet-400'
	};

	function ctrColor(ctr: number) {
		if (ctr >= 0.04) return 'bg-emerald-950 text-emerald-400';
		if (ctr >= 0.02) return 'bg-amber-950 text-amber-400';
		return 'bg-red-950 text-red-400';
	}

	function formatDate(iso: string) {
		const d = new Date(iso);
		return (
			d.toLocaleDateString('id-ID', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			}) +
			', ' +
			d.toLocaleTimeString('id-ID', {
				hour: '2-digit',
				minute: '2-digit'
			})
		);
	}
</script>

<a
	href={resolve(`/campaigns/${item.campaign_id}/analyze?history=${item.id}`)}
	class="block bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl overflow-hidden transition-colors group"
>
	<!-- Card Header -->
	<div class="flex items-center justify-between px-4 py-3.5">
		<div class="flex items-center gap-3 min-w-0">
			<!-- AI Icon -->
			<div
				class="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-900 flex items-center justify-center shrink-0"
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#818cf8"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
				</svg>
			</div>

			<div class="min-w-0">
				<p class="text-[13px] font-semibold text-zinc-200 truncate">{item.campaign_name}</p>
				<div class="flex items-center gap-2 mt-1">
					<span
						class="text-[10px] font-semibold px-2 py-0.5 rounded-full {platformStyle[
							item.platform
						] ?? 'bg-zinc-800 text-zinc-400'}"
					>
						{item.platform}
					</span>
					<span class="text-[10px] text-zinc-600">{formatDate(item.created_at)}</span>
				</div>
			</div>
		</div>

		<div class="flex items-center gap-2.5 shrink-0">
			<span class="text-[11px] font-semibold px-2 py-1 rounded-lg {ctrColor(item.ctr)}">
				CTR {(item.ctr * 100).toFixed(2)}%
			</span>
			<svg
				class="text-zinc-700 group-hover:text-zinc-500 transition-colors"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="9 18 15 12 9 6" />
			</svg>
		</div>
	</div>

	<!-- Summary preview -->
	<div class="px-4 pb-3 pl-13">
		<p class="text-[11px] text-zinc-600 leading-relaxed line-clamp-2">{item.summary}</p>
	</div>

	<!-- Footer counts -->
	<div class="flex items-center gap-4 px-4 py-2.5 border-t border-zinc-800/60 bg-zinc-950/40">
		<div class="flex items-center gap-1.5 text-[10px] text-zinc-600">
			<div class="w-1.5 h-1.5 rounded-full bg-red-500"></div>
			{item.issues.length} isu
		</div>
		<div class="flex items-center gap-1.5 text-[10px] text-zinc-600">
			<div class="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
			{item.recommendations.length} rekomendasi
		</div>
		<div class="flex items-center gap-1.5 text-[10px] text-zinc-600">
			<div class="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
			{item.priority_actions.length} prioritas
		</div>
		<span class="ml-auto text-[10px] text-indigo-500 group-hover:text-indigo-400 transition-colors">
			Lihat detail →
		</span>
	</div>
</a>
