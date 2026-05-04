<script lang="ts">
	import { onMount } from 'svelte';
	import { useCampaign } from '$lib/hooks/useCampaign';
	import StatsCard from '$lib/components/dashboard/StatsCard.svelte';
	import WeeklyChart from '$lib/components/dashboard/WeeklyChart.svelte';
	import PlatformChart from '$lib/components/dashboard/PlatformChart.svelte';
	import RecentCampaigns from '$lib/components/dashboard/RecentCampaigns.svelte';
	import type { Campaign } from '$lib/types/campaign.types';

	let campaigns: Campaign[] = [];
	let loading = true;

	const campaign = useCampaign();

	// Derived summary stats dari data kampanye
	$: totalSpend = campaigns.reduce((s, c) => s + c.cost, 0);
	$: totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
	$: totalConvs = campaigns.reduce((s, c) => s + c.conversions, 0);
	$: avgCTR = campaigns.length
		? campaigns.reduce((s, c) => s + c.metrics.ctr, 0) / campaigns.length
		: 0;

	// Data untuk chart mingguan (mock — ganti dengan endpoint real jika ada)
	const weekLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
	const weekClicks = [3200, 4100, 3800, 5000, 4400, 6100, 5800];
	const weekConvs = [120, 145, 132, 180, 160, 220, 210];

	// Data platform dari kampanye
	$: platformData = (() => {
		const colors: Record<string, string> = {
			Facebook: '#6366f1',
			Instagram: '#22d3ee',
			Google: '#f59e0b',
			TikTok: '#a78bfa'
		};
		const map: Record<string, number> = {};
		for (const c of campaigns) {
			map[c.platform] = (map[c.platform] ?? 0) + c.cost;
		}
		return Object.entries(map).map(([label, value]) => ({
			label,
			value,
			color: colors[label] ?? '#71717a'
		}));
	})();

	function formatRupiah(n: number) {
		if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}M`;
		if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}K`;
		return `Rp ${n}`;
	}

	function formatCount(n: number) {
		if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
		return String(n);
	}

	function getGreeting() {
		const h = new Date().getHours();
		if (h < 12) return 'Selamat pagi';
		if (h < 17) return 'Selamat siang';
		return 'Selamat malam';
	}

	function getDateLabel() {
		return new Date().toLocaleDateString('id-ID', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	onMount(async () => {
		try {
			const res = await campaign.findAll(1, 50);
			campaigns = res.data;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	});
</script>

<div class="space-y-5">
	<!-- Greeting -->
	<div>
		<h1 class="text-[20px] font-semibold text-zinc-100 tracking-tight">
			{getGreeting()} 👋
		</h1>
		<p class="text-[13px] text-zinc-600 mt-1">
			{getDateLabel()} — Berikut ringkasan performa kampanye kamu
		</p>
	</div>

	<!-- Stats Cards -->
	{#if loading}
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
			{#each Array(4) as number, index (index)}
				<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-pulse h-24">
					{number}
				</div>
			{/each}
		</div>
	{:else}
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
			<StatsCard
				label="Total Spend"
				value={formatRupiah(totalSpend)}
				delta="vs bulan lalu"
				deltaType="up"
			/>
			<StatsCard
				label="Total Klik"
				value={formatCount(totalClicks)}
				delta="vs bulan lalu"
				deltaType="up"
			/>
			<StatsCard
				label="Konversi"
				value={formatCount(totalConvs)}
				delta="vs bulan lalu"
				deltaType="up"
			/>
			<StatsCard
				label="Avg CTR"
				value="{(avgCTR * 100).toFixed(2)}%"
				delta="vs bulan lalu"
				deltaType={avgCTR > 0.03 ? 'up' : 'down'}
			/>
		</div>
	{/if}

	<!-- Charts Row -->
	<div class="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">
		<WeeklyChart labels={weekLabels} clicksData={weekClicks} conversionsData={weekConvs} />

		{#if platformData.length > 0}
			<PlatformChart data={platformData} />
		{:else}
			<div
				class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-center text-zinc-600 text-sm"
			>
				Belum ada data platform
			</div>
		{/if}
	</div>

	<!-- Recent Campaigns -->
	<RecentCampaigns campaigns={campaigns.slice(0, 5)} />
</div>
