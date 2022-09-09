<script>
    export let color;
    export let name;

    import { fade } from "svelte/transition";
    import { state } from "../stores";

    function handleClickSection() {
        document.activeElement.blur();
        state.set(name);
    }

    function handleKeyDown(e) {
        switch (e.keyCode) {
            case 13:
            case 32:
                document.activeElement.blur();
                state.set(name);
                break;
            default:
                break;
        }
    }
</script>

<div
    class="homepage-section {name} {$state == 'home' ? 'hover-color' : ''}"
    style="background:{color};"
    on:click={handleClickSection}

    on:keydown={handleKeyDown}
    tabindex=0
    role="navigation"
    aria-label={name}

    out:fade
    in:fade={{ delay: 250 }}
>
    {#if $state == "home"}
        <div
            class="homepage-section-menu-link {name}"
            in:fade={{ delay: 250 }}
            out:fade
        >
            <h1>{name}</h1>
        </div>
    {/if}
</div>

<style>
    :global(h1) {
        font-size: clamp(1.25rem, 2vw, 3rem);
    }

    .homepage-section {
        height: 100%;
        position: absolute;
        bottom: 0%;
        width: 100%;
        opacity: 100%;
    }

    .homepage-section.about {
        clip-path: url(#about-path);
    }

    .homepage-section.studio {
        clip-path: url(#studio-path);
    }

    .homepage-section.commissions {
        clip-path: url(#commissions-path);
        height: 82%;
    }

    .homepage-section.shop {
        clip-path: url(#shop-path);
        height: 75%;
    }

    .homepage-section.news {
        clip-path: url(#news-path);
        height: 50%;
    }

    .hover-color:hover, :focus {
        filter: saturate(150%) brightness(95%) hue-rotate(5deg);
        cursor: pointer;
        animation: bounce 0.5s ease-in-out;
        animation-fill-mode: forwards;
    }

    @keyframes bounce {
        0% {
            transform: translateY(0px);
        }

        50% {
            transform: translateY(-30px);
        }

        100% {
            transform: translateY(0px);
        }
    }

    .homepage-section-menu-link {
        position: absolute;
        pointer-events: none;
        transition: 0.5s;
    }

    .homepage-section-menu-link.about {
        top: 15%;
        left: 33%;
    }

    .homepage-section-menu-link.studio {
        right: 18%;
        top: 8%;
    }

    .homepage-section-menu-link.commissions {
        right: 32%;
        top: 9%;
    }

    .homepage-section-menu-link.shop {
        right: 20%;
        top: 22%;
    }

    .homepage-section-menu-link.shop h1 {
        color: #fafafa;
    }

    .homepage-section-menu-link.news {
        left: 27%;
        top: 12%;
    }

    @media screen and (max-width: 45rem) {
        .site-header-container {
            margin-top: 10vh;
            flex-direction: column;
        }

        .homepage-section-container {
            margin-top: 6%;
        }

        .homepage-section.studio {
            clip-path: url(#studio-path-mobile);
            height: 90%;
        }

        .homepage-section.commissions {
            clip-path: url(#commissions-path-mobile);
            height: 78%;
        }

        .homepage-section.shop {
            clip-path: url(#shop-path-mobile);
            height: 68%;
        }

        .homepage-section.news {
            height: 55%;
        }

        .homepage-section-menu-link.about {
            top: 10%;
        }

        .homepage-section-menu-link.studio {
            top: 6%;
            right: 14%;
        }

        .homepage-section-menu-link.commissions {
            right: 20%;
        }

        .homepage-section-menu-link.shop {
            top: 12%;
        }

        .homepage-section-menu-link.news {
            left: 23%;
        }
    }
</style>
