<script lang="ts">
	import { onMount } from 'svelte';
	import { useCampaign } from '$lib/hooks/useCampaign';

	import HistoryCard from '$lib/components/history/HistoryCard.svelte';
	import HistoryEmpty from '$lib/components/history/HistoryEmpty.svelte';

	import type { AnalysisHistory } from '$lib/types/campaign.types';

	let items: AnalysisHistory[] = [];
	let loading = true;
	let error = '';
	let page = 1;
	let limit = 10;
	let meta = { total: 0, total_pages: 1 };

	// Filter state
	let search = '';
	let selectedPlatform = '';
	const platforms = ['Facebook', 'Instagram', 'Google', 'TikTok'];

	const campaignRepository = useCampaign();

	onMount(loadHistory);

	async function loadHistory() {
		loading = true;
		error = '';
		try {
			const res = await campaignRepository.getAnalysisHistory(page, limit);
			items = res.data;
			meta = res.meta;
		} catch (e) {
			const errorMessage = e instanceof Error ? e.message : 'Gagal memuat riwayat';
			error = errorMessage;
		} finally {
			loading = false;
		}
	}

	async function goToPage(p: number) {
		if (p < 1 || p > meta.total_pages || p === page) return;
		page = p;
		await loadHistory();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// Filter di client-side (search & platform)
	$: filtered = items.filter((item) => {
		const matchSearch =
			search.trim() === '' || item.campaign_name.toLowerCase().includes(search.toLowerCase());
		const matchPlatform = selectedPlatform === '' || item.platform === selectedPlatform;
		return matchSearch && matchPlatform;
	});

	$: startItem = meta.total === 0 ? 0 : (page - 1) * limit + 1;
	$: endItem = Math.min(page * limit, meta.total);

	$: pageNumbers = (() => {
		const total = meta.total_pages;
		if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
		if (page <= 3) return [1, 2, 3, 4, 5];
		if (page >= total - 2) return [total - 4, total - 3, total - 2, total - 1, total];
		return [page - 2, page - 1, page, page + 1, page + 2];
	})();
</script>

<div class="space-y-6">
	<!-- Header -->
	<div>
		<h1 class="text-[20px] font-semibold text-zinc-100 tracking-tight">Analysis History</h1>
		<p class="text-[13px] text-zinc-600 mt-1">Riwayat analisis AI dari semua kampanye kamu</p>
	</div>

	<!-- Filter row -->
	<div class="flex items-center gap-3">
		<!-- Search -->
		<div
			class="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 flex-1 max-w-xs focus-within:border-zinc-700 transition-colors"
		>
			<svg
				width="13"
				height="13"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#52525b"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				bind:value={search}
				type="search"
				placeholder="Cari nama campaign..."
				class="bg-transparent text-[12px] text-zinc-300 placeholder-zinc-600 outline-none w-full"
			/>
		</div>

		<!-- Platform filter -->
		<div class="relative">
			<select
				bind:value={selectedPlatform}
				class="appearance-none bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg px-3 py-2 pr-7 text-[12px] text-zinc-400 outline-none transition-colors cursor-pointer"
			>
				<option value="">Semua Platform</option>
				{#each platforms as p (p)}
					<option value={p}>{p}</option>
				{/each}
			</select>
			<svg
				class="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"
				width="11"
				height="11"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<polyline points="6 9 12 15 18 9" />
			</svg>
		</div>

		<!-- Total count -->
		{#if !loading}
			<p class="text-[12px] text-zinc-600 ml-auto">
				{#if search || selectedPlatform}
					{filtered.length} dari {meta.total} hasil
				{:else}
					{meta.total} riwayat
				{/if}
			</p>
		{/if}
	</div>

	<!-- Loading skeleton -->
	{#if loading}
		<div class="space-y-3">
			{#each Array(4) as number, i (i)}
				<div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden animate-pulse">
					<div class="flex items-center gap-3 px-4 py-3.5">
						<div class="w-8 h-8 rounded-lg bg-zinc-800 shrink-0">{number}</div>
						<div class="flex-1 space-y-2">
							<div class="h-3.5 w-40 bg-zinc-800 rounded"></div>
							<div class="h-2.5 w-24 bg-zinc-800 rounded"></div>
						</div>
						<div class="h-6 w-20 bg-zinc-800 rounded-lg"></div>
					</div>
					<div class="px-4 pb-3 pl-13">
						<div class="h-2.5 w-full bg-zinc-800 rounded mb-1.5"></div>
						<div class="h-2.5 w-3/4 bg-zinc-800 rounded"></div>
					</div>
					<div class="px-4 py-2.5 border-t border-zinc-800 flex gap-4">
						<div class="h-2.5 w-12 bg-zinc-800 rounded"></div>
						<div class="h-2.5 w-16 bg-zinc-800 rounded"></div>
						<div class="h-2.5 w-14 bg-zinc-800 rounded"></div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Error -->
	{:else if error}
		<div class="text-center py-16 space-y-3">
			<p class="text-[13px] text-red-400">{error}</p>
			<button
				on:click={loadHistory}
				class="text-[12px] text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors"
			>
				Coba lagi
			</button>
		</div>

		<!-- Empty (tidak ada data sama sekali) -->
	{:else if items.length === 0}
		<HistoryEmpty />

		<!-- Empty (filter tidak cocok) -->
	{:else if filtered.length === 0}
		<div class="text-center py-16 space-y-2">
			<p class="text-[13px] text-zinc-500">Tidak ada hasil untuk filter ini</p>
			<button
				on:click={() => {
					search = '';
					selectedPlatform = '';
				}}
				class="text-[12px] text-indigo-400 hover:text-indigo-300 transition-colors"
			>
				Reset filter
			</button>
		</div>

		<!-- List -->
	{:else}
		<div class="space-y-3">
			{#each filtered as item (item.id)}
				<HistoryCard {item} />
			{/each}
		</div>

		<!-- Pagination -->
		{#if meta.total_pages > 1 && !search && !selectedPlatform}
			<div class="flex items-center justify-between pt-2">
				<p class="text-[12px] text-zinc-600">
					Menampilkan <span class="text-zinc-400">{startItem}–{endItem}</span>
					dari <span class="text-zinc-400">{meta.total}</span>
				</p>

				<div class="flex items-center gap-1">
					<button
						on:click={() => goToPage(page - 1)}
						disabled={page === 1}
						class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
						aria-label="Sebelumnya"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg
						>
					</button>

					{#if pageNumbers[0] > 1}
						<button
							on:click={() => goToPage(1)}
							class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-[12px] text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
							>1</button
						>
						{#if pageNumbers[0] > 2}<span class="w-8 text-center text-[12px] text-zinc-700">…</span
							>{/if}
					{/if}

					{#each pageNumbers as p (p)}
						<button
							on:click={() => goToPage(p)}
							class="w-8 h-8 flex items-center justify-center rounded-lg border text-[12px] font-medium transition-colors"
							class:border-indigo-600={p === page}
							class:bg-indigo-600={p === page}
							class:text-white={p === page}
							class:border-zinc-800={p !== page}
							class:text-zinc-500={p !== page}
							class:hover:border-zinc-700={p !== page}
							class:hover:text-zinc-300={p !== page}>{p}</button
						>
					{/each}

					{#if pageNumbers[pageNumbers.length - 1] < meta.total_pages}
						{#if pageNumbers[pageNumbers.length - 1] < meta.total_pages - 1}<span
								class="w-8 text-center text-[12px] text-zinc-700">…</span
							>{/if}
						<button
							on:click={() => goToPage(meta.total_pages)}
							class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-[12px] text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
							>{meta.total_pages}</button
						>
					{/if}

					<button
						on:click={() => goToPage(page + 1)}
						disabled={page === meta.total_pages}
						class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
						aria-label="Berikutnya"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg
						>
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>
