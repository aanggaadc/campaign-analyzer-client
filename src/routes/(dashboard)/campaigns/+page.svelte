<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { campaignRepository } from '$lib/repositories/campaign.repository';
	import { campaignStore } from '$lib/stores/campaign.store';
	import type { Campaign } from '$lib/types/campaign.types';

	let campaigns: Campaign[] = [];
	let loading = true;
	let error = '';
	let page = 1;
	let limit = 10;
	let meta = {
		total: 0,
		total_pages: 1
	};

	onMount(loadCampaigns);

	async function loadCampaigns() {
		loading = true;
		error = '';
		try {
			const res = await campaignRepository.findAll(page, limit);
			campaigns = res.data;
			meta = res.meta;
			campaignStore.setCampaigns(campaigns);
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	async function goToPage(p: number) {
		if (p < 1 || p > meta.total_pages || p === page) return;
		page = p;
		await loadCampaigns();
		// Scroll ke atas tabel setelah ganti halaman
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	// Generate nomor halaman yang ditampilkan (max 5 angka)
	$: pageNumbers = (() => {
		const total = meta.total_pages;
		if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

		if (page <= 3) return [1, 2, 3, 4, 5];
		if (page >= total - 2) return [total - 4, total - 3, total - 2, total - 1, total];

		return [page - 2, page - 1, page, page + 1, page + 2];
	})();

	$: startItem = meta.total === 0 ? 0 : (page - 1) * limit + 1;
	$: endItem = Math.min(page * limit, meta.total);

	function formatCurrency(n: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(n);
	}

	function platformColor(platform: string) {
		const map: Record<string, string> = {
			Facebook: 'bg-blue-500/20 text-blue-400',
			Instagram: 'bg-pink-500/20 text-pink-400',
			Google: 'bg-yellow-500/20 text-yellow-400',
			TikTok: 'bg-purple-500/20 text-purple-400'
		};
		return map[platform] ?? 'bg-zinc-500/20 text-zinc-400';
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold text-zinc-100">Campaigns</h1>
			<p class="text-zinc-500 text-sm mt-1">
				{meta.total} campaign total
			</p>
		</div>
		<a
			href={resolve('/campaigns/new')}
			class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
		>
			+ Tambah Campaign
		</a>
	</div>

	{#if loading}
		<!-- Skeleton loader -->
		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-zinc-800">
						<th class="text-left text-zinc-500 font-medium px-6 py-4">Nama</th>
						<th class="text-left text-zinc-500 font-medium px-6 py-4">Platform</th>
						<th class="text-right text-zinc-500 font-medium px-6 py-4">CTR</th>
						<th class="text-right text-zinc-500 font-medium px-6 py-4">CPC</th>
						<th class="text-right text-zinc-500 font-medium px-6 py-4">CPA</th>
						<th class="text-right text-zinc-500 font-medium px-6 py-4">Cost</th>
						<th class="px-6 py-4"></th>
					</tr>
				</thead>
				<tbody>
					{#each Array(limit) as number, i (i)}
						<tr class="border-b border-zinc-800/50">
							<td class="px-6 py-4"
								><div class="h-3.5 w-36 bg-zinc-800 rounded animate-pulse"></div>
								{number}</td
							>
							<td class="px-6 py-4"
								><div class="h-5 w-20 bg-zinc-800 rounded-lg animate-pulse"></div>
								{number}</td
							>
							<td class="px-6 py-4 text-right"
								><div class="h-3.5 w-12 bg-zinc-800 rounded animate-pulse ml-auto"></div>
								{number}</td
							>
							<td class="px-6 py-4 text-right"
								><div class="h-3.5 w-16 bg-zinc-800 rounded animate-pulse ml-auto"></div>
								{number}</td
							>
							<td class="px-6 py-4 text-right"
								><div class="h-3.5 w-16 bg-zinc-800 rounded animate-pulse ml-auto"></div>
								{number}</td
							>
							<td class="px-6 py-4 text-right"
								><div class="h-3.5 w-20 bg-zinc-800 rounded animate-pulse ml-auto"></div>
								{number}</td
							>
							<td class="px-6 py-4 text-right"
								><div class="h-3.5 w-10 bg-zinc-800 rounded animate-pulse ml-auto"></div>
								{number}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else if error}
		<div class="text-center py-20 text-red-400 space-y-3">
			<p>{error}</p>
			<button
				on:click={loadCampaigns}
				class="text-sm text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors"
			>
				Coba lagi
			</button>
		</div>
	{:else if campaigns.length === 0}
		<div class="text-center py-20 space-y-2">
			<p class="text-zinc-500">Belum ada campaign.</p>
			<a
				href={resolve('/campaigns/new')}
				class="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
			>
				Buat yang pertama →
			</a>
		</div>
	{:else}
		<!-- Tabel -->
		<div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-zinc-800">
						<th class="text-left text-zinc-500 font-medium px-6 py-4">Nama</th>
						<th class="text-left text-zinc-500 font-medium px-6 py-4">Platform</th>
						<th class="text-right text-zinc-500 font-medium px-6 py-4">CTR</th>
						<th class="text-right text-zinc-500 font-medium px-6 py-4">CPC</th>
						<th class="text-right text-zinc-500 font-medium px-6 py-4">CPA</th>
						<th class="text-right text-zinc-500 font-medium px-6 py-4">Cost</th>
						<th class="px-6 py-4"></th>
					</tr>
				</thead>
				<tbody>
					{#each campaigns as c (c.id)}
						<tr class="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
							<td class="px-6 py-4 text-zinc-100 font-medium">{c.name}</td>
							<td class="px-6 py-4">
								<span class="px-2 py-1 rounded-lg text-xs font-medium {platformColor(c.platform)}">
									{c.platform}
								</span>
							</td>
							<td class="px-6 py-4 text-right text-zinc-300">{(c.metrics.ctr * 100).toFixed(2)}%</td
							>
							<td class="px-6 py-4 text-right text-zinc-300">{formatCurrency(c.metrics.cpc)}</td>
							<td class="px-6 py-4 text-right text-zinc-300">{formatCurrency(c.metrics.cpa)}</td>
							<td class="px-6 py-4 text-right text-zinc-300">{formatCurrency(c.cost)}</td>
							<td class="px-6 py-4 text-right">
								<a
									href={resolve(`/campaigns/${c.id}`)}
									class="text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
								>
									Detail →
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<!-- Pagination Footer -->
			<div class="flex items-center justify-between px-6 py-4 border-t border-zinc-800">
				<!-- Info kiri: "Menampilkan 1–10 dari 48" -->
				<p class="text-xs text-zinc-600">
					{#if meta.total > 0}
						Menampilkan <span class="text-zinc-400">{startItem}–{endItem}</span>
						dari
						<span class="text-zinc-400">{meta.total}</span> campaign
					{:else}
						Tidak ada data
					{/if}
				</p>

				<!-- Controls kanan -->
				{#if meta.total_pages > 1}
					<div class="flex items-center gap-1">
						<!-- Prev -->
						<button
							on:click={() => goToPage(page - 1)}
							disabled={page === 1 || loading}
							class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
							aria-label="Halaman sebelumnya"
						>
							<svg
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<polyline points="15 18 9 12 15 6" />
							</svg>
						</button>

						<!-- First page + ellipsis -->
						{#if pageNumbers[0] > 1}
							<button
								on:click={() => goToPage(1)}
								class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-xs text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
								>1</button
							>
							{#if pageNumbers[0] > 2}
								<span class="w-8 text-center text-xs text-zinc-700">…</span>
							{/if}
						{/if}

						<!-- Page numbers -->
						{#each pageNumbers as p (p)}
							<button
								on:click={() => goToPage(p)}
								disabled={loading}
								class="w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-medium transition-colors disabled:cursor-not-allowed"
								class:border-indigo-600={p === page}
								class:bg-indigo-600={p === page}
								class:text-white={p === page}
								class:border-zinc-800={p !== page}
								class:text-zinc-500={p !== page}
								class:hover:border-zinc-700={p !== page}
								class:hover:text-zinc-300={p !== page}
							>
								{p}
							</button>
						{/each}

						<!-- Last page + ellipsis -->
						{#if pageNumbers[pageNumbers.length - 1] < meta.total_pages}
							{#if pageNumbers[pageNumbers.length - 1] < meta.total_pages - 1}
								<span class="w-8 text-center text-xs text-zinc-700">…</span>
							{/if}
							<button
								on:click={() => goToPage(meta.total_pages)}
								class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-xs text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
							>
								{meta.total_pages}
							</button>
						{/if}

						<!-- Next -->
						<button
							on:click={() => goToPage(page + 1)}
							disabled={page === meta.total_pages || loading}
							class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
							aria-label="Halaman berikutnya"
						>
							<svg
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<polyline points="9 18 15 12 9 6" />
							</svg>
						</button>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
