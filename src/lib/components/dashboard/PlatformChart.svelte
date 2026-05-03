<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Chart } from 'chart.js';

	export let data: { label: string; value: number; color: string }[] = [];

	let canvas: HTMLCanvasElement;
	let chart: Chart;

	const total = data.reduce((s, d) => s + d.value, 0);

	onMount(async () => {
		const { Chart, registerables } = await import('chart.js');
		Chart.register(...registerables);

		chart = new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: data.map((d) => d.label),
				datasets: [
					{
						data: data.map((d) => d.value),
						backgroundColor: data.map((d) => d.color),
						borderWidth: 0,
						hoverOffset: 4
					}
				]
			},
			options: {
				responsive: false,
				cutout: '72%',
				plugins: { legend: { display: false } }
			}
		});
	});

	onDestroy(() => chart?.destroy());
</script>

<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
	<p class="text-[13px] font-semibold text-zinc-300 mb-1">Platform</p>
	<p class="text-[11px] text-zinc-600 mb-4">Distribusi spend</p>

	<div class="flex items-center justify-center mb-4">
		<canvas
			bind:this={canvas}
			width="100"
			height="100"
			aria-label="Donut chart distribusi spend per platform"
		></canvas>
	</div>

	<div class="space-y-2">
		{#each data as item (item.label)}
			<div class="flex items-center gap-2 text-[11px]">
				<span class="text-zinc-500 w-16 shrink-0">{item.label}</span>
				<div class="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
					<div
						class="h-1 rounded-full"
						style="width: {((item.value / total) * 100).toFixed(0)}%; background: {item.color}"
					></div>
				</div>
				<span class="text-zinc-300 font-medium w-8 text-right">
					{((item.value / total) * 100).toFixed(0)}%
				</span>
			</div>
		{/each}
	</div>
</div>
