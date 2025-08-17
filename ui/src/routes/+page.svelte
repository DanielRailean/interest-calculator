<script lang="ts">
	import DarkToggle from './../lib/components/DarkToggle.svelte';
	import { getCompoundedIntervals } from '$lib/compound';
	import { DateTime } from 'luxon';
	const chart = (globalThis as any).Chart;
	import { onMount } from 'svelte';

	let startingBalance = 0;
	let yearsToGrow = 5;
	let periodsPerYear = 12;
	let depositsPerMonth = 1000;
	let returnPerYear = 10;
	let graph: any = undefined
	onMount(() => {
		renderGraph()
	});
	function removeElement(id:string) {
		console.log(`remove ${id}`)
    var elem = document.getElementById(id);
		if(!elem){
			return
		}
    return elem.parentNode!.removeChild(elem);
}
	let id = 1
	let el:any = undefined
	let parent: any = undefined
	function renderGraph(){
		const graphId = `graph-${id}`
		if(el)
		{
			removeElement(graphId)
			// id++
		}
		el = document.createElement("canvas")
		parent.appendChild(el)
		el.setAttribute("id", graphId)

		var data: number[] = [];
		var interest: number[] = [];

		const res = getCompoundedIntervals({
			years: yearsToGrow,
			timesPerYear: periodsPerYear,
			returnPerYear: returnPerYear,
			depositPerMonth: depositsPerMonth,
			startingBalance: startingBalance
		});
		for (const year of res.years) {
			for (const month of year.months) {
				data.push(Math.round(month.balance));
				interest.push(Math.round(month.interest));
			}
		}

		new chart(el, {
			type: 'line',
			data: {
				labels: data.map((i, index) => {
					return index + 1;
				}),
				datasets: [
					{ label: 'total', data: data, fill: true },
					{ label: 'interest', data: interest, fill: true }
				]
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true
					},
					tooltip: {
						mode: 'index'
					}
				},
				interaction: {
					mode: 'nearest',
					axis: 'x',
					intersect: false
				},
				scales: {
					x: {
						title: {
							display: true,
							text: 'Month'
						}
					},
					y: {
						stacked: true,
						title: {
							display: true,
							text: 'Value'
						}
					}
				}
			}
		});
	}
</script>

<div>
	<div class="flex">
		<DarkToggle />
	</div>
	<div class="flex flex-col p-4">
		<div class="flex flex-col mb-5">
			<p class="my-auto mb-1">starting balance</p>
			<input type="number" 
			bind:value={startingBalance}
			on:change={renderGraph}
			 class="dark:bg-stone-800" name="" id="" />
		</div>
		<div class="flex flex-col mb-5">
			<p class="my-auto mb-1">return per year</p>
			<input
				type="number"
				bind:value={returnPerYear}
				on:change={renderGraph}
				class="dark:bg-stone-800 mb-5"
				name=""
				id=""
			/>
			<input
				type="range"
				bind:value={returnPerYear}
				on:change={renderGraph}
				min="0"
				max="50"
				class="dark:bg-stone-800"
				name=""
				id=""
			/>
		</div>
		<div class="flex flex-col mb-5">
			<p class="my-auto mb-1">compounding periods per year</p>
			<input
				type="number"
				bind:value={periodsPerYear}
				on:change={renderGraph}
				class="dark:bg-stone-800 mb-5"
				name=""
				id=""
			/>
		</div>
		<div class="flex flex-col mb-5">
			<p class="my-auto mb-1">deposits per month</p>
			<input
				type="number"
				bind:value={depositsPerMonth}
				on:change={renderGraph}
				class="dark:bg-stone-800 mb-5"
				name=""
				id=""
			/>
		</div>
		<div class="flex flex-col mb-5">
			<p class="my-auto mb-1">years to grow</p>
			<input type="number" bind:value={yearsToGrow} on:change={renderGraph} class="dark:bg-stone-800 mb-5" name="" id="" />
			<input
				on:change={renderGraph}
				type="range"
				bind:value={yearsToGrow}
				min="1"
				max="100"
				class="dark:bg-stone-800"
				name=""
				id=""
			/>
		</div>
	</div>

	<h1 class="text-xl text-center p-2">
		<div class="flex flex-col items-center justify-center" bind:this={parent}>
			<h1>Graph</h1>
		</div>
	</h1>
</div>
