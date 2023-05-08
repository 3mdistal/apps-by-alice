<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import Rabbit from '$images/social-media/soundcloud-rabbit.webp';
	import PolarBear from '$images/social-media/instagram-bear.webp';
	import Squirrel from '$images/social-media/twitter-squirrel.webp';
	import Cat from '$images/social-media/github-cat.webp';

	let container: HTMLDivElement;

	function popIn() {
		gsap.from(container.children, {
			opacity: 0,
			y: 100,
			ease: 'elastic',
			duration: 2,
			delay: 0.25,
			stagger: 0.1
		});
	}

	onMount(() => {
		setTimeout(popIn, 50);
	});

	function handleMouseEnterSocialImage(e: Event) {
		gsap.to(e.target, { scale: 1.2, duration: 2, ease: 'elastic' });
	}

	function handleMouseLeaveSocialImage(e: Event) {
		gsap.to(e.target, { scale: 1, duration: 2, ease: 'elastic.out' });
	}
</script>

<div
	bind:this={container}
	class="grid h-[100%] w-[100%] grid-cols-2 md:grid-cols-4 [&_img]:h-[100%] [&_img]:w-[100%]"
>
	<div>
		<a href="https://www.instagram.com/alice.alexandra.moore" target="_blank" rel="noreferrer">
			<img
				src={PolarBear}
				alt="Link to Instagram in the form of an illustrated polar bear taking a selfie. Painted dby Alice Alexandra Moore."
				class="object-contain"
				on:mouseenter={handleMouseEnterSocialImage}
				on:mouseleave={handleMouseLeaveSocialImage}
			/>
		</a>
	</div>
	<div>
		<a href="https://twitter.com/tempoimmaterial" target="_blank" rel="noreferrer">
			<img
				src={Squirrel}
				alt="Link to Twitter in the form of a squirrel drinking its morning coffee. Painted by Alice Alexandra Moore."
				class="object-contain"
				on:mouseenter={handleMouseEnterSocialImage}
				on:mouseleave={handleMouseLeaveSocialImage}
			/>
		</a>
	</div>
	<div>
		<a href="https://soundcloud.com/tempoimmaterial" target="_blank" rel="noreferrer">
			<img
				src={Rabbit}
				alt="Link to Soundcloud in the form of an illustrated rabbit wearing headphones. Painted by Alice Alexandra Moore."
				class="object-contain"
				on:mouseenter={handleMouseEnterSocialImage}
				on:mouseleave={handleMouseLeaveSocialImage}
			/>
		</a>
	</div>
	<div>
		<a href="https://github.com/3mdistal/portfolio" target="_blank" rel="noreferrer">
			<img
				src={Cat}
				alt="Link to Twitter in the form of a squirrel drinking its morning coffee. Painted by Alice Alexandra Moore."
				class="object-contain"
				on:mouseenter={handleMouseEnterSocialImage}
				on:mouseleave={handleMouseLeaveSocialImage}
			/>
		</a>
	</div>
</div>
