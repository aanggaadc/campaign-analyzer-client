<script lang="ts">
	export let label: string;
	export let value: string;
	export let delta: string;
	export let deltaType: 'up' | 'down' | 'neutral' = 'neutral';
</script>

<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
	<p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-2">{label}</p>
	<p class="text-[22px] font-semibold text-zinc-100 tracking-tight leading-none">{value}</p>
	<p
		class="text-[11px] mt-2 flex items-center gap-1"
		class:text-emerald-400={deltaType === 'up'}
		class:text-red-400={deltaType === 'down'}
		class:text-zinc-600={deltaType === 'neutral'}
	>
		{#if deltaType === 'up'}↑{:else if deltaType === 'down'}↓{/if}
		{delta}
	</p>
</div>
