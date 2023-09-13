<script lang="ts">
	import { onMount } from 'svelte';
	import StudioCard from './studio-card.svelte';
	import gsap from 'gsap';

	interface Card {
		title: string;
		subtitle: string;
		logo: string;
		src: string;
		alt: string;
		description: string;
		url: string;
		buttonText: string;
	}

	const list: Array<Card> = [
		{
			title: 'hymns for calliope',
			subtitle: 'poems',
			logo: 'hfc',
			src: 'https://ik.imagekit.io/tempoimmaterial/studio/piano-hfc.jpg?tr=w-316,h-476,fo-right',
			alt: 'A crumbled grand piano in front of a ruined building.',
			description: 'Poems collected over time and transitions. Somewhat memoir, somewhat not.',
			url: '/studio/hfc',
			buttonText: 'walk slowly.'
		},
		{
			title: 'betson',
			subtitle: 'novel in calendar',
			logo: 'bet',
			src: 'https://ik.imagekit.io/tempoimmaterial/studio/mirror-b.jpg?tr=w-316,h-476',
			alt: 'A teen girl leaning against a mirror.',
			description:
				'A tale firmly rooted in the Midwest gothic, full of ghosts and kids just trying to make it through.',
			url: '/studio/betson',
			buttonText: 'get lost inside.'
		},
		{
			title: 'these makeshift idiotika',
			subtitle: 'a shifting, tilting world',
			logo: 'tmi',
			src: 'https://ik.imagekit.io/tempoimmaterial/studio/bird-tmi.jpg?tr=w-600,h-476,c-force',
			alt: 'A bird rendered in watercolor.',
			description:
				'A sprawl filled with lovers and fiends, all striving to remember an ever-erasing past.',
			url: '/studio/tmi',
			buttonText: 'dive in.'
		},
		{
			title: 'illustrations',
			subtitle: 'visual art',
			logo: 'art',
			src: 'https://ik.imagekit.io/tempoimmaterial/studio/flower-p.jpg?tr=w-316,h-476',
			alt: 'A single flower open against the dark.',
			description: 'A small collection of digital paintings with accompanying stories.',
			url: '/studio/illustrations',
			buttonText: 'to the museum.'
		},
		{
			title: 'jukebox',
			subtitle: 'compositions',
			logo: 'j',
			src: 'https://ik.imagekit.io/tempoimmaterial/studio/city-j.jpg?tr=w-316,h-476,fo-bottom_right',
			alt: 'A single flower open against the dark.',
			description: 'Musical musings and improvs, collected here for you to listen and relax.',
			url: '/studio/jukebox',
			buttonText: 'turn it up.'
		},
		{
			title: 'postcards',
			subtitle: 'sudden stories',
			logo: 'pc',
			src: 'https://ik.imagekit.io/tempoimmaterial/studio/snakes-i.jpg?tr=w-316,h-476',
			alt: 'A single flower open against the dark.',
			description: 'A small collection of digital paintings with accompanying stories.',
			url: '/studio/illustrations',
			buttonText: 'to the museum.'
		},
		{
			title: 'and more to come...',
			subtitle: '',
			logo: '#',
			src: 'https://ik.imagekit.io/tempoimmaterial/studio/ink.png?tr=w-316,h-476',
			alt: 'Ink.',
			description: `I've got a whole lot in the works.`,
			url: '/blog/on-continuous-resurrection',
			buttonText: 'learn about it all.'
		}
	];

	function populate() {
		const tl = gsap.timeline();
		tl.fromTo(
			'img.fixed',
			{ opacity: 0 },
			{ duration: 1, opacity: 0.4, ease: 'power2.inOut' }
		).fromTo('.card-div > *', { opacity: 0 }, { opacity: 1, stagger: 0.1 }, '< .5');
	}

	onMount(() => {
		populate();
	});
</script>

<svelte:head>
	<title>Studio</title>
	<meta
		name="description"
		content="The studio works of Alice Alexandra Moore. Enjoy fiction, fantasy, poetry, illustrations, music, essays, and more."
	/>
</svelte:head>

<div class="min-h-[100lvh] bg-studio-bg">
	<img
		src="https://ik.imagekit.io/tempoimmaterial/studio/ink.png?updatedAt=1694604654601"
		alt=""
		class="fixed opacity-40"
	/>

	<!-- Break -->
	<div class="h-12" />

	<!-- Cards -->
	<div class="card-div flex flex-wrap items-start justify-center gap-12 sm:justify-center sm:px-10">
		{#each list as { title, subtitle, logo, src, description, alt, url, buttonText }}
			<StudioCard {title} {subtitle} {logo} {src} {alt} {description} {url} {buttonText} />
		{/each}
	</div>

	<div class="h-12" />
</div>
