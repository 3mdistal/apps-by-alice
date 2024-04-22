<script lang="ts">
    import type { ProfessionalPublications } from './+page.server'

    type PublicationTypes = "Landing Page" | "Technical Blogs" | "Customer Story" | "Enterprise Resource" | "Product Feature";

    export let publications: Array<ProfessionalPublications>;
    export let title: String;
    export let subtitle: String;
    export let type: PublicationTypes;
</script>

<section class="mb-16">
    <h2 class="mb-4 sm:text-2xl md:text-3xl">{title}</h2>
    <p class="italic mb-8 text-lg sm:text-xl lg:text-[1.25rem]">{subtitle}</p>
    <ul>
        {#each publications as publication}
            {#if publication.properties.Type.select.name === type}
                <li>
                    <a href={publication.properties.Link.url}>
                        <h3 class="hover:underline font-normal text-cyan-800 text-lg sm:text-xl md:text-2xl">
                            {publication.properties.Name.title[0].plain_text}
                        </h3>
                    </a>
                    {#if publication.properties.Description.rich_text[0]}
                        <p class="italic text-sm sm:text-lg">{publication.properties.Description.rich_text[0].plain_text}</p>
                    {/if}
                </li>
            {/if}
        {/each}
    </ul>
</section>