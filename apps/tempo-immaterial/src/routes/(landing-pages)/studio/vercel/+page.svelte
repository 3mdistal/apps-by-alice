<script lang="ts">
    import PublicationsSection from "./publications-section.svelte";
    import type { ProfessionalPublications } from './+page.server'

    export let data: Data;

    type Data = {
        publicationList: {
            results: Array<ProfessionalPublications>;
        };
    }

    const {
        publicationList: { results: publications },
    } = data;
</script>

<svelte:head>
    <title>
        Vercel Work
    </title>
    <meta name="description" content=" The work accomplished at Vercel by Alice Alexandra Moore.">
</svelte:head>

<main>
    <h1 class="text-8xl">
        Vercel Work
    </h1>
    <PublicationsSection
        publications={publications}
        title="Landing Pages"
        subtitle="My work on landing pages."
        type="Landing Page"
    />
    <PublicationsSection
        publications={publications}
        title="Enterprise Resources"
        subtitle="My work on landing pages."
        type="Enterprise Resource" 
    />
    <PublicationsSection
        publications={publications}
        title="Technical Blogs"
        subtitle="My work on landing pages."
        type="Technical Blog" 
    />
    <PublicationsSection
        publications={publications}
        title="Customer Stories"
        subtitle="My work on landing pages."
        type="Customer Story"
    />
    <PublicationsSection
        publications={publications}
        title="Product Features"
        subtitle="My work on landing pages."
        type="Product Feature"
    />
</main>