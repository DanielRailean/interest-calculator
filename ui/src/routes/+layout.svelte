<script>
	import { staticConfig } from '$lib/config';
	import { page } from '$app/stores';
	import './styles.css';
	import Toasts from '$lib/components/Toasts.svelte';
</script>

<svelte:head>
	<title>{staticConfig.name}</title>
</svelte:head>

<Toasts />
<div class="min-h-[100vh]">
	<main class="w-full h-full {$page.url.pathname.includes('/login') ? 'my-auto' : ''}">
		<div
			class="m-8 shadow shadow-stone-300 dark:shadow-zinc-800 bg-white rounded-xl dark:bg-[#1E2021] dark:text-stone-50"
		>
			<slot />
		</div>
	</main>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</div>

<style>
</style>
