<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { campaignRepository } from '$lib/repositories/campaign.repository';

	import CampaignMetrics from '$lib/components/campaigns/CampaignMetrics.svelte';
	import CampaignInfo from '$lib/components/campaigns/CampaignInfo.svelte';
	import DailyChart from '$lib/components/campaigns/DailyChart.svelte';
	import AiCta from '$lib/components/campaigns/AiCta.svelte';

	export let data;

	const { campaign } = data;

	const platformStyle: Record<string, string> = {
		Facebook: 'bg-blue-950 text-blue-400',
		Instagram: 'bg-pink-950 text-pink-400',
		Google: 'bg-amber-950 text-amber-400',
		TikTok: 'bg-violet-950 text-violet-400'
	};

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	// Delete campaign
	let deleting = false;
	let showConfirm = false;

	async function handleDelete() {
		if (!showConfirm) {
			showConfirm = true;
			return;
		}
		deleting = true;
		try {
			await campaignRepository.delete(campaign.id);
			goto(resolve('/campaigns'));
		} catch (e) {
			console.error(e);
			deleting = false;
			showConfirm = false;
		}
	}
</script>

<div class="max-w-3xl mx-auto space-y-5">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-[12px] text-zinc-600">
		<a href={resolve('/campaigns')} class="hover:text-zinc-400 transition-colors">Campaigns</a>
		<span>/</span>
		<span class="text-zinc-400 truncate max-w-50">{campaign.name}</span>
	</nav>

	<!-- Header -->
	<div class="flex items-start justify-between gap-4">
		<div class="space-y-2 min-w-0">
			<h1 class="text-[20px] font-semibold text-zinc-100 tracking-tight truncate">
				{campaign.name}
			</h1>
			<div class="flex items-center gap-2 flex-wrap">
				<span
					class="text-[10px] font-semibold px-2.5 py-1 rounded-full {platformStyle[
						campaign.platform
					] ?? 'bg-zinc-800 text-zinc-400'}"
				>
					{campaign.platform}
				</span>
				<span class="text-[11px] text-zinc-600">
					{formatDate(campaign.date_start)} — {formatDate(campaign.date_end)}
				</span>
			</div>
		</div>

		<!-- Actions -->
		<div class="flex items-center gap-2 shrink-0">
			{#if showConfirm}
				<span class="text-[11px] text-red-400">Yakin hapus?</span>
				<button
					on:click={() => (showConfirm = false)}
					class="text-[12px] text-zinc-500 hover:text-zinc-300 px-3 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
				>
					Batal
				</button>
			{/if}

			<button
				on:click={handleDelete}
				disabled={deleting}
				class="text-[12px] px-3 py-2 rounded-lg border transition-colors disabled:opacity-50"
				class:border-zinc-800={!showConfirm}
				class:text-zinc-500={!showConfirm}
				class:hover:border-red-900={!showConfirm}
				class:hover:text-red-400={!showConfirm}
				class:border-red-800={showConfirm}
				class:text-red-400={showConfirm}
				class:bg-red-950={showConfirm}
			>
				{deleting ? 'Menghapus...' : showConfirm ? 'Ya, Hapus' : 'Hapus'}
			</button>

			<a
				href={resolve(`/campaigns/${campaign.id}/analyze`)}
				class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[12px] px-4 py-2 rounded-lg transition-colors"
			>
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
					<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
				</svg>
				Analisis AI
			</a>
		</div>
	</div>

	<!-- Metric Cards -->
	<CampaignMetrics
		ctr={campaign.metrics.ctr}
		cpc={campaign.metrics.cpc}
		cpa={campaign.metrics.cpa}
	/>

	<!-- Info + Chart -->
	<div class="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4">
		<CampaignInfo {campaign} />
		<DailyChart
			totalClicks={campaign.clicks}
			dateStart={campaign.date_start}
			dateEnd={campaign.date_end}
		/>
	</div>

	<!-- AI CTA Banner -->
	<AiCta campaignId={campaign.id} />
</div>
