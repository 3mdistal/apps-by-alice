<script>
    import { accentColors, state } from "../stores";
    // window.history.pushState("object or string", "Title", "/about");
</script>

<div class="spacer" />
<div class="wrapper">
    <h2 style="color: {$accentColors[$state]}">
        <strong>tempo immaterial</strong>, verb, to dream of perpetual
        insufficiency.
    </h2>
    <div class="content">
        <div class="text">
            <p>
                I needed a place for everything. If you're a creative like me,
                you might understand the urge to combine all your work, to try
                to keep it in one place. That, in essence, is what Tempo
                Immaterial is, but it's also a powerful reminder: that I am and
                always will be in progress.
            </p>
            <p>
                This website, as you might notice, will have bugs. I lovingly
                call it the eternal beta. The fact of the matter is, as a solo
                designer and developer who thrives taking on complex ideas, I
                might never iron out everything, but I'll always be improving.
            </p>
            <p>
                And yet, I hope you can see the site for what else it is: my
                best attempt to offer a little beauty to a world that too often
                looks hideous. To teach and learn all at once. To sustain
                myself, financially and emotionally, through creative work while
                trying to make it all mean something. All work here—from art to
                design to writing to music—is my own.
            </p>
            <p>
                So, take your time. There's much to discover if you have the
                patience. I know I did, and it was well worth it.
            </p>
        </div>
    </div>
</div>

<style lang="scss">
    .spacer {
        height: 25vh;
    }
    .wrapper {
        width: 75%;
        margin: 0 auto;
        text-align: center;
    }

    .content {
        display: flex;
        justify-content: space-between;
        padding: 0 10%;
    }
    strong {
        font-weight: 600;
    }
    .text {
        text-align: left;
        max-width: 60ch;
        margin: 0 auto;
    }
    p {
        margin-bottom: 1.5em;
    }

    h2 {
        margin-bottom: 1.5em;
    }
</style>
