import type {
	Campaign,
	CreateCampaignDTO,
	AnalyzeResult,
	CampaignListResponse
} from '$lib/types/campaign.types';
import type { ApiClient } from '$lib/types/api';

export const createCampaignRepository = (api: ApiClient) => ({
	async findAll(page = 1, limit = 10): Promise<CampaignListResponse> {
		return api.get(`/campaigns?page=${page}&limit=${limit}`);
	},

	async findById(id: string): Promise<{data: Campaign}> {
		return api.get(`/campaigns/${id}`);
	},

	async create(data: CreateCampaignDTO): Promise<Campaign> {
		return api.post('/campaigns', data);
	},

	async getMetrics(id: string) {
		return api.get(`/campaigns/${id}/metrics`);
	},

	async analyze(id: string): Promise<{data: AnalyzeResult}> {
		return api.get(`/campaigns/${id}/analyze`);
	},

	async delete(id: string) {
		return api.delete(`/campaigns/${id}`);
	}
});
