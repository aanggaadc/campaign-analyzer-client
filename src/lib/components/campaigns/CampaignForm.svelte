<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import { resolve } from '$app/paths';
	import MetricsPreview from './MetricsPreview.svelte';
	import type { CreateCampaignDTO } from '$lib/types/campaign.types';

	const dispatch = createEventDispatcher<{ submit: CreateCampaignDTO }>();

	// Form state
	let name = '';
	let platform = '';
	let impressions = 0;
	let clicks = 0;
	let conversions = 0;
	let cost = 0;
	let date_start = '';
	let date_end = '';

	// Validation state
	let errors: Record<string, string> = {};
	export let loading = false;
	export let serverError = '';

	const platforms = [
		'Facebook',
		'Instagram',
		'Google',
		'TikTok',
		'Twitter/X',
		'YouTube',
		'LinkedIn'
	];

	function validate(): boolean {
		errors = {};
		if (!name.trim()) errors.name = 'Nama campaign wajib diisi';
		if (!platform) errors.platform = 'Pilih platform';
		if (cost <= 0) errors.cost = 'Biaya harus lebih dari 0';
		if (impressions < 0) errors.impressions = 'Tidak boleh negatif';
		if (clicks < 0) errors.clicks = 'Tidak boleh negatif';
		if (clicks > impressions) errors.clicks = 'Klik tidak boleh melebihi impressions';
		if (conversions < 0) errors.conversions = 'Tidak boleh negatif';
		if (conversions > clicks) errors.conversions = 'Konversi tidak boleh melebihi klik';
		if (!date_start) errors.date_start = 'Tanggal mulai wajib diisi';
		if (!date_end) errors.date_end = 'Tanggal selesai wajib diisi';
		if (date_start && date_end && date_end < date_start) {
			errors.date_end = 'Tanggal selesai tidak boleh sebelum tanggal mulai';
		}
		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (!validate()) return;
		dispatch('submit', {
			name: name.trim(),
			platform,
			impressions,
			clicks,
			conversions,
			cost,
			date_start,
			date_end
		});
	}
</script>

<div class="space-y-5">
	<!-- Basic Info -->
	<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
		<p class="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">Informasi Dasar</p>

		<!-- Nama -->
		<div class="space-y-1.5">
			<label
				for="name"
				class="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"
			>
				Nama Campaign <span class="text-indigo-400">*</span>
			</label>
			<input
				id="name"
				bind:value={name}
				type="text"
				placeholder="Contoh: Ramadan Sale 2026"
				class="w-full bg-zinc-950 border rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-200 placeholder-zinc-700 outline-none transition-colors"
				class:border-zinc-800={!errors.name}
				class:border-red-500={errors.name}
				class:focus:border-indigo-500={!errors.name}
			/>
			{#if errors.name}
				<p class="text-[11px] text-red-400">{errors.name}</p>
			{/if}
		</div>

		<!-- Platform + Cost -->
		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-1.5">
				<label
					for="platform"
					class="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"
				>
					Platform <span class="text-indigo-400">*</span>
				</label>
				<div class="relative">
					<select
						id="platform"
						bind:value={platform}
						class="w-full bg-zinc-950 border rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-200 outline-none appearance-none transition-colors"
						class:border-zinc-800={!errors.platform}
						class:border-red-500={errors.platform}
					>
						<option value="" disabled selected>Pilih platform...</option>
						{#each platforms as p (p)}
							<option value={p}>{p}</option>
						{/each}
					</select>
					<svg
						class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"><polyline points="6 9 12 15 18 9" /></svg
					>
				</div>
				{#if errors.platform}
					<p class="text-[11px] text-red-400">{errors.platform}</p>
				{/if}
			</div>

			<div class="space-y-1.5">
				<label
					for="cost"
					class="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"
				>
					Total Biaya (IDR) <span class="text-indigo-400">*</span>
				</label>
				<input
					id="cost"
					bind:value={cost}
					type="number"
					min="0"
					placeholder="850000"
					class="w-full bg-zinc-950 border rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-200 placeholder-zinc-700 outline-none transition-colors"
					class:border-zinc-800={!errors.cost}
					class:border-red-500={errors.cost}
					class:focus:border-indigo-500={!errors.cost}
				/>
				{#if errors.cost}
					<p class="text-[11px] text-red-400">{errors.cost}</p>
				{:else}
					<p class="text-[10px] text-zinc-700">Dalam Rupiah, tanpa titik/koma</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- Metrik Performa -->
	<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
		<p class="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">Metrik Performa</p>

		<div class="grid grid-cols-3 gap-4">
			<!-- Impressions -->
			<div class="space-y-1.5">
				<label
					for="impressions"
					class="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"
				>
					Impressions <span class="text-indigo-400">*</span>
				</label>
				<input
					id="impressions"
					bind:value={impressions}
					type="number"
					min="0"
					placeholder="50000"
					class="w-full bg-zinc-950 border rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-200 placeholder-zinc-700 outline-none transition-colors"
					class:border-zinc-800={!errors.impressions}
					class:border-red-500={errors.impressions}
					class:focus:border-indigo-500={!errors.impressions}
				/>
				{#if errors.impressions}
					<p class="text-[11px] text-red-400">{errors.impressions}</p>
				{/if}
			</div>

			<!-- Clicks -->
			<div class="space-y-1.5">
				<label
					for="clicks"
					class="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"
				>
					Klik <span class="text-indigo-400">*</span>
				</label>
				<input
					id="clicks"
					bind:value={clicks}
					type="number"
					min="0"
					placeholder="2000"
					class="w-full bg-zinc-950 border rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-200 placeholder-zinc-700 outline-none transition-colors"
					class:border-zinc-800={!errors.clicks}
					class:border-red-500={errors.clicks}
					class:focus:border-indigo-500={!errors.clicks}
				/>
				{#if errors.clicks}
					<p class="text-[11px] text-red-400">{errors.clicks}</p>
				{/if}
			</div>

			<!-- Conversions -->
			<div class="space-y-1.5">
				<label
					for="conversions"
					class="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"
				>
					Konversi <span class="text-indigo-400">*</span>
				</label>
				<input
					id="conversions"
					bind:value={conversions}
					type="number"
					min="0"
					placeholder="150"
					class="w-full bg-zinc-950 border rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-200 placeholder-zinc-700 outline-none transition-colors"
					class:border-zinc-800={!errors.conversions}
					class:border-red-500={errors.conversions}
					class:focus:border-indigo-500={!errors.conversions}
				/>
				{#if errors.conversions}
					<p class="text-[11px] text-red-400">{errors.conversions}</p>
				{/if}
			</div>
		</div>

		<!-- Live metrics preview — reactive otomatis -->
		<MetricsPreview {impressions} {clicks} {conversions} {cost} />
	</div>

	<!-- Periode -->
	<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
		<p class="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">
			Periode Kampanye
		</p>

		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-1.5">
				<label
					for="date_start"
					class="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"
				>
					Tanggal Mulai <span class="text-indigo-400">*</span>
				</label>
				<input
					id="date_start"
					bind:value={date_start}
					type="date"
					class="w-full bg-zinc-950 border rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-200 outline-none transition-colors"
					class:border-zinc-800={!errors.date_start}
					class:border-red-500={errors.date_start}
					class:focus:border-indigo-500={!errors.date_start}
				/>
				{#if errors.date_start}
					<p class="text-[11px] text-red-400">{errors.date_start}</p>
				{/if}
			</div>

			<div class="space-y-1.5">
				<label
					for="date_end"
					class="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"
				>
					Tanggal Selesai <span class="text-indigo-400">*</span>
				</label>
				<input
					id="date_end"
					bind:value={date_end}
					type="date"
					min={date_start}
					class="w-full bg-zinc-950 border rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-200 outline-none transition-colors"
					class:border-zinc-800={!errors.date_end}
					class:border-red-500={errors.date_end}
					class:focus:border-indigo-500={!errors.date_end}
				/>
				{#if errors.date_end}
					<p class="text-[11px] text-red-400">{errors.date_end}</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- Server error -->
	{#if serverError}
		<div
			class="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 text-[13px] text-red-400 flex items-center gap-2"
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="shrink-0"
				><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line
					x1="12"
					y1="16"
					x2="12.01"
					y2="16"
				/></svg
			>
			{serverError}
		</div>
	{/if}

	<!-- Actions -->
	<div class="flex items-center justify-between pt-2">
		<a
			href={resolve("/campaigns")}
			class="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5"
		>
			<svg
				width="13"
				height="13"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg
			>
			Batal
		</a>

		<button
			on:click={handleSubmit}
			disabled={loading}
			class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-colors"
		>
			{#if loading}
				<svg
					class="animate-spin"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg
				>
				Menyimpan...
			{:else}
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
				>
				Simpan Campaign
			{/if}
		</button>
	</div>
</div>
