<script>
    import { state } from "./stores";
    import { onMount } from "svelte";

    let siteHeaderContainer

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
    });
</script>

<header
    bind:this={siteHeaderContainer}
    class="site-header-container"
    style={$state === "home" ? "opacity: 100%" : "opacity: 0%"}
>
    <img
        src="images/logos/logo-shop.svg"
        alt="The logo for Tempo Immaterial."
        class="logo"
    />
    <div class="site-title-container">
        <p class="site-title centered">tempo immaterial</p>
        <p class="subtitle centered">work by alice alexandra moore</p>
    </div>
</header>

<style>
    .site-header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        max-width: 80vw;
        margin: 2vh auto;
        transition: 0.5s;
    }

    @media screen and (max-width: 45rem) {
        .site-header-container {
            flex-direction: column;
            row-gap: 2em;
            margin-top: 4em;
        }
    }

    .logo {
        width: clamp(50px, 20%, 200px);
        -webkit-animation: logo-roll 1s ease-in-out both,
            fade-in 1s ease-in both;
        animation: logo-roll 1s ease-in-out both, fade-in 1s ease-in both;
    }

    .site-title {
        font-size: clamp(1.5rem, 4vw, 3rem);
        letter-spacing: 0.4em;
        margin-bottom: 0.5em;
        -webkit-animation: fade-in 1s ease-in 1s both;
        animation: fade-in 1s ease-in 1s both;
    }

    .subtitle {
        font-size: clamp(1rem, 2.5vw, 1.8rem);
        letter-spacing: 0.15em;
        -webkit-animation: fade-in 1s ease-in 1.5s both;
        animation: fade-in 1s ease-in 1.5s both;
    }

    .centered {
        text-align: center;
    }

    @keyframes fade-in {
        from {
            opacity: 0%;
        }

        to {
            opacity: 100%;
        }
    }

    @keyframes logo-roll {
        from {
            transform: translateX(-200%) rotateZ(-360deg);
        }

        to {
            transform: translateX(0%) rotateZ(0deg);
        }
    }
</style>
