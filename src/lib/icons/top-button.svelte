<script>
    import Logo from "$images/logo/logo.png?webp"
</script>

<a href="/">
    <img src={Logo} alt="Logo" />
</a>

<style lang="scss">
    a {
        z-index: 1000;
        position: fixed;
        padding: 0.5em;
        width: clamp(2.5rem, 8%, 3.5rem);
        top: 1%;
        right: 1%;
        cursor: pointer;
    }
</style>
