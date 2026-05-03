<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Chart } from 'chart.js';

	export let clicksData: number[] = [];
	export let conversionsData: number[] = [];
	export let labels: string[] = [];

	let canvas: HTMLCanvasElement;
	let chart: Chart;

	onMount(async () => {
		const { Chart, registerables } = await import('chart.js');
		Chart.register(...registerables);

		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						label: 'Klik',
						data: clicksData,
						borderColor: '#6366f1',
						backgroundColor: 'rgba(99,102,241,0.08)',
						borderWidth: 2,
						pointRadius: 3,
						pointBackgroundColor: '#6366f1',
						tension: 0.4,
						fill: true
					},
					{
						label: 'Konversi',
						data: conversionsData,
						borderColor: '#22d3ee',
						backgroundColor: 'rgba(34,211,238,0.06)',
						borderWidth: 2,
						pointRadius: 3,
						pointBackgroundColor: '#22d3ee',
						tension: 0.4,
						fill: true,
						yAxisID: 'y2'
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				scales: {
					x: {
						grid: { color: 'rgba(255,255,255,0.04)' },
						ticks: { color: '#52525b', font: { size: 10 } }
					},
					y: {
						grid: { color: 'rgba(255,255,255,0.04)' },
						ticks: {
							color: '#52525b',
							font: { size: 10 },
							callback: (v) => (Number(v) / 1000).toFixed(1) + 'K'
						}
					},
					y2: {
						position: 'right',
						grid: { display: false },
						ticks: { color: '#52525b', font: { size: 10 } }
					}
				}
			}
		});
	});

	onDestroy(() => chart?.destroy());
</script>

<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
	<div class="flex items-start justify-between mb-4">
		<div>
			<p class="text-[13px] font-semibold text-zinc-300">Performa Mingguan</p>
			<p class="text-[11px] text-zinc-600 mt-0.5">Klik & Konversi — 7 hari terakhir</p>
		</div>
		<!-- Custom legend -->
		<div class="flex items-center gap-4">
			<span class="flex items-center gap-1.5 text-[11px] text-zinc-500">
				<span class="w-2 h-2 rounded-sm bg-indigo-500"></span>Klik
			</span>
			<span class="flex items-center gap-1.5 text-[11px] text-zinc-500">
				<span class="w-2 h-2 rounded-sm bg-cyan-400"></span>Konversi
			</span>
		</div>
	</div>

	<div class="relative h-44">
		<canvas
			bind:this={canvas}
			aria-label="Line chart performa klik dan konversi 7 hari terakhir"
		></canvas>
	</div>
</div>
