import { createServerApi } from '$lib/utils/api-server';
import { createCampaignRepository } from '$lib/repositories/campaign.repository';

import type { PageServerLoad } from './$types';
import type { ApiClient } from '$lib/types/api';

export const load: PageServerLoad = async ({ locals, params, fetch, url }) => {
	const { session } = await locals.safeGetSession();

	const history = url.searchParams.get('history');

	if (history) {
		return {
			campaign: null
		};
	}

	const api = createServerApi(fetch, session?.access_token);
	const repo = createCampaignRepository(api as ApiClient);

	const campaign = await repo.findById(params.id);

	return {
		campaign: campaign.data
	};
};
