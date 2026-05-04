<!-- <script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/utils/supabase';

	onMount(async () => {
		const {
			data: { session }
		} = await supabase.auth.getSession();

		goto(resolve(session ? '/dashboard' : '/login'));
	});
</script> -->
