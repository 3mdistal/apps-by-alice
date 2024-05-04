<script lang="ts">
    import PublicationsSection from "./publications-section.svelte";
    import type { ProfessionalPublications } from './+page.server'
	import { onMount } from "svelte";

    export let data: Data;

    type Data = {
        publicationList: {
            results: Array<ProfessionalPublications>;
        };
    }

    const {
        publicationList: { results: publications },
    } = data;

    onMount(() => {
        fetch(window.location.href, {
			headers: {
				Accept: 'application/json',
				'x-prerender-revalidate': 'JKmtY3BJXXbqQNvcGTUCEkPrrScrd5fs'
			}
		});
    });
</script>

<svelte:head>
    <title>
        Vercel Work
    </title>
    <meta name="description" content=" The work accomplished at Vercel by Alice Alexandra Moore.">
</svelte:head>

<main class="py-32 px-10 sm:px-20 xl:px-80 bg-cyan-50">
    <h1 class="text-2xl sm:text-4xl md:text-6xl mb-16 tracking-wide">
        Some of the best works <br>I've published at Vercel.
    </h1>
    <PublicationsSection
        publications={publications}
        title="Landing Pages"
        subtitle="Solutions marketing landing pages I've headed up and written the content for."
        type="Landing Page"
    />
    <PublicationsSection
        publications={publications}
        title="Product Features"
        subtitle="Announcements and feature highlights I've collaborated with company leaders to ghostwrite."
        type="Product Feature"
    />
    <PublicationsSection
        publications={publications}
        title="Enterprise Resources"
        subtitle="Deep dives I've targeted at specific industries of enterprise buyers."
        type="Enterprise Resource" 
    />
    <PublicationsSection
        publications={publications}
        title="Customer Stories"
        subtitle="My profiles of customers who have experienced big wins with Vercel."
        type="Customer Story"
    />
    <PublicationsSection
        publications={publications}
        title="Technical Blogs"
        subtitle="Articles that I've written to offer developers guidance on Vercel's product."
        type="Technical Blog" 
    />
</main>