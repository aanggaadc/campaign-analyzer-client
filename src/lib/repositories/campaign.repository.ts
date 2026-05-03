import { api } from '$lib/utils/api';
import type {
	Campaign,
	CreateCampaignDTO,
	AnalyzeResult,
	CampaignListResponse
} from '$lib/types/campaign.types';

export const campaignRepository = {
	async findAll(page = 1, limit = 10): Promise<CampaignListResponse> {
		return api.get(`/campaigns?page=${page}&limit=${limit}`);
	},

	async findById(id: string): Promise<Campaign> {
		return api.get(`/campaigns/${id}`);
	},

	async create(data: CreateCampaignDTO): Promise<Campaign> {
		return api.post('/campaigns', data);
	},

	async getMetrics(id: string) {
		return api.get(`/campaigns/${id}/metrics`);
	},

	async analyze(id: string): Promise<AnalyzeResult> {
		return api.get(`/campaigns/${id}/analyze`);
	}
};
