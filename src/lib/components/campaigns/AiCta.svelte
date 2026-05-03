<script lang="ts">
import { resolve } from "$app/paths";
	export let campaignId: string;
</script>

<a
	href={resolve(`/campaigns/${campaignId}/analyze`)}
	class="block bg-indigo-950/50 border border-indigo-900/70 hover:border-indigo-700 rounded-xl p-5 transition-colors group"
>
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-start gap-3">
			<!-- Icon -->
			<div
				class="w-9 h-9 rounded-lg bg-indigo-900/60 border border-indigo-800/60 flex items-center justify-center shrink-0 mt-0.5"
			>
				<svg
					width="16"
					height="16"
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

			<div>
				<p class="text-[13px] font-semibold text-indigo-200 mb-1">Dapatkan Analisis AI</p>
				<p class="text-[11px] text-indigo-800 leading-relaxed">
					Insight otomatis dari Gemini AI — identifikasi isu performa, rekomendasi optimasi, dan
					prioritas tindakan yang perlu diambil.
				</p>
			</div>
		</div>

		<div
			class="flex items-center gap-1.5 text-[12px] font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0"
		>
			Mulai Analisis
			<svg
				width="13"
				height="13"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="5" y1="12" x2="19" y2="12" />
				<polyline points="12 5 19 12 12 19" />
			</svg>
		</div>
	</div>
</a>
