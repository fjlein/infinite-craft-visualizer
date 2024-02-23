<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import _ from 'lodash';

	export let data: PageData;

	interface Recipe {
		first: {
			name: string;
			emoji: string;
		};
		second: {
			name: string;
			emoji: string;
		};
		result: {
			name: string;
			emoji: string;
		};
	}

	let recipes: Recipe[];
	$: recipes = [];

	let toResolve: string[] = [data.element.name];

	async function getRecipe(name: string) {
		const res = await fetch(`/api/elements/${name}/recipe`);
		const body = await res.json();

		if (res.ok) {
			return body;
		} else {
			throw new Error(body);
		}
	}

	async function resolveRecipes() {
		while (toResolve.length != 0) {
			const element: string = toResolve.shift()!;
			if (['Fire', 'Water', 'Earth', 'Wind', ..._.map(recipes, 'result.name')].includes(element)) {
				continue;
			}

			const recipe: Recipe = await getRecipe(element);
			recipes = [...recipes, recipe];
			toResolve.push(recipe.first.name, recipe.second.name);
		}
	}

	onMount(() => {
		resolveRecipes();
	});
</script>

<div class="flex flex-row justify-between space-x-2 font-medium">
	<button
		class="px-2 py-1 border rounded-md shadow-sm shrink-0 bg-white"
		on:click={() => goto('/')}
	>
		⬅️ Search
	</button>
	<button
		class="px-2 py-1 border rounded-md shadow-sm shrink-0 bg-white"
		on:click={() => alert('Coming soon!')}
	>
		🔀
	</button>
</div>

<pre>

	{JSON.stringify(recipes, null, 4)}
</pre>

<!-- <Graph></Graph> -->