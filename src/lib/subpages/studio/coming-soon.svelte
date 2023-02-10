<script>
    import gsap from "gsap";
    let container;
    function fade() {
        gsap.from(container.children, { scale: 0.5, duration: 1, ease: "power1.out" })
    }
</script>

<div
    class="h-[100%] bg-black p-4 tracking-wide text-white children:text-inherit"
    in:fade
    bind:this={container}
>
    <h1 class="mb-2 text-5xl md:text-7xl">
        <slot name="title" />
    </h1>
    <p class="mb-[1em] max-w-[30ch] text-2xl md:text-4xl">
        <slot name="subtitle" />
    </p>
    <hr class="my-10 mx-10 opacity-50" />
    <p>
        <em class="mr-4 text-inherit">tl;dr</em>
        <slot name="summary" />
    </p>
    <hr class="my-10 mx-10 opacity-50" />
    <div class="max-w-[60ch] [&_p]:mb-[1em] [&_*]:text-inherit">
        <slot name="text" />
    </div>
</div>
