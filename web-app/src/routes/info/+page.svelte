<script lang="ts">
	import { goto } from '$app/navigation';

	// import type { PageData } from './$types';
	import * as Accordion from '$lib/components/ui/accordion';

	// export let data: PageData;
</script>

<svelte:head>
	<title>Info - Infinite Craft Visualizer</title>
	<meta name="description" content="Get more infp about this project." />
</svelte:head>

<p class="mb-5 text-muted-foreground">Get more info about this project.</p>

<div class="flex flex-row justify-between space-x-2 font-medium">
	<button
		class="px-2 py-1 border rounded-md shadow-sm shrink-0 bg-white hover:bg-slate-50 active:shadow-none"
		on:click={() => goto('/')}
	>
		⬅️ Search
	</button>
	<button
		class="px-2 py-1 border rounded-md shadow-sm shrink-0 bg-white hover:bg-slate-50 active:shadow-none"
		on:click={() => goto('/random')}
	>
		🔀
	</button>
</div>

<Accordion.Root class="w-full bg-white border rounded-md mt-5 px-2 shadow-sm divide-y" multiple>
	<Accordion.Item value="item-1">
		<Accordion.Trigger>🌍 Who created Infinite Craft?</Accordion.Trigger>
		<Accordion.Content
			>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a purus nibh. Nunc felis
			metus, ultrices ut risus eget, aliquet rhoncus ex. Suspendisse a dui a eros mollis efficitur
			lobortis sit amet massa. Pellentesque consectetur nunc erat, nec blandit urna aliquam at.
			Vivamus vestibulum pellentesque scelerisque. Ut tempor risus non sapien elementum laoreet.
			Donec ut leo justo. Pellentesque quis leo eget erat cursus dignissim a vel risus. Mauris vel
			arcu sodales, finibus lacus ut, ornare justo. Fusce facilisis cursus leo, id dapibus justo
			faucibus eget.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2">
		<Accordion.Trigger>⚙️ What technologies did you use?</Accordion.Trigger>
		<Accordion.Content>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a purus nibh. Nunc felis
			metus, ultrices ut risus eget, aliquet rhoncus ex. Suspendisse a dui a eros mollis efficitur
			lobortis sit amet massa. Pellentesque consectetur nunc erat, nec blandit urna aliquam at.
			Vivamus vestibulum pellentesque scelerisque. Ut tempor risus non sapien elementum laoreet.
			Donec ut leo justo. Pellentesque quis leo eget erat cursus dignissim a vel risus. Mauris vel
			arcu sodales, finibus lacus ut, ornare justo. Fusce facilisis cursus leo, id dapibus justo
			faucibus eget.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3">
		<Accordion.Trigger>🙈 Why do it get no results?</Accordion.Trigger>
		<Accordion.Content>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a purus nibh. Nunc felis
			metus, ultrices ut risus eget, aliquet rhoncus ex. Suspendisse a dui a eros mollis efficitur
			lobortis sit amet massa. Pellentesque consectetur nunc erat, nec blandit urna aliquam at.
			Vivamus vestibulum pellentesque scelerisque. Ut tempor risus non sapien elementum laoreet.
			Donec ut leo justo. Pellentesque quis leo eget erat cursus dignissim a vel risus. Mauris vel
			arcu sodales, finibus lacus ut, ornare justo. Fusce facilisis cursus leo, id dapibus justo
			faucibus eget.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-4">
		<Accordion.Trigger>😭 Why only 100 elements in search?</Accordion.Trigger>
		<Accordion.Content>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a purus nibh. Nunc felis
			metus, ultrices ut risus eget, aliquet rhoncus ex. Suspendisse a dui a eros mollis efficitur
			lobortis sit amet massa. Pellentesque consectetur nunc erat, nec blandit urna aliquam at.
			Vivamus vestibulum pellentesque scelerisque. Ut tempor risus non sapien elementum laoreet.
			Donec ut leo justo. Pellentesque quis leo eget erat cursus dignissim a vel risus. Mauris vel
			arcu sodales, finibus lacus ut, ornare justo. Fusce facilisis cursus leo, id dapibus justo
			faucibus eget.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
