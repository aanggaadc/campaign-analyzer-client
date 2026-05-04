import { useApi } from './usApi';
import { createCampaignRepository } from '$lib/repositories/campaign.repository';

export function useCampaign() {
  const api = useApi();
  return createCampaignRepository(api);
}
