<script>
    //TODO: Make a "footer" of site information like copyright. Might also go in About section.

    import { state } from "../stores";
    import { onMount } from "svelte";
    import gsap from "gsap";

    let siteHeaderContainer;

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
        
        let tl = gsap.timeline()
        
        tl.fromTo(
            ".logo", 
            {
                opacity: 0, 
                x: '-200%', 
                rotation: '-360deg', 
                duration: 2, 
                ease: 'power1.back',
            }, 
            {
                opacity: 1, 
                x: '0%', 
                rotation: 0,
            }
        )
        
        tl.to(
            ".site-title",
            { opacity: 1, duration: 3 }
        )
        tl.to(
            ".subtitle",
            { opacity: 1, duration: 3, delay: -2.5 }
        )
    });
    
    function fadeOut() {
        gsap.to(
            siteHeaderContainer,
            { opacity: 0 }
        )
    }
    
    function fadeIn() {
        gsap.to(
            siteHeaderContainer,
            { opacity: 1 }
        )
    }
</script>

<header
    bind:this={siteHeaderContainer}
    class="site-header-container flex flex-row justify-around items-center transition-opacity"
    style={
        $state === 'home' 
        ? fadeIn() 
        : fadeOut()
    }
>
    <img
        src="images/logos/logo-shop.svg"
        alt="The logo for Tempo Immaterial."
        class="logo"
    />
    <div class="site-title-container">
        <p class="site-title mb-[0.5em] text-center tracking-[0.4em]">tempo immaterial</p>
        <p class="subtitle text-center tracking-[0.15em]">work by alice alexandra moore</p>
    </div>
</header>

<style lang="scss">
    .site-header-container {
        max-width: 80vw;
        margin: 2vh auto;

        @media screen and (max-width: 45rem) {
            flex-direction: column;
            row-gap: 2em;
            margin-top: 4em;
        }
    }

    .logo {
        width: clamp(50px, 20%, 200px);
        opacity: 0;
    }

    .site-title {
        font-size: clamp(1.5rem, 4vw, 3rem);
        opacity: 0;
    }

    .subtitle {
        font-size: clamp(1rem, 2.5vw, 1.8rem);
        opacity: 0;
    }
</style>
