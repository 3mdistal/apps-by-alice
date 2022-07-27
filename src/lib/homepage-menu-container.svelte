<script>
    import HomepageSection from "./homepage-section.svelte";
    import HomepageSectionContent from "./homepage-section-content.svelte";

    let names = ["about", "studio", "commissions", "shop", "news"];

    let colors = {
        about: "#beb5ca",
        studio: "#d6ddf0",
        commissions: "#dcc9c6",
        shop: "#838391",
        news: "#eeeded",
    };

    let accentColors = {
        about: "#271647",
        studio: "#243269",
        commissions: "#642e1a",
        shop: "#d1dce7",
        news: "#726a12",
    };
</script>

<article>
    <div class="homepage-section-container">
        {#each names as name}
            <HomepageSection color={colors[name]} {name} />
        {/each}

        <HomepageSectionContent
            name={names[0]}
            backgroundColor={colors.about}
            accentColor={accentColors.about}
        >
            <svelte:fragment slot="heading">
                i'm alice, a digital creator.
            </svelte:fragment>
            <svelte:fragment slot="description">
                Welcome to Tempo Immaterial, a place that both showcases my own
                work and acts as the starting point for yours. I'm proud to be a
                queer, multi-disciplinary creative who works from the heart to
                elevate new and unique projects.
            </svelte:fragment>
            <span slot="image">
                <img
                    class="flip-vertical"
                    src="images/homepage/flowers-in-hand.png"
                    alt="A painted hand folding out flowers."
                />
            </span>
        </HomepageSectionContent>

        <HomepageSectionContent
            name={names[1]}
            backgroundColor={colors.studio}
            accentColor={accentColors.studio}
        >
            <svelte:fragment slot="heading">
                i keep chasing new ideas.
            </svelte:fragment>
            <svelte:fragment slot="description">
                I've always been someone who dabbles in everything; learning new
                arts keeps me happy. In my studio, you'll find paintings, poems,
                songs, fiction, memoir, fantasy, and more.
            </svelte:fragment>
            <span slot="image">
                <img
                    src="images/homepage/piano-with-chair.png"
                    alt="A painting of an upright piano and empty wooden chair."
                />
            </span>
        </HomepageSectionContent>

        <HomepageSectionContent
            name={names[2]}
            backgroundColor={colors.commissions}
            accentColor={accentColors.commissions}
        >
            <svelte:fragment slot="heading">
                hire me for ambitious projects.
            </svelte:fragment>
            <svelte:fragment slot="description">
                I can help you launch and fly the ideas you don't know how to
                get off the ground. I specialize in organizing difficult to
                categorize work and creating custom designs and workflows to
                meet your unique needs.
            </svelte:fragment>
            <span slot="image">
                <img
                    src="images/homepage/rabbit-in-hat.png"
                    alt="A painting of a rabbit coming out of a hat."
                />
            </span>
        </HomepageSectionContent>

        <HomepageSectionContent
            name={names[3]}
            backgroundColor={colors.shop}
            accentColor={accentColors.shop}
        >
            <svelte:fragment slot="heading">
                grab a gift (soon).
            </svelte:fragment>
            <svelte:fragment slot="description">
                From art prints to stories to every other kind of creation I
                like to make, the shop will be full of physical and digital
                goodies for you and your loved ones.
            </svelte:fragment>
            <span slot="image">
                <img
                    src="images/homepage/bird.png"
                    alt="A painting of very colorful bird in flight."
                />
            </span>
        </HomepageSectionContent>

        <HomepageSectionContent
            name={names[4]}
            backgroundColor={colors.news}
            accentColor={accentColors.news}
        >
            <svelte:fragment slot="heading">
                let's keep in touch.
            </svelte:fragment>
            <svelte:fragment slot="description">
                My newsletter updates you about everything Tempo Immaterial:
                creations, sales, services, and so forth.
            </svelte:fragment>
            <span slot="image">
                <img
                    src="images/homepage/rabbit-in-hat.png"
                    alt="A painting of a rabbit coming out of a hat."
                />
            </span>
        </HomepageSectionContent>
    </div>
</article>
