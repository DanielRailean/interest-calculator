<script lang="ts">
	import { Finance } from "financejs";
	import { onMount } from "svelte";

	var finance = new Finance()
	let info: any | undefined;
	onMount(async () => {
		console.log(finance.CI(10, 12, 0, ))
	});
</script>

<div>
	<h1 class="text-xl text-center p-2">
		<div class="flex flex-row items-center justify-center">
			<h1>test</h1>
		</div>
	</h1>
</div>
