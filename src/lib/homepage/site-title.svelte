<script>
    //TODO: Make a "footer" of site information like copyright. Might also go in About section.

    import { state } from "../stores";
    import { onMount } from "svelte";
    import gsap from "gsap";

    let siteHeaderContainer;
    let logo;
    let siteTitle;
    let subtitle;

    onMount(() => {
        const options = {
            rootMargin: "-150px 0px 0px 0px",
        };

        const callback = (entries) => {
            for (let entry of entries) {
                if (entry.isIntersecting) {
                    $state = "home";
                }
            }
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(siteHeaderContainer);

        const tl = gsap.timeline();

        tl.fromTo(
            logo,
            {
                opacity: 0,
                x: "-200%",
                rotation: "-360deg",
            },
            {
                opacity: 1,
                x: "0%",
                rotation: 0,
                duration: 1,
                ease: "back",
            }
        );

        tl.to(siteTitle, { opacity: 1, duration: 3, delay: -0.5 });
        tl.to(subtitle, { opacity: 1, duration: 3, delay: -2.5 });
    });
</script>

<header
    bind:this={siteHeaderContainer}
    class="site-header-container my-2vh mx-auto mt-[4em] flex max-w-[80vw] flex-col items-center justify-around gap-y-[1em] sm:gap-y-[2em] md:flex-row lg:gap-x-[2em]"
>
    <img
        bind:this={logo}
        src="images/logos/logo-shop.svg"
        alt="The logo for Tempo Immaterial."
        class="w-16 opacity-0 sm:w-24 md:w-32 lg:w-48"
    />
    <div>
        <p
            bind:this={siteTitle}
            class="site-title mb-[0.5em] text-center tracking-[0.4em] opacity-0"
        >
            tempo immaterial
        </p>
        <p
            bind:this={subtitle}
            class="subtitle text-center tracking-[0.15em] opacity-0"
        >
            work by alice alexandra moore
        </p>
    </div>
</header>

<style lang="scss">
    .site-title {
        font-size: clamp(1.5rem, 4vw, 3rem);
    }

    .subtitle {
        font-size: clamp(1rem, 2.5vw, 1.8rem);
    }
</style>
