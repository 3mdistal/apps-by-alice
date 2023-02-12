<script>
    import HomepageWrapper from "../lib/homepage/homepage-wrapper.svelte";
    import SiteTitle from "../lib/homepage/site-title.svelte";
    import { state, backgroundColors } from "../lib/stores";
    import gsap from "gsap";

    function changeBackground() {
        gsap.to(document.body, {backgroundColor: `${$backgroundColors[$state]}`, delay: .75})
    }
</script>

<SiteTitle />
<HomepageWrapper {changeBackground}/>
