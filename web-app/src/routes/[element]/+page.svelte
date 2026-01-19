<script lang="ts">
	import { afterNavigate, goto, invalidate, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import CustomLink from '$lib/components/mine/link.svelte';
	import Graph from '$lib/components/mine/graph.svelte';
	import _ from 'lodash';
	import { fade } from 'svelte/transition';
	import { Loader2 } from 'lucide-svelte';

	export let data: PageData;
	let loading: boolean;

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

	async function getRecipe(name: string) {
		let recipe: Recipe | undefined = _.find(recipes, (n) => n.result.name == name);

		if (recipe) {
			return recipe;
		}
		const res = await fetch(`/api/elements/${name}/recipe`);
		const body = await res.json();

		if (res.ok) {
			return body;
		} else {
			throw new Error(body);
		}
	}

	async function resolveRecipes() {
		while (!toResolve.every((e) => e === null)) {
			const element: string = toResolve.shift() as string;

			if (['Fire', 'Water', 'Earth', 'Wind', null].includes(element)) {
				tree.push(null, null);
				toResolve.push(null, null);
				continue;
			}

			const l = tree.length;

			const recipe = await getRecipe(element);

			recipes = [...recipes, recipe];

			if (l == 1) {
				graph.addNode(
					recipe.result.name + 0,
					`${recipe.result.emoji} ${recipe.result.name}`,
					tree[Math.floor(l / 2)]!
				);
			}

			graph.addNode(
				recipe.first.name + l,
				`${recipe.first.emoji} ${recipe.first.name}`,
				tree[Math.floor(l / 2)]!
			);
			graph.addNode(
				recipe.second.name + (l + 1),
				`${recipe.second.emoji} ${recipe.second.name}`,
				tree[Math.floor(l / 2)]!
			);

			tree.push(recipe.first.name + l);
			graph.addLink(tree[Math.floor(l / 2)]!, recipe.first.name + l);

			tree.push(recipe.second.name + (l + 1));
			graph.addLink(tree[Math.floor(l / 2)]!, recipe.second.name + (l + 1));

			toResolve.push(recipe.first.name, recipe.second.name);
			await new Promise((r) => setTimeout(r, 200));
		}
		loading = false;
	}

	let tree: (string | null)[] = [];

	let recipes: Recipe[];
	$: recipes = [];

	let toResolve: (string | null)[];

	afterNavigate(() => {
		loading = true;
		recipes = [];
		toResolve = [data.element.name];
		tree = [data.element.name + 0];
		resolveRecipes();
	});

	let graph: Graph;
</script>

<svelte:head>
	<title>{data.element.emoji} {data.element.name} Recipe - Infinite Craft Visualizer</title>
	<meta
		name="description"
		content="Visualize the recipe for {data.element.name} in Infinite Craft."
	/>
</svelte:head>

<div class="flex items-center mb-5 space-x-1">
	<p class="text-muted-foreground">
		{data.element.emoji}
		{data.element.name}
	</p>
	{#if loading}
		<div in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
			<Loader2 class="animate-spin text-muted-foreground" size="16"></Loader2>
		</div>
	{/if}
</div>

<div class="flex flex-col grow">
	<div class="flex flex-row justify-between space-x-2 font-medium">
		<CustomLink href="/">⬅️ Search</CustomLink>
		<div class="flex space-x-2">
			<CustomLink href="/random" reload>🔀</CustomLink>
		</div>
	</div>

	<Graph bind:this={graph}></Graph>
</div>
<!-- <div class="bg-red-50 shrink-0 h-auto"></div> -->
