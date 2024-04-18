<script lang="ts">
	import TextMacro from '$lib/notion/text-macro.svelte';
	import type {
		BlockObjectResponse,
		ListBlockChildrenResponse,
		TextRichTextItemResponse
	} from '@notionhq/client/build/src/api-endpoints.js';
	import { onMount } from 'svelte';

	export let data: Data;

	type PoemResults = {
		id: string;
		properties: {
			Name: {
				type: 'title';
				title: [
					{
						plain_text: string;
					}
				];
			};
			sectionName: {
				type: 'formula';
				formula: {
					string: string;
				};
			};
			NotLineated: {
				type: 'checkbox';
				checkbox: boolean;
			};
		};
	};

	type SectionResults = {
		cover: {
			type: 'external';
			external: {
				url: string;
			};
		};
		id: string;
		properties: {
			Name: {
				type: 'title';
				title: [
					{
						plain_text: string;
					}
				];
			};
			Quote: {
				type: 'rich_text';
				rich_text: TextRichTextItemResponse[];
			};
			QuoteAuthor: {
				type: 'rich_text';
				rich_text: TextRichTextItemResponse[];
			};
			Act: {
				type: 'rich_text';
				rich_text: TextRichTextItemResponse[];
			};
			secondaryImage: {
				type: 'url';
				url: string;
			};
		};
	};

	type Data = {
		props: {
			sections: { results: Array<SectionResults> };
			poems: { results: Array<PoemResults> };
		};
	};

	const {
		props: {
			sections: { results: sections },
			poems: { results: poems }
		}
	} = data;

	let open: Record<string, boolean> = {};
	let poemContent: Record<string, BlockObjectResponse[]> = {};
	let poemLoading: Record<string, boolean> = {};

	let Piano =
		'https://ik.imagekit.io/tempoimmaterial/tr:w-1500/hymns%20for%20calliope/ruined%20piano?updatedAt=1694350822403';

	const fetchContent = async (id: string) => {
		if (poemContent[id]) return;
		const response = await fetch('/studio/hfc/api', {
			method: 'POST',
			body: JSON.stringify({ id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const content: ListBlockChildrenResponse = await response.json();
		poemContent[id] = content.results as BlockObjectResponse[];
	};

	async function toggleOpen(poem: string) {
		if (open[poem] === true) {
			open[poem] = false;
		} else if (open[poem] === false && poemContent[poem]) {
			open[poem] = true;
		} else {
			poemLoading[poem] = true;
			await fetchContent(poem);
			poemLoading[poem] = false;
			open[poem] = true;
		}
	}

	// eslint-disable-next-line
	function scroll(id: string, behavior: ScrollBehavior) {
		const element = document.getElementById(id);
		if (!element) return;
		element.scrollIntoView({ behavior });
	}

	onMount(() => {
		fetch('/studio/hfc', {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
	});
</script>

<svelte:head>
	<title>hymns for calliope</title>
	<meta name="description" content="Collected poems by Alice Alexandra Moore." />
</svelte:head>

<div class="h-[100vh] overflow-y-scroll bg-black">
	<div class="snap-start">
		<div
			class="relative mx-auto aspect-square bg-cover bg-center md:aspect-auto md:h-[100lvh] md:bg-fixed"
			style="background-image: url({Piano})"
		>
			<div class="absolute left-[10%] top-[30%] z-10">
				<h1 class="text-3xl text-white md:text-4xl lg:text-5xl xl:text-6xl">hymns for calliope</h1>
				<p class="text-white">poems</p>
			</div>
			<div class="absolute h-[100%] w-[100%] bg-black opacity-60" />
		</div>
	</div>
	{#each sections as section}
		{#if section.properties['Name'].title[0].plain_text === 'introduction'}
			<div
				class="flex min-h-[100lvh] snap-start flex-col items-center justify-center px-5 py-10 md:px-10"
			>
				<div class="flex max-w-[60ch] flex-col">
					<h2 class="text-2xl font-light text-white sm:text-3xl xl:text-4xl">Author's Note</h2>
					<p class="whitespace-pre-line text-[1.1rem] sm:text-xl md:text-2xl">
						<em class="text-[#cfcdcb]"><TextMacro type={section.properties['Quote']} /></em>
					</p>
				</div>
			</div>
		{:else if section.properties['Name'] && section.cover}
			<div
				class="flex min-h-[100lvh] snap-start flex-col justify-center gap-y-24 bg-[#bcbab7] p-4 sm:gap-y-32 lg:gap-y-12"
			>
				<div
					class="relative grid min-h-[40lvh] grid-cols-6 grid-rows-6 lg:flex lg:items-center 2xl:px-32"
				>
					<div
						class="col-span-5 col-start-1 row-span-full row-start-1 lg:col-span-4 lg:translate-x-10"
					>
						<img
							src={section.cover.type === 'external' ? section.cover.external.url : ''}
							alt=""
							loading="lazy"
						/>
					</div>
					<a
						class="absolute col-start-3 row-start-5 min-w-[60vw] bg-white px-4 py-8 hover:bg-[#efefef] sm:row-start-6 lg:static lg:col-start-4 lg:row-start-4 lg:min-w-[35ch] lg:-translate-x-10 lg:translate-y-20 lg:text-2xl xl:text-3xl"
						href={`#${section.id}`}
						on:click|preventDefault={() => scroll(section.id, 'smooth')}
					>
						<p class="text-center text-sm text-black sm:text-lg">
							{#if section.properties['Act'] && section.properties['Act'].type === 'rich_text'}
								<TextMacro type={section.properties['Act']} />
							{:else}
								''
							{/if}
						</p>
						<h2 class="m-0 text-center text-2xl font-light text-black sm:text-3xl xl:text-4xl">
							{section.properties['Name'].type === 'title' && section.properties['Name'].title[0]
								? section.properties['Name'].title[0].plain_text
								: 'Title Missing in CMS'}
						</h2>
					</a>
				</div>
				<div class="sm:px-10 md:px-20 lg:px-32 xl:px-52 2xl:px-[26rem]">
					<div class="bg-black p-8 lg:p-20">
						<p class="mb-4 text-[1.1rem] sm:text-xl md:text-2xl">
							<em class="text-[#cfcdcb]">
								<TextMacro type={section.properties['Quote']} />
							</em>
						</p>
						<p class="text-sm text-white md:text-lg">
							—<TextMacro type={section.properties['QuoteAuthor']} />
						</p>
					</div>
				</div>
			</div>
			<div
				id={section.id}
				class="relative flex min-h-[100lvh] snap-start items-center bg-cover bg-center py-20 sm:bg-fixed"
				style="background-image: url({section.properties.secondaryImage.url});"
			>
				<div class="absolute h-[100%] w-[100%] bg-black bg-opacity-80" />
				<div
					class="relative z-10 flex w-[100%] flex-col gap-y-20 overflow-x-scroll px-5 md:items-center md:overflow-x-visible"
				>
					{#each poems as poem}
						{#if poem.properties['sectionName'].formula.string === section.properties.Name.title[0].plain_text}
							<a
								class="p-4 hover:[&>h3]:text-[#cfcdcb]"
								on:click|preventDefault={() => toggleOpen(poem.id)}
								on:mouseenter={() => {
									fetchContent(poem.id);
								}}
								href=""
							>
								<h3 class="text-center text-3xl font-light text-white md:text-4xl lg:text-5xl">
									{#if poemLoading[poem.id] === false || !poemLoading[poem.id]}
										{poem.properties.Name.title[0].plain_text}
									{:else}
										Loading...
									{/if}
								</h3>
							</a>
							{#if open[poem.id] === true}
								<div class="-mt-12">
									{#each poemContent[poem.id] as stanza}
										<p
											class="mb-8 max-w-[60ch] text-sm text-white sm:text-lg md:text-xl xl:text-2xl"
											style="white-space: {poem.properties.NotLineated.checkbox === false
												? 'pre'
												: ''}"
										>
											<TextMacro type={stanza.paragraph} />
										</p>
									{/each}
									<a
										on:click|preventDefault={() => {
											toggleOpen(poem.id);
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
