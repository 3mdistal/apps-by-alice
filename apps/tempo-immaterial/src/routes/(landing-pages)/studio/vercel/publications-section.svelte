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
    <p class="italic">{subtitle}</p>
    <ul>
        {#each publications as publication}
            {#if publication.properties.Type.select.name === type}
                <li>
                    <a href={publication.properties.Link.url}>
                        <h3>
                            {publication.properties.Name.title[0].plain_text}
                        </h3>
                    </a>
                    <p>
                        {publication.properties.Date.date.start}
                    </p>
                    <p>
                        {publication.properties.Type.select.name}
                    </p>
                </li>
            {/if}
        {/each}
    </ul>
</section>

<style>
    h3 {
        font-weight: 400;
        color: rgb(34, 65, 103);

        &:hover {
            text-decoration: underline;
        }
    }
</style>