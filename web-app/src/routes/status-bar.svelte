<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { tweened } from 'svelte/motion';
	import { derived } from 'svelte/store';
	import { cubicOut } from 'svelte/easing';
	import { afterNavigate } from '$app/navigation';

	export const name = writable<string>('Loading');

	let resolved = tweened(0, { duration: 5000, easing: cubicOut });
	let resolved_formatted = derived(resolved, ($myNumber) =>
		$myNumber.toLocaleString(undefined, { maximumFractionDigits: 0 })
	);

	let queued = tweened(0, { duration: 5000, easing: cubicOut });
	let queued_formatted = derived(queued, ($myNumber) =>
		$myNumber.toLocaleString(undefined, { maximumFractionDigits: 0 })
	);

	let elements = tweened(0, { duration: 5000, easing: cubicOut });
	let elements_formatted = derived(elements, ($myNumber) =>
		$myNumber.toLocaleString(undefined, { maximumFractionDigits: 0 })
	);

	async function fetchStatus() {
		const s = await fetch('/api/status').then((x) => x.json());
		resolved.set(s.resolved);
		queued.set(s.queued);
		elements.set(s.elements);
		name.set(s.name);
		setTimeout(fetchStatus, 5000);
	}

	afterNavigate(() => {
		fetchStatus();
	});

	let classes = '';
	$: {
		switch ($name) {
			case 'Running':
				classes = 'bg-green-500 animate-pulse';
				break;
			case 'Waiting':
				classes = 'bg-orange-500 animate-pulse';
				break;
			case 'Stopped':
				classes = 'bg-red-500';
				break;
			default:
				classes = 'bg-gray-500 animate-pulse';
				break;
		}
	}
</script>

<div
	class="grid justify-start w-full grid-cols-2 gap-5 p-4 border rounded-md shadow-sm md:grid-cols-4 md:gap-x-5 md:place-items-center bg-white"
>
	<div class="flex flex-col">
		<p class="mb-1 text-muted-foreground">Worker Status</p>
		<div class="flex items-center space-x-2">
			<div class="w-2 h-2 rounded-full {classes}"></div>
			<p class="font-medium">{$name}</p>
		</div>
	</div>
	<div class="flex flex-col">
		<p class="mb-1 text-muted-foreground">Elements Found</p>
		<div class="flex items-center space-x-2">
			<div class="w-2 h-2 rounded-full {classes}"></div>
			<p class="font-medium">{$elements_formatted}</p>
		</div>
	</div>
	<div class="flex flex-col">
		<p class="mb-1 text-muted-foreground">Resolved Recipes</p>
		<div class="flex items-center space-x-2">
			<div class="w-2 h-2 rounded-full {classes}"></div>
			<p class="font-medium">{$resolved_formatted}</p>
		</div>
	</div>
	<div class="flex flex-col">
		<p class="mb-1 text-muted-foreground">Queued Recipes</p>
		<div class="flex items-center space-x-2">
			<div class="w-2 h-2 rounded-full {classes}"></div>
			<p class="font-medium">{$queued_formatted}</p>
		</div>
	</div>
</div>
