<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { useCampaign } from '$lib/hooks/useCampaign.js';
	import type { AnalyzeResult } from '$lib/types/campaign.types';

	import AnalyzeLoading from '$lib/components/analyze/AnalyzeLoading.svelte';
	import AnalyzeSummary from '$lib/components/analyze/AnalyzeSummary.svelte';
	import AnalyzeList from '$lib/components/analyze/AnalyzeList.svelte';
	import AnalyzePriority from '$lib/components/analyze/AnalyzePriority.svelte';

	export let data;
	const { campaign } = data;
	const campaignRepository = useCampaign();

	type State = 'idle' | 'loading' | 'done' | 'error';

	let state: State = 'idle';
	let result: AnalyzeResult | null = null;
	let errorMsg = '';
	let analyzedAt: Date | null = null;

	const platformStyle: Record<string, string> = {
		Facebook: 'bg-blue-950 text-blue-400',
		Instagram: 'bg-pink-950 text-pink-400',
		Google: 'bg-amber-950 text-amber-400',
		TikTok: 'bg-violet-950 text-violet-400'
	};

	onMount(async () => {
		const historyId = get(page).url.searchParams.get('history');

		if (historyId) {
			await loadFromHistory(historyId);
		} else {
			await runAnalysis();
		}
	});

	async function loadFromHistory(historyId: string) {
		state = 'loading';
		errorMsg = '';

		try {
			const response = await campaignRepository.getAnalysisById(historyId);
			const history = response?.data;
			result = {
				summary: history.summary,
				issues: history.issues,
				recommendations: history.recommendations,
				priority_actions: history.priority_actions,
				campaign_name: history.campaign_name,
				campaign_platform: history.platform
			};
			analyzedAt = new Date(history.created_at);
			state = 'done';
		} catch {
			await runAnalysis();
		}
	}

	async function runAnalysis() {
		state = 'loading';
		errorMsg = '';
		result = null;

		try {
			const response = await campaignRepository.analyze(campaign?.id ?? '');
			result = response.data;
			analyzedAt = new Date();
			state = 'done';
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Analisis gagal, coba lagi';
			state = 'error';
		}
	}

	function formatAnalyzedAt(d: Date) {
		return (
			d.toLocaleDateString('id-ID', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			}) +
			', ' +
			d.toLocaleTimeString('id-ID', {
				hour: '2-digit',
				minute: '2-digit'
			}) +
			' WIB'
		);
	}
</script>

<div class="max-w-2xl mx-auto space-y-5">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-[12px] text-zinc-600">
		<a href={resolve('/campaigns')} class="hover:text-zinc-400 transition-colors">Campaigns</a>
		<span>/</span>
		<a
			href={resolve(`/campaigns/${campaign?.id}`)}
			class="hover:text-zinc-400 transition-colors truncate max-w-35"
		>
			{campaign?.name ?? result?.campaign_name}
		</a>
		<span>/</span>
		<span class="text-zinc-400">Analisis AI</span>
	</nav>

	<!-- Header -->
	<div>
		<h1 class="text-[20px] font-semibold text-zinc-100 tracking-tight mb-1">Analisis AI</h1>
		<p class="text-[13px] text-zinc-600">Hasil analisis performa oleh Gemini AI</p>
	</div>

	<!-- Campaign chip -->
	<div
		class="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-[11px] text-zinc-400"
	>
		<div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
		<span class="font-medium text-zinc-300">{campaign?.name ?? result?.campaign_name}</span>
		<span class="text-zinc-700">·</span>
		<span
			class="text-[10px] font-semibold px-1.5 py-0.5 rounded-md {platformStyle[
				campaign?.platform ?? result?.campaign_platform ?? ""
			] ?? 'bg-zinc-800 text-zinc-400'}"
		>
			{campaign?.platform ?? result?.campaign_platform}
		</span>
		<span class="text-zinc-700">·</span>
		<span>CTR {(campaign?.metrics?.ctr ?? 0 * 100).toFixed(2)}%</span>
	</div>

	<!-- State: loading -->
	{#if state === 'loading'}
		<AnalyzeLoading />

		<!-- State: error -->
	{:else if state === 'error'}
		<div class="bg-red-950/40 border border-red-900/60 rounded-xl p-6 text-center space-y-4">
			<div
				class="w-10 h-10 rounded-full bg-red-950 border border-red-900 flex items-center justify-center mx-auto"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#f87171"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<line x1="15" y1="9" x2="9" y2="15" />
					<line x1="9" y1="9" x2="15" y2="15" />
				</svg>
			</div>
			<div>
				<p class="text-[13px] font-medium text-red-300 mb-1">Analisis Gagal</p>
				<p class="text-[12px] text-red-800">{errorMsg}</p>
			</div>
			<button
				on:click={runAnalysis}
				class="inline-flex items-center gap-2 bg-red-950 border border-red-800 hover:border-red-700 text-red-400 text-[12px] font-medium px-4 py-2 rounded-lg transition-colors"
			>
				<svg
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="1 4 1 10 7 10" />
					<path d="M3.51 15a9 9 0 1 0 .49-4.5" />
				</svg>
				Coba Lagi
			</button>
		</div>

		<!-- State: done -->
	{:else if state === 'done' && result}
		<div class="space-y-4 animate-in">
			<AnalyzeSummary summary={result.summary} />

			<AnalyzeList title="Isu Teridentifikasi" items={result.issues} variant="issues" />

			<AnalyzeList title="Rekomendasi" items={result.recommendations} variant="recommendations" />

			<AnalyzePriority actions={result.priority_actions} />

			<!-- Footer -->
			<div class="flex items-center justify-between pt-1">
				<p class="text-[10px] text-zinc-700">
					{#if analyzedAt}
						Dianalisis: {formatAnalyzedAt(analyzedAt)} · Gemini 3.5 Flash Preview
					{/if}
				</p>
				<button
					on:click={runAnalysis}
					class="flex items-center gap-1.5 text-[11px] text-indigo-500 hover:text-indigo-400 border border-indigo-900/60 hover:border-indigo-800 bg-indigo-950/30 px-3 py-1.5 rounded-lg transition-colors"
				>
					<svg
						width="11"
						height="11"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="1 4 1 10 7 10" />
						<path d="M3.51 15a9 9 0 1 0 .49-4.5" />
					</svg>
					Analisis Ulang
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.animate-in {
		animation: fadeUp 0.25s ease-out;
	}
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
