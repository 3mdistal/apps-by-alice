<script>
    import HomepageSection from "./homepage-section/homepage-section.svelte";
    import HomepageSectionContent from "./homepage-section/homepage-section-content.svelte";
    import { state, backgroundColors } from "../stores";
    import Socials from "../icons/socials.svelte";
    import Button from "../icons/button.svelte";
    import { fade } from "svelte/transition";
    import { spring, animate, stagger } from "motion";
    import { onMount } from "svelte";

    let names = ["about", "studio", "commissions", "shop", "news"];

    onMount(() => {
        document.querySelector(".homepage-section-container").style.opacity = 1;
        animate(
            document.querySelectorAll(".homepage-section-container > *"),
            { scaleY: [0, 0.8, 0.9, 1], transformOrigin: "bottom" },
            {
                delay: stagger(0.1, { start: 2.25, from: "last" }),
                easing: spring(),
                allowWebkitAcceleration: true,
            }
        );
    });
</script>

<div>
    <nav class="homepage-section-container" out:fade={{ duration: 500 }}>
        {#each names as name}
            {#if $state == "home" || $state == name}
                <HomepageSection color={$backgroundColors[name]} {name} />
            {/if}
        {/each}
    </nav>

    <article>
        {#if $state == "about" && $state != "home"}
            <HomepageSectionContent name={names[0]}>
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
            <HomepageSectionContent name={names[1]}>
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
            <HomepageSectionContent name={names[2]}>
                <svelte:fragment slot="heading">
                    hire me for ambitious projects.
                </svelte:fragment>
                <svelte:fragment slot="description">
                    I can help you launch and fly the ideas you don't know how
                    to get off the ground. I specialize in organizing difficult
                    to categorize work and creating custom designs and workflows
                    to meet your unique needs.
                </svelte:fragment>
                <Button
                    slot="button"
                    text="Let's make it."
                    url="mailto:tempoimmaterial@gmail.com"
                />
                <span slot="image">
                    <img
                        src="images/homepage/rabbit-in-hat.png"
                        alt="A painting of a rabbit coming out of a hat."
                    />
                </span>
            </HomepageSectionContent>
        {/if}

        {#if $state == "shop" && $state != "home"}
            <HomepageSectionContent name={names[3]}>
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
            <HomepageSectionContent name={names[4]}>
                <svelte:fragment slot="heading">
                    let's keep in touch.
                </svelte:fragment>
                <svelte:fragment slot="description">
                    My newsletter updates you about everything Tempo Immaterial:
                    creations, sales, services, and so forth.
                </svelte:fragment>
                <span slot="image">
                    <Socials />
                </span>
            </HomepageSectionContent>
        {/if}
    </article>
</div>

<style>
    .homepage-section-container {
        position: relative;
        bottom: -40px;
        width: 100%;
        height: 100vh;
        opacity: 0;
    }
</style>
