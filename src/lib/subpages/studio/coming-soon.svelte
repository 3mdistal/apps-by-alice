<script>
    import { fade } from "svelte/transition";
    let container;

    function back() {
        history.back();
    }
</script>

<div
    class="h-[100%] min-h-[100vh] bg-black px-4 sm:px-10 py-10 tracking-wide text-white [&_*]:text-inherit"
    in:fade="{{ duration: 500 }}"
    out:fade="{{ duration: 500 }}"
    bind:this="{container}"
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
    <div class="max-w-[60ch] text-xl lg:text-2xl [&_p]:mb-[1em] [&_*]:text-inherit">
        <slot name="text" />
    </div>
    <p class="text-right text-4xl md:text-6xl">
        <a on:click|preventDefault="{back}" href="/" class="inline-block p-6"
            >back.</a
        >
    </p>
</div>
