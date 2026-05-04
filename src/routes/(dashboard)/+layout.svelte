<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { AuthChangeEvent } from '@supabase/supabase-js';

	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';

	onMount(() => {
		const supabase = $page.data.supabase;

		if (!supabase) return;

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
			if (event === 'SIGNED_OUT') {
				goto(resolve('/login'));
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<div class="flex h-screen bg-surface overflow-hidden">
	<Sidebar />

	<div class="flex-1 flex flex-col min-w-0 overflow-hidden">
		<Navbar />

		<main class="flex-1 overflow-y-auto">
			<!-- Page transition wrapper -->
			<div class="p-6 animate-in">
				<slot />
			</div>
		</main>
	</div>
</div>

<style>
	.animate-in {
		animation: fadeSlideIn 0.18s ease-out;
	}
	@keyframes fadeSlideIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
