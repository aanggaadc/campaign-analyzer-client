<script lang="ts">
	import { resolve } from '$app/paths';
	import { useCampaign } from '$lib/hooks/useCampaign';
	import CsvDropzone from '$lib/components/csv/CsvDropzone.svelte';
	import CsvPreviewTable from '$lib/components/csv/CsvPreviewTable.svelte';
	import CsvResultSummary from '$lib/components/csv/CsvResultSummary.svelte';
	import type { CsvUploadResult } from '$lib/types/campaign.types';

	type PageState = 'idle' | 'uploading' | 'done' | 'error';

	let state: PageState = 'idle';
	let selectedFile: File | null = null;
	let uploadResult: CsvUploadResult | null = null;
	let uploadError = '';

	const campaignRepository = useCampaign();

	function handleFileSelected(e: CustomEvent<File>) {
		selectedFile = e.detail;
		handleUpload();
	}

	function removeFile() {
		selectedFile = null;
		uploadResult = null;
		state = 'idle';
	}

	async function handleUpload() {
		if (!selectedFile) return;

		state = 'uploading';
		uploadError = '';

		try {
			uploadResult = await campaignRepository.uploadCsv(selectedFile);
			state = 'done';
		} catch (e) {
			uploadError = e instanceof Error ? e.message : 'Upload gagal, coba lagi';
			state = 'error';
		}
	}

	function formatFileSize(bytes: number) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
	}

	$: failedCount = uploadResult?.failed ?? 0;
</script>

<div class="max-w-3xl mx-auto space-y-6">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-[12px] text-zinc-600">
		<a href={resolve('/campaigns')} class="hover:text-zinc-400 transition-colors">Campaigns</a>
		<span>/</span>
		<span class="text-zinc-400">Import CSV</span>
	</nav>

	<!-- Header -->
	<div>
		<h1 class="text-[20px] font-semibold text-zinc-100 tracking-tight">Import CSV</h1>
		<p class="text-[13px] text-zinc-600 mt-1">Upload data kampanye secara massal dari file CSV</p>
	</div>

	<!-- Format info -->
	<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
		<p class="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">
			Format CSV yang Diharapkan
		</p>
		<div class="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 overflow-x-auto">
			<code class="text-[11px] text-indigo-300 font-mono whitespace-nowrap">
				name, platform, impressions, clicks, conversions, cost, date_start, date_end
			</code>
		</div>
	</div>

	<!-- IDLE -->
	{#if state === 'idle'}
		<CsvDropzone on:file={handleFileSelected} />

		<!-- UPLOADING -->
	{:else if state === 'uploading'}
		<div class="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4">
			<svg
				class="animate-spin"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="white"
				stroke-width="2"
			>
				<path d="M21 12a9 9 0 1 1-6.219-8.56" />
			</svg>
			<p class="text-[13px] text-zinc-300">Mengupload & memvalidasi file...</p>
		</div>

		<!-- DONE -->
	{:else if state === 'done' && uploadResult}
		<!-- File info -->
		<div class="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
			<div class="flex-1 min-w-0">
				<p class="text-[13px] font-medium text-zinc-300 truncate">
					{selectedFile?.name}
				</p>
				<p class="text-[11px] text-zinc-600">
					{uploadResult.rows.length} baris · {formatFileSize(selectedFile?.size ?? 0)}
				</p>
			</div>
			<button
				on:click={removeFile}
				class="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors px-2"
			>
				Ganti file
			</button>
		</div>

		<!-- Summary -->
		{#if failedCount === 0}
			<CsvResultSummary result={uploadResult} />
		{/if}

		<!-- Success / Error Info -->
		{#if failedCount === 0}
			<div class="text-green-400 text-[13px]">
				✅ Semua data berhasil diimport ({uploadResult.imported} data)
			</div>
		{:else}
			<div class="text-red-400 text-[13px]">
				⚠️ Ada {failedCount} data tidak valid. Perbaiki file lalu upload ulang.
			</div>
		{/if}

		<!-- Table -->
		<CsvPreviewTable rows={uploadResult.rows} totalRows={uploadResult.rows.length} />

		<!-- Actions -->
		<div class="flex items-center justify-between pt-2">
			<button
				on:click={removeFile}
				class="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors"
			>
				Import File Lain
			</button>

			{#if failedCount === 0}
				<a
					href={resolve('/campaigns')}
					class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-colors"
				>
					Lihat Campaigns →
				</a>
			{/if}
		</div>

		<!-- ERROR -->
	{:else if state === 'error'}
		<div class="bg-red-950/40 border border-red-900/60 rounded-xl p-5 space-y-3">
			<p class="text-[13px] font-medium text-red-300">Gagal memproses file</p>
			<p class="text-[12px] text-red-700">{uploadError}</p>
			<button on:click={removeFile} class="text-[12px] text-red-400 hover:text-red-300 underline">
				Coba file lain
			</button>
		</div>
	{/if}
</div>
