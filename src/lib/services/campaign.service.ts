import { useCampaign } from '$lib/hooks/useCampaign';
import type { CreateCampaignDTO } from '$lib/types/campaign.types';

const campaignRepository = useCampaign();

export const campaignService = {
	async create(dto: CreateCampaignDTO) {
		if (!dto.name.trim()) throw new Error('Nama campaign wajib diisi');
		if (!dto.platform) throw new Error('Platform wajib dipilih');
		if (dto.impressions < 0 || dto.clicks < 0 || dto.conversions < 0) {
			throw new Error('Metrik tidak boleh negatif');
		}
		if (dto.clicks > dto.impressions) {
			throw new Error('Klik tidak boleh melebihi impressions');
		}
		if (dto.conversions > dto.clicks) {
			throw new Error('Konversi tidak boleh melebihi klik');
		}
		if (new Date(dto.date_end) < new Date(dto.date_start)) {
			throw new Error('Tanggal selesai tidak boleh sebelum tanggal mulai');
		}

		return campaignRepository.create(dto);
	}
};
