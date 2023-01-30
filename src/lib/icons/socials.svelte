<script>
    import gsap from "gsap";
    import { onMount } from "svelte";

    let container;

    onMount(() => {
        gsap.from(container.children, {
            opacity: 0,
            y: 100,
            ease: "elastic",
            duration: 2,
            delay: 0.5,
            stagger: 0.1,
        });
    });

    function handleMouseEnterSocialImage(e) {
        gsap.to(e.target, { scale: 1.2, duration: 2, ease: 'elastic' });
    }

    function handleMouseLeaveSocialImage(e) {
        gsap.to(e.target, { scale: 1, duration: 2, ease: 'elastic.out' });
    }
</script>

<div
    bind:this={container}
    class="flex children:flex-col children:justify-end container justify-center [&_p]:text-center [&_p]:md:text-xl [&_p]:text-sm"
>
    <div class="basis-1/4">
        <a
            href="https://soundcloud.com/tempoimmaterial"
            target="_blank"
            rel="noreferrer"
        >
            <img
                src="images/social-media/soundcloud-rabbit.png"
                alt="Link to Soundcloud in the form of an illustrated rabbit wearing headphones. Painted by Alice Alexandra Moore."
                class="object-contain"
                on:mouseenter={handleMouseEnterSocialImage}
                on:mouseleave={handleMouseLeaveSocialImage}
            />
        </a>
        <p>Soundcloud</p>
    </div>
    <div class="basis-1/3">
        <a
            href="https://www.instagram.com/alice.alexandra.moore"
            target="_blank"
            rel="noreferrer"
        >
            <img
                src="images/social-media/insta-polar-bear.png"
                alt="Link to Instagram in the form of an illustrated polar bear taking a selfie. Painted dby Alice Alexandra Moore."
                class="object-contain"
                on:mouseenter={handleMouseEnterSocialImage}
                on:mouseleave={handleMouseLeaveSocialImage}
            />
        </a>
        <p>Instagram</p>
    </div>
    <div class="basis-1/4">
        <a
            href="https://twitter.com/tempoimmaterial"
            target="_blank"
            rel="noreferrer"
        >
            <img
                src="images/social-media/twitter-squirrel.png"
                alt="Link to Twitter in the form of a squirrel drinking its morning coffee. Painted by Alice Alexandra Moore."
                class="object-contain"
                on:mouseenter={handleMouseEnterSocialImage}
                on:mouseleave={handleMouseLeaveSocialImage}
            />
        </a>
        <p>Twitter</p>
    </div>
</div>
