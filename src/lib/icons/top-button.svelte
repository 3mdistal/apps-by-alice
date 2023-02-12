<script>
    import Logo from "$images/logo/logo.png?webp";
    import { onMount } from "svelte";
    import gsap from "gsap";

    let button;

    function fadeIn() {
        gsap.to(button, { opacity: 1, rotate: "360deg" });
    }

    onMount(() => {
        setTimeout(fadeIn, 1500)
    });
</script>

<a
    href="/"
    bind:this="{button}"
    class="w-10 md:w-20 fixed top-2 md:top-6 md:right-6 right-2 z-10 opacity-0"
>
    <img src="{Logo}" alt="Logo" />
</a>
