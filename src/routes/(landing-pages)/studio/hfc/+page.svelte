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

<div class="page-container">
	<div class="snap-container">
		<div class="hero-image" style="background-image: url({Piano})">
			<div class="hero-content">
				<h1>hymns for calliope</h1>
				<p>poems</p>
			</div>
			<div class="hero-overlay"></div>
		</div>
	</div>
	{#each sections as section}
		{#if section.properties['Name'].title[0].plain_text === 'introduction'}
			<div class="introduction">
				<div class="introduction-content">
					<h2>Author's Note</h2>
					<p>
						<em><TextMacro type={section.properties['Quote']} /></em>
					</p>
				</div>
			</div>
		{:else if section.properties['Name'] && section.cover}
			<div class="section-container">
				<div class="section-image-container">
					<div class="section-image">
						<img
							src={section.cover.type === 'external' ? section.cover.external.url : ''}
							alt=""
							loading="lazy"
						/>
					</div>
					<a
						class="section-link"
						href={`#${section.id}`}
						on:click|preventDefault={() => scroll(section.id, 'smooth')}
					>
						<p class="section-act">
							{#if section.properties['Act'] && section.properties['Act'].type === 'rich_text'}
								<TextMacro type={section.properties['Act']} />
							{:else}
								''
							{/if}
						</p>
						<h2 class="section-title">
							{section.properties['Name'].type === 'title' && section.properties['Name'].title[0]
								? section.properties['Name'].title[0].plain_text
								: 'Title Missing in CMS'}
						</h2>
					</a>
				</div>
				<div class="section-quote-container">
					<div class="section-quote">
						<p class="quote-text">
							<em>
								<TextMacro type={section.properties['Quote']} />
							</em>
						</p>
						<p class="quote-author">
							—<TextMacro type={section.properties['QuoteAuthor']} />
						</p>
					</div>
				</div>
			</div>
			<div
				id={section.id}
				class="poem-section"
				style="background-image: url({section.properties.secondaryImage.url});"
			>
				<div class="poem-overlay"></div>
				<div class="poem-container">
					{#each poems as poem}
						{#if poem.properties['sectionName'].formula.string === section.properties.Name.title[0].plain_text}
							<a
								class="poem-link"
								on:click|preventDefault={() => toggleOpen(poem.id)}
								on:mouseenter={() => {
									fetchContent(poem.id);
								}}
								href=""
							>
								<h3 class="poem-title">
									{#if poemLoading[poem.id] === false || !poemLoading[poem.id]}
										{poem.properties.Name.title[0].plain_text}
									{:else}
										Loading...
									{/if}
								</h3>
							</a>
							{#if open[poem.id] === true}
								<div class="poem-content">
									{#each poemContent[poem.id] as stanza}
										<p
											class="poem-stanza"
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
										class="close-poem">close.</a
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

<style lang="scss">
  .page-container {
    height: 100vh;
    overflow-y: scroll;
    background-color: black;
  }

  .snap-container {
    scroll-snap-align: start;
  }

  .hero-image {
    position: relative;
    margin: 0 auto;
    aspect-ratio: 1 / 1;
    background-size: cover;
    background-position: center;

    @media (min-width: 768px) {
      aspect-ratio: auto;
      height: 100lvh;
      background-attachment: fixed;
    }
  }

  .hero-content {
    position: absolute;
    left: 10%;
    top: 30%;
    z-index: 10;

    h1 {
      font-size: 1.875rem;
      color: white;

      @media (min-width: 768px) {
        font-size: 2.25rem;
      }

      @media (min-width: 1024px) {
        font-size: 3rem;
      }

      @media (min-width: 1280px) {
        font-size: 3.75rem;
      }
    }

    p {
      color: white;
    }
  }

  .hero-overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: black;
    opacity: 0.6;
  }

  .introduction {
    display: flex;
    min-height: 100lvh;
    scroll-snap-align: start;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 1.25rem;

    @media (min-width: 768px) {
      padding: 2.5rem;
    }
  }

  .introduction-content {
    display: flex;
    max-width: 60ch;
    flex-direction: column;

    h2 {
      font-size: 1.5rem;
      font-weight: 300;
      color: white;

      @media (min-width: 640px) {
        font-size: 1.875rem;
      }

      @media (min-width: 1280px) {
        font-size: 2.25rem;
      }
    }

    p {
      white-space: pre-line;
      font-size: 1.1rem;
      
      @media (min-width: 640px) {
        font-size: 1.25rem;
      }

      @media (min-width: 768px) {
        font-size: 1.5rem;
      }

      em {
        color: #cfcdcb;
      }
    }
  }

  .section-container {
    display: flex;
    min-height: 100lvh;
    scroll-snap-align: start;
    flex-direction: column;
    justify-content: center;
    gap: 6rem;
    background-color: #bcbab7;
    padding: 1rem;

    @media (min-width: 640px) {
      gap: 8rem;
    }

    @media (min-width: 1024px) {
      gap: 3rem;
    }
  }

  .section-image-container {
    position: relative;
    display: grid;
    min-height: 40lvh;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-rows: repeat(6, minmax(0, 1fr));

    @media (min-width: 1024px) {
      display: flex;
      align-items: center;
    }

    @media (min-width: 1536px) {
      padding: 0 8rem;
    }
  }

  .section-image {
    grid-column: span 5 / span 5;
    grid-column-start: 1;
    grid-row: span 6 / span 6;
    grid-row-start: 1;

    @media (min-width: 1024px) {
      grid-column: span 4 / span 4;
      transform: translateX(2.5rem);
    }
  }

  .section-link {
    position: absolute;
    grid-column-start: 3;
    grid-row-start: 5;
    min-width: 60vw;
    background-color: white;
    padding: 2rem 1rem;

    &:hover {
      background-color: #efefef;
    }

    @media (min-width: 640px) {
      grid-row-start: 6;
    }

    @media (min-width: 1024px) {
      position: static;
      grid-column-start: 4;
      grid-row-start: 4;
      min-width: 35ch;
      transform: translate(-2.5rem, 5rem);
      font-size: 1.5rem;
    }

    @media (min-width: 1280px) {
      font-size: 1.875rem;
    }
  }

  .section-act {
    text-align: center;
    font-size: 0.875rem;
    color: black;

    @media (min-width: 640px) {
      font-size: 1.125rem;
    }
  }

  .section-title {
    margin: 0;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 300;
    color: black;

    @media (min-width: 640px) {
      font-size: 1.875rem;
    }

    @media (min-width: 1280px) {
      font-size: 2.25rem;
    }
  }

  .section-quote-container {
    @media (min-width: 640px) {
      padding: 0 2.5rem;
    }

    @media (min-width: 768px) {
      padding: 0 5rem;
    }

    @media (min-width: 1024px) {
      padding: 0 8rem;
    }

    @media (min-width: 1280px) {
      padding: 0 13rem;
    }

    @media (min-width: 1536px) {
      padding: 0 26rem;
    }
  }

  .section-quote {
    background-color: black;
    padding: 2rem;

    @media (min-width: 1024px) {
      padding: 5rem;
    }
  }

  .quote-text {
    margin-bottom: 1rem;
    font-size: 1.1rem;

    @media (min-width: 640px) {
      font-size: 1.25rem;
    }

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }

    em {
      color: #cfcdcb;
    }
  }

  .quote-author {
    font-size: 0.875rem;
    color: white;

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }

  .poem-section {
    position: relative;
    display: flex;
    min-height: 100lvh;
    scroll-snap-align: start;
    align-items: center;
    background-size: cover;
    background-position: center;
    padding: 5rem 0;

    @media (min-width: 640px) {
      background-attachment: fixed;
    }
  }

  .poem-overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: black;
    opacity: 0.8;
  }

  .poem-container {
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 5rem;
    overflow-x: scroll;
    padding: 0 1.25rem;

    @media (min-width: 768px) {
      align-items: center;
      overflow-x: visible;
    }
  }

  .poem-link {
    padding: 1rem;

    &:hover h3 {
      color: #cfcdcb;
    }
  }

  .poem-title {
    text-align: center;
    font-size: 1.875rem;
    font-weight: 300;
    color: white;

    @media (min-width: 768px) {
      font-size: 2.25rem;
    }

    @media (min-width: 1024px) {
      font-size: 3rem;
    }
  }

  .poem-content {
    margin-top: -3rem;
  }

  .poem-stanza {
    margin-bottom: 2rem;
    max-width: 60ch;
    font-size: 0.875rem;
    color: white;

    @media (min-width: 640px) {
      font-size: 1.125rem;
    }

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }

    @media (min-width: 1280px) {
      font-size: 1.5rem;
    }
  }

  .close-poem {
    margin-top: 8rem;
    text-align: right;
    font-size: 1.5rem;
    color: white;

    @media (min-width: 768px) {
      font-size: 1.875rem;
    }

    @media (min-width: 1024px) {
      font-size: 2.25rem;
    }
  }
</style>