<script lang="ts">
	import '../app.css';
	import StatusBar from './status-bar.svelte';
</script>

<div class="max-w-2xl relative mx-auto">
	<div
		class="-z-10 absolute w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
	></div>
	<div class="flex flex-col min-h-[100vh] mx-4">
		<div class="mt-10">
			<div class="mb-1 md:mt-10">
				<h1 class="text-3xl font-semibold"><a href="/">Infinite Craft Visualizer</a></h1>
			</div>
		</div>
		<div class="grow flex flex-col">
			<slot />
		</div>

		<div class="mb-20 mt-5">
			<StatusBar></StatusBar>
		</div>
	</div>

	<div class="h-[10vh] flex justify-between mx-4">
		<p class="text-muted-foreground text-center">
			Made with ❤️ by <a href="https://fjlein.com" class="underline underline-offset-4">fjlein</a>
		</p>
		<p class="text-muted-foreground text-center">
			Code on <a
				href="https://github.com/fjlein/infinite-craft-visualizer"
				class="underline underline-offset-4">GitHub</a
			>
		</p>
	</div>
</div>
