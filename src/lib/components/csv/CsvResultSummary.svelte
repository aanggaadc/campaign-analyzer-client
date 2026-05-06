<script lang="ts">
	import type { CsvUploadResult } from '$lib/types/campaign.types';
	export let result: CsvUploadResult;

	$: isSuccess = result.failed === 0;
</script>

<div class="space-y-4">
	<div
		class={`rounded-xl p-4 border ${
			isSuccess ? 'bg-emerald-950/40 border-emerald-900/60' : 'bg-red-950/40 border-red-900/60'
		}`}
	>
		{#if isSuccess}
			<p class="text-[26px] font-semibold text-emerald-400 tracking-tight">
				{result.imported}
			</p>
			<p class="text-[11px] text-emerald-800 mt-1">Semua data berhasil diimport</p>
		{:else}
			<p class="text-[16px] font-semibold text-red-400 tracking-tight">Import gagal</p>
			<p class="text-[11px] text-red-800 mt-1">
				Terdapat data tidak valid. Perbaiki file dan upload ulang.
			</p>
		{/if}
	</div>

	<!-- Global errors -->
	{#if result.errors && result.errors.length > 0}
		<div class="bg-red-950/30 border border-red-900/50 rounded-xl p-4 space-y-1.5">
			<p class="text-[11px] font-semibold text-red-400 uppercase tracking-wider mb-2">
				Error Global
			</p>
			{#each result.errors as err (err)}
				<div class="flex items-start gap-2 text-[12px] text-red-400">
					<span class="mt-0.5 shrink-0">•</span>
					<span>{err}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
