<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { SvelteDate } from 'svelte/reactivity';
	import type { Chart } from 'chart.js';

	export let totalClicks: number = 0;
	export let dateStart: string = '';
	export let dateEnd: string = '';

	let canvas: HTMLCanvasElement;
	let chart: Chart;

	function generateDailyData() {
		if (!dateStart || !dateEnd) return { labels: [], data: [] };

		const start = new Date(dateStart);
		const end = new Date(dateEnd);
		const days = Math.min(
			Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1,
			30 // max 30 hari tampil
		);

		const labels: string[] = [];
		const data: number[] = [];
		const avg = Math.floor(totalClicks / days);

		for (let i = 0; i < days; i++) {
			const d = new SvelteDate(start);
			d.setDate(d.getDate() + i);
			labels.push(`${d.getDate()}/${d.getMonth() + 1}`);

			// Distribusi dengan variasi ±40% dari rata-rata
			const variance = 0.4;
			const factor = 1 + (Math.random() * variance * 2 - variance);
			data.push(Math.max(0, Math.round(avg * factor)));
		}

		return { labels, data };
	}

	onMount(async () => {
		const { labels, data } = generateDailyData();
		const avg = data.length ? data.reduce((a, b) => a + b, 0) / data.length : 0;

		const { Chart, registerables } = await import('chart.js');
		Chart.register(...registerables);

		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						data,
						backgroundColor: data.map((v) => (v >= avg ? '#6366f1' : '#27272a')),
						borderRadius: 3,
						borderSkipped: false
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: { display: false },
					tooltip: {
						callbacks: {
							label: (ctx) => `${ctx.parsed.y} klik`
						}
					}
				},
				scales: {
					x: {
						grid: { display: false },
						ticks: {
							color: '#3f3f46',
							font: { size: 9 },
							maxTicksLimit: 10,
							autoSkip: true
						}
					},
					y: {
						grid: { color: 'rgba(255,255,255,0.04)' },
						ticks: { color: '#3f3f46', font: { size: 9 } }
					}
				}
			}
		});
	});

	onDestroy(() => chart?.destroy());
</script>

<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
	<div class="flex items-center justify-between mb-1">
		<p class="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">Performa Harian</p>
		<div class="flex items-center gap-3">
			<span class="flex items-center gap-1.5 text-[10px] text-zinc-600">
				<span class="w-2 h-2 rounded-sm bg-indigo-500"></span>Di atas rata-rata
			</span>
			<span class="flex items-center gap-1.5 text-[10px] text-zinc-600">
				<span class="w-2 h-2 rounded-sm bg-zinc-800"></span>Di bawah rata-rata
			</span>
		</div>
	</div>
	<p class="text-[11px] text-zinc-700 mb-4">Estimasi distribusi klik harian</p>

	<div class="relative h-40">
		<canvas bind:this={canvas} aria-label="Bar chart estimasi klik harian selama periode kampanye"
		></canvas>
	</div>
</div>
