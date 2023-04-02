<script>
	import Piano from '$images/studio/hfc/hero-hfc-lq.webp';
	import TextMacro from '$lib/notion/text-macro.svelte';
	import { onMount } from 'svelte';

	export let data;
	let open = {};
	let poemContent = {};
	let poemLoading = {};

	const fetchContent = async (id) => {
		const response = await fetch('/studio/hfc/api', {
			method: 'POST',
			body: JSON.stringify({ id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const content = await response.json();
		poemContent[id] = content;
	};

	function scroll(sectionID) {
		const section = document.getElementById(sectionID);
		section.scrollIntoView();
	}

	async function toggleOpen(poem, section) {
		if (open[poem] === true) {
			open[poem] = false;
		} else if (open[poem] === false) {
			open[poem] = true;
		} else {
			poemLoading[poem] = true;
			await fetchContent(poem);
			poemLoading[poem] = false;
			open[poem] = true;
		}
		scroll(section);
	}

	const {
		props: {
			sections: { results: sections },
			poems: { results: poems }
		}
	} = data;

	onMount(() => {
		fetch('/studio/hfc', {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
	});
</script>

<div class="bg-black">
	<div>
		<div class="relative mx-auto aspect-square md:aspect-auto md:h-[100dvh]">
			<div class="absolute left-[10%] top-[30%] z-10">
				<h1 class="text-3xl text-white md:text-4xl lg:text-5xl xl:text-6xl">hymns for calliope</h1>
				<p class="text-white">poems</p>
			</div>
			<div class="absolute h-[100%] w-[100%] bg-black opacity-50" />
			<img class="object-[50%_70%]" src={Piano} alt="A broken piano in front of a building." />
		</div>
	</div>
	<div class="spacer" />
	{#each sections as section}
		{#if section.properties.Name.title[0].plain_text === 'introduction'}
			<div class="flex min-h-[100dvh] flex-col items-center justify-center px-5 md:px-10">
				<div class="flex max-w-[60ch] flex-col gap-y-5 text-2xl">
					<h2 class="text-white">Author's Note</h2>
					<p class="whitespace-pre-line">
						<em class="text-white"><TextMacro type={section.properties.Quote} /></em>
					</p>
				</div>
			</div>
			<div class="spacer" />
		{:else}
			<div
				class="flex min-h-[100dvh] flex-col justify-center gap-y-24 bg-[#bcbab7] p-4 sm:gap-y-32 lg:gap-y-12"
			>
				<div
					class="relative grid min-h-[40dvh] grid-cols-6 grid-rows-6 lg:flex lg:items-center 2xl:px-32"
				>
					<div
						class="col-span-5 col-start-1 row-span-full row-start-1 lg:col-span-4 lg:translate-x-10"
					>
						<img src={section.cover.external.url} alt="" />
					</div>
					<div
						class="absolute col-start-3 row-start-5 min-w-[60vw] bg-white px-4 py-8 sm:row-start-6 lg:static lg:col-start-4 lg:row-start-4 lg:min-w-[35ch] lg:-translate-x-10 lg:translate-y-20 lg:text-2xl xl:text-3xl"
					>
						<p class="text-center text-sm text-black sm:text-lg">
							<TextMacro type={section.properties.Act} />
						</p>
						<p class="text-center text-2xl text-black sm:text-3xl xl:text-4xl">
							{section.properties.Name.title[0].plain_text}
						</p>
					</div>
				</div>
				<div class="sm:px-10 md:px-20 lg:px-32 xl:px-52 2xl:px-[26rem]">
					<div class="bg-black p-8 lg:p-20">
						<p class="mb-4 text-[1.1rem] sm:text-xl md:text-2xl">
							<em class="text-[#cfcdcb]"><TextMacro type={section.properties.Quote} /></em>
						</p>
						<p class="text-sm text-white md:text-lg">
							—<TextMacro type={section.properties.QuoteAuthor} />
						</p>
					</div>
				</div>
			</div>
			<div
				id={section.id}
				class="relative flex min-h-[100dvh] items-center py-20"
				style="background-image: url({section.properties.secondaryImage
					.url}); background-size: cover; background-position: center; background-attachment: fixed;"
			>
				<div class="absolute h-[100%] w-[100%] bg-black bg-opacity-75" />
				<div
					class="relative z-10 flex w-[100%] flex-col md:items-center gap-y-20 px-5 overflow-x-scroll md:overflow-x-visible"
				>
					{#each poems as poem}
						{#if poem.properties.sectionName.formula.string === section.properties.Name.title[0].plain_text}
							<a
								class="p-4 hover:[&>p]:text-[#cfcdcb]"
								on:click|preventDefault={() => toggleOpen(poem.id, section.id)}
								href={poem.properties.Slug.formula.string}
							>
								<p class="text-center text-3xl text-white md:text-4xl lg:text-5xl">
									{#if poemLoading[poem.id] === false || !poemLoading[poem.id]}
										{poem.properties.Name.title[0].plain_text}
									{:else}
										Loading...
									{/if}
								</p>
							</a>
							{#if open[poem.id] === true}
								<div class="-mt-12">
									{#each poemContent[poem.id].results as stanza}
										<p
											class="mb-8 max-w-[60ch] text-sm sm:text-lg text-white md:text-xl xl:text-2xl"
											style="white-space: {poem.properties.NotLineated.checkbox === false
												? 'pre'
												: ''}"
										>
											<TextMacro type={stanza.paragraph} />
										</p>
									{/each}
									<a
										on:click|preventDefault={() => {
											toggleOpen(poem.id, section.id);
										}}
										href="/studio/hfc"
										><p class="mt-32 text-right text-2xl text-white md:text-3xl lg:text-4xl">
											close.
										</p></a
									>
								</div>
							{/if}
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	{/each}
</div>
