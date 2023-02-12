<script>
    import HomepageWrapper from "../lib/homepage/homepage-wrapper.svelte";
    import SiteTitle from "../lib/homepage/site-title.svelte";
    import { state, backgroundColors } from "../lib/stores";
    import gsap from "gsap";
    import { onMount } from "svelte";

    function changeBackground(delay) {
        gsap.to(document.body, {backgroundColor: `${$backgroundColors[$state]}`, delay: delay})
    }

    onMount(() => {
        state.set("home")
        changeBackground()
    })

</script>


<div class="relative h-[100dvh] overflow-hidden flex-col pt-4 md:pt-[6vh]" >
    <SiteTitle />
    <HomepageWrapper {changeBackground}/>
</div>
