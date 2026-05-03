import { error } from '@sveltejs/kit';
import { campaignRepository } from '$lib/repositories/campaign.repository';

export async function load({
	params
}: {
	params: {
		id: string;
	};
}) {
	try {
		const campaign = await campaignRepository.findById(params.id);
		return { campaign };
	} catch {
		throw error(404, 'Campaign tidak ditemukan');
	}
}
