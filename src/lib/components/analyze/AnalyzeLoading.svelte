<script lang="ts">
	const steps = [
		'Membaca data kampanye...',
		'Menghitung metrik performa...',
		'Menganalisis dengan Gemini AI...',
		'Menyusun rekomendasi...'
	];

	let currentStep = 0;

	import { onMount, onDestroy } from 'svelte';

	let interval: ReturnType<typeof setInterval>;

	onMount(() => {
		interval = setInterval(() => {
			currentStep = (currentStep + 1) % steps.length;
		}, 1800);
	});

	onDestroy(() => clearInterval(interval));
</script>

<div class="flex flex-col items-center justify-center py-20 space-y-6">
	<!-- Animated ring -->
	<div class="relative w-16 h-16">
		<div class="absolute inset-0 rounded-full border-2 border-zinc-800"></div>
		<div
			class="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin"
		></div>
		<div class="absolute inset-0 flex items-center justify-center">
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#6366f1"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
			</svg>
		</div>
	</div>

	<!-- Step label -->
	<div class="text-center space-y-1">
		<p class="text-[13px] font-medium text-zinc-300 transition-all duration-500">
			{steps[currentStep]}
		</p>
		<p class="text-[11px] text-zinc-600">Biasanya memakan waktu 5–10 detik</p>
	</div>

	<!-- Progress dots -->
	<div class="flex gap-1.5">
		{#each steps as step, i (step)}
			<div
				class="w-1.5 h-1.5 rounded-full transition-colors duration-300"
				class:bg-indigo-500={i === currentStep}
				class:bg-zinc-800={i !== currentStep}
			></div>
		{/each}
	</div>
</div>
