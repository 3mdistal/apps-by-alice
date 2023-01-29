<script>
    import { animate, inView, spring, stagger } from "motion";
    import { onMount } from "svelte";

    onMount(() => {
        inView(".rabbit", () => {
            animate(
                ".flex img",
                { opacity: [0, 1], y: [100, 0] },
                {
                    easing: spring({ velocity: 1000, damping: 10 }),
                    delay: stagger(0.1, { start: 0.25 }),
                }
            );
        });
    });

    function handleMouseEnterSocialImage(e) {
        animate(e.target, { scale: 1.2 }, { easing: spring() });
    }

    function handleMouseLeaveSocialImage(e) {
        animate(e.target, { scale: 1 }, { easing: spring() });
    }
</script>

<div class="flex children:flex-col container justify-center">
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

<style>
    p {
        transform: scale(0.8);
        display: block;
        text-align: center;
    }
</style>
