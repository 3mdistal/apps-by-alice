<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;

	function assignIndex() {
		Array.from(container.children).forEach((child, index) => {
			child.style.setProperty('--index', index);
		});
	}

	onMount(() => {
		assignIndex();
	});
</script>

<div
	bind:this={container}
	id="container"
	class="grid h-[100%] w-[100%] grid-cols-2 md:grid-cols-4 [&_img]:h-[100%] [&_img]:w-[100%]"
>
	<div>
		<a href="https://www.instagram.com/alice.alexandra.moore" target="_blank" rel="noreferrer">
			<enhanced:img
				src="$images/social-media/instagram-bear.webp"
				alt="Link to Instagram in the form of an illustrated polar bear taking a selfie. Painted dby Alice Alexandra Moore."
				class="object-contain"
			/>
		</a>
	</div>
	<div>
		<a href="https://twitter.com/tempoimmaterial" target="_blank" rel="noreferrer">
			<enhanced:img
				src="$images/social-media/twitter-squirrel.webp"
				alt="Link to Twitter in the form of a squirrel drinking its morning coffee. Painted by Alice Alexandra Moore."
				class="object-contain"
			/>
		</a>
	</div>
	<div>
		<a href="https://soundcloud.com/tempoimmaterial" target="_blank" rel="noreferrer">
			<enhanced:img
				src="$images/social-media/soundcloud-rabbit.webp"
				alt="Link to Soundcloud in the form of an illustrated rabbit wearing headphones. Painted by Alice Alexandra Moore."
				class="object-contain"
			/>
		</a>
	</div>
	<div>
		<a href="https://github.com/3mdistal/portfolio" target="_blank" rel="noreferrer">
			<enhanced:img
				src="$images/social-media/github-cat.webp"
				alt="Link to Twitter in the form of a squirrel drinking its morning coffee. Painted by Alice Alexandra Moore."
				class="object-contain"
			/>
		</a>
	</div>
</div>

<style>
	img {
		transition: transform 0.5s cubic-bezier(0.43, -0.74, 0.43, 2);
	}

	a:hover img {
		transform: scale(1.1);
	}

	#container {
		--stagger-delay: 0.1s;
	}

	#container > div:where(#container > div) {
		opacity: 0;
	}

	#container > div {
		animation: popIn 0.5s forwards;
		animation-delay: calc(var(--index) * var(--stagger-delay));
	}

	@keyframes popIn {
		0% {
			opacity: 0;
			transform: translateY(100px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
