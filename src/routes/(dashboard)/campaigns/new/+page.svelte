<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import CampaignForm from '$lib/components/campaigns/CampaignForm.svelte';
	import { campaignService } from '$lib/services/campaign.service';
	import type { CreateCampaignDTO } from '$lib/types/campaign.types';

	let loading = false;
	let serverError = '';

	async function handleSubmit(event: CustomEvent<CreateCampaignDTO>) {
		loading = true;
		serverError = '';

		try {
			const campaign = await campaignService.create(event.detail);
			// Redirect ke halaman detail campaign yang baru dibuat
			goto(resolve(`/campaigns/${campaign.id}`));
		} catch (e) {
			const errorMessage = e instanceof Error ? e.message: "Terjadi kesalahan, coba lagi"
			serverError = errorMessage
		} finally {
			loading = false;
		}
	}
</script>

<div class="max-w-2xl mx-auto space-y-6">
	<div>
		<h1 class="text-[20px] font-semibold text-zinc-100 tracking-tight">Buat Campaign Baru</h1>
		<p class="text-[13px] text-zinc-600 mt-1">
			Isi detail kampanye untuk mendapatkan analisis dan rekomendasi AI
		</p>
	</div>

	<CampaignForm {loading} {serverError} on:submit={handleSubmit} />
</div>
