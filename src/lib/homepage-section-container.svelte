<script>
    import HomepageSection from "./homepage-section.svelte";
    import HomepageSectionContent from "./homepage-section-content.svelte";
    import { state } from "./stores";
import TopButton from "./top-button.svelte";

    let names = ["about", "studio", "commissions", "shop", "news"];

    let colors = {
        about: "#beb5ca",
        studio: "#d6ddf0",
        commissions: "#dcc9c6",
        shop: "#838391",
        news: "#eeeded",
    };
</script>

<article>
    <div class="homepage-section-container">
        {#each names as name}
            {#if $state == "home" || $state == name}
                <HomepageSection color={colors[name]} {name} />
            {/if}
        {/each}

        {#if $state == "about" && $state != "home"}
            <HomepageSectionContent
                name={names[0]}
                backgroundColor={colors.about}
            >
                <svelte:fragment slot="heading">
                    i'm alice, a digital creator.
                </svelte:fragment>
                <svelte:fragment slot="description">
                    Welcome to Tempo Immaterial, a place that both showcases my
                    own work and acts as the starting point for yours. I'm proud
                    to be a queer, multi-disciplinary creative who works from
                    the heart to elevate new and unique projects.
                </svelte:fragment>
                <span slot="image">
                    <img
                        class="flip-vertical"
                        src="images/homepage/flowers-in-hand.png"
                        alt="A painted hand folding out flowers."
                    />
                </span>
            </HomepageSectionContent>
        {/if}

        {#if $state == "studio" && $state != "home"}
            <HomepageSectionContent
                name={names[1]}
                backgroundColor={colors.studio}
            >
                <svelte:fragment slot="heading">
                    i keep chasing new ideas.
                </svelte:fragment>
                <svelte:fragment slot="description">
                    I've always been someone who dabbles in everything; learning
                    new arts keeps me happy. In my studio, you'll find
                    paintings, poems, songs, fiction, memoir, fantasy, and more.
                </svelte:fragment>
                <span slot="image">
                    <img
                        src="images/homepage/piano-with-chair.png"
                        alt="A painting of an upright piano and empty wooden chair."
                    />
                </span>
            </HomepageSectionContent>
        {/if}

        {#if $state == "commissions" && $state != "home"}
            <HomepageSectionContent
                name={names[2]}
                backgroundColor={colors.commissions}
            >
                <svelte:fragment slot="heading">
                    hire me for ambitious projects.
                </svelte:fragment>
                <svelte:fragment slot="description">
                    I can help you launch and fly the ideas you don't know how
                    to get off the ground. I specialize in organizing difficult
                    to categorize work and creating custom designs and workflows
                    to meet your unique needs.
                </svelte:fragment>
                <span slot="image">
                    <img
                        src="images/homepage/rabbit-in-hat.png"
                        alt="A painting of a rabbit coming out of a hat."
                    />
                </span>
            </HomepageSectionContent>
        {/if}

        {#if $state == "shop" && $state != "home"}
            <HomepageSectionContent
                name={names[3]}
                backgroundColor={colors.shop}
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
        {/if}

        {#if $state == "news" && $state != "home"}
            <HomepageSectionContent
                name={names[4]}
                backgroundColor={colors.news}
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
        {/if}
    </div>

</article>

<style>
    .homepage-section-container {
        width: 100%;
        height: 100vh;
        -webkit-animation: slide-from-bottom 0.65s ease-in-out 2.25s both;
        animation: slide-from-bottom 0.65s ease-in-out 2.25s both;
    }

    @keyframes slide-from-bottom {
        0% {
            transform: scaleY(0);
            transform-origin: bottom;
        }

        65% {
            transform: scaleY(1.1);
        }

        90% {
            transform: scaleY(0.95);
        }

        100% {
            transform: scaleY(1);
        }
    }
</style>
