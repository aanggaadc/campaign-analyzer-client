import { page } from '$app/stores';
import { get } from 'svelte/store';
import { createApi } from '$lib/utils/api';

export function useApi() {
  const { supabase } = get(page).data;

  if (!supabase) throw new Error('No supabase');

  return createApi(supabase);
}