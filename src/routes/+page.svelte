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

<SiteTitle />
<HomepageWrapper {changeBackground}/>
