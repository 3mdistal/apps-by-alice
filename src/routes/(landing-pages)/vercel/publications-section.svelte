<script lang="ts">
    import type { ProfessionalPublications } from './+page.server'

    type PublicationTypes = "Landing Page" | "Technical Blogs" | "Customer Story" | "Enterprise Resource" | "Product Feature";

    export let publications: Array<ProfessionalPublications>;
    export let title: String;
    export let subtitle: String;
    export let type: PublicationTypes;
</script>

<section>
    <h2>{title}</h2>
    <p class="subtitle">{subtitle}</p>
    <ul>
        {#each publications as publication}
            {#if publication.properties.Type.select.name === type}
                <li>
                    <a href={publication.properties.Link.url}>
                        <h3>
                            {publication.properties.Name.title[0].plain_text}
                        </h3>
                    </a>
                    {#if publication.properties.Description.rich_text[0]}
                        <p class="description">{publication.properties.Description.rich_text[0].plain_text}</p>
                    {/if}
                </li>
            {/if}
        {/each}
    </ul>
</section>

<style>
    section {
        margin-bottom: 4rem;
    }

    h2 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    @media (min-width: 640px) {
        h2 {
            font-size: 1.5rem;
        }
    }

    @media (min-width: 768px) {
        h2 {
            font-size: 1.875rem;
        }
    }

    .subtitle {
        font-style: italic;
        margin-bottom: 2rem;
        font-size: 1.125rem;
    }

    @media (min-width: 640px) {
        .subtitle {
            font-size: 1.25rem;
        }
    }

    @media (min-width: 1024px) {
        .subtitle {
            font-size: 1.25rem;
        }
    }

    h3 {
        font-weight: normal;
        color: #155e75;
        font-size: 1.125rem;
    }

    h3:hover {
        text-decoration: underline;
    }

    @media (min-width: 640px) {
        h3 {
            font-size: 1.25rem;
        }
    }

    @media (min-width: 768px) {
        h3 {
            font-size: 1.5rem;
        }
    }

    .description {
        font-style: italic;
        font-size: 0.875rem;
    }

    @media (min-width: 640px) {
        .description {
            font-size: 1.125rem;
        }
    }
</style>
