import { writable } from 'svelte/store'
import type { Campaign } from '$lib/types/campaign.types'

function createCampaignStore() {
  const { subscribe, set, update } = writable<Campaign[]>([])

  return {
    subscribe,
    setCampaigns: (campaigns: Campaign[]) => set(campaigns),
    addCampaign: (c: Campaign) => update(list => [c, ...list]),
    clear: () => set([])
  }
}

export const campaignStore = createCampaignStore()