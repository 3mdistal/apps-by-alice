<script>
    import Form from "../partials/form.svelte";
    import { backgroundColors, accentColors, state } from "../stores";
    import handleCSSVariables from "../utils/css-variables";

    const backgroundColor = $backgroundColors[$state];
    const accentColor = $accentColors[$state];
</script>

<div class="spacer" />
<div class="wrapper" use:handleCSSVariables={(backgroundColor, accentColor)}>
    <div class="hero">
        <div class="text">
            <p>Bring your impossible, intangible things.</p>
        </div>
    </div>
    <div class="spacer" />
    <div class="header">
        <div class="right">
            <p>alice</p>
            <p>alexandra</p>
            <p>moore</p>
        </div>
        <div>
            <img src="/images/commissions/circle.svg" alt="" />
        </div>
        <div>
            <p>developer</p>
            <p>artist</p>
            <p>editor</p>
        </div>
    </div>
    <div class="spacer" />
    <div class="truths">
        <h2>Here are my truths.</h2>
        <div>
            <p class="heading">I respect your ideas.</p>
            <p>
                To me, this is more than a statement. My favorite thing about
                the process of editing another's work is pulling forward their
                own voice, their own originality. This stems not from my skill
                of speaking, but from listening.
            </p>
            <p>
                I bring this ethic into all my work. I'm most excited about
                elaborating on your notions, whether it's designing you a
                website, painting a portrait, or editing your book. You are the
                focus of my attention, and you should be happy with whatever I
                create—else I've done my job wrong.
            </p>
            <p>
                We can be in conversation as much or as little as you want
                during my work, and I'll strive to match the product to the
                image in your head, plus all the creativity and experience I
                bring.
            </p>
        </div>
    </div>
    <div class="spacer" />
    <div class="ambitious">
        <p>Ambitious project? Tired of finding experts? I do it all.</p>
    </div>
    <div class="descriptions">
        <div class="flex">
            <div class="text">
                <h2>Developer</h2>
                <p>
                    Look around the website. Like what you see? I make elegant
                    websites for ambitious projects. I'm passionate about design
                    matching the focus of the work. I've long been frustrated
                    with sites like Medium or Wattpad that don't allow for the
                    full customization the web has to offer. I can work with you
                    to get your content—whatever its type—into a gorgeous
                    layout.
                </p>
            </div>
            <div class="image">
                <img
                    src="/images/commissions/developer.jpeg"
                    alt="Building blocks of the web."
                />
            </div>
        </div>
        <div class="flex flipped">
            <div class="text">
                <h2>Artist</h2>
                <p>
                    Check out my gallery of art. If you like what you see, I can
                    paint you one even better. I'm constantly learning and
                    improving my art, and each new piece feels like my best. I
                    put an extraordinary level of detail in every painting I
                    make, focusing on brushstrokes, careful coloring, emotion,
                    and dynamic light.
                </p>
            </div>
            <div class="image">
                <img
                    src="/images/commissions/artist.jpeg"
                    alt="Painting of a woman in a cornfield."
                />
            </div>
        </div>
        <!-- TODO: Bring in margins. -->
        <div class="flex">
            <div class="text">
                <h2>Editor</h2>
                <p>
                    Have an idea? It's never too early to brainstorm together.
                    I'll provide suggestions to move forward your process,
                    concentrating on your passions. If you want to workshop a
                    coherent piece, I'll content edit, looking especially for
                    places to emphasize themes or characters through cutting,
                    adding, and sequencing. I begin line edits only for
                    near-publishable drafts, clarifying word choice and syntax
                    with a poet's eye for details.
                </p>
            </div>
            <div class="image">
                <img
                    src="/images/commissions/editor.jpeg"
                    alt="A bust made of yellow flowers."
                />
            </div>
        </div>
    </div>
    <div class="spacer" />
    <div class="villain">
        <div>
            <Form />
        </div>
    </div>
</div>

<style lang="scss">
    .wrapper {
        width: 100vw;
    }

    .hero {
        width: 100%;
        height: 100vh;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-image: url("/images/commissions/impossible.jpeg");
        @media (hover:hover) {
            background-attachment: fixed;
        }
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 35%;

        & p {
            font-size: clamp(1.5rem, 3vw, 4rem);
            color: var(--accentColor);
        }

        & .text {
            padding: 3em;
            background-color: rgba(255, 255, 255, 0.5);
            z-index: 100;
            border-radius: 10px;
            margin: 0 2em 0 2em;
        }
    }

    .header {
        padding: 3em 0;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: clamp(1em, 2vw, 3em);
        border: 2px solid var(--accentColor);
        border-radius: 10px;
        width: clamp(275px, 60%, 1000px);
        margin: 0 auto;

        & img {
            width: clamp(50px, 20vw, 300px);
        }

        & .right {
            text-align: right;
        }

        & p {
            color: var(--accentColor);
            font-size: clamp(1rem, 2.5vw, 5rem);
            font-weight: 300;
        }
    }

    .truths {
        background-color: var(--accentColor);
        display: flex;
        width: 90%;
        margin: 0 auto;
        padding: 6em;

        & h2 {
            width: 50%;
            color: #fafafa;
            opacity: 80%;
        }

        & div {
            width: 50%;
        }

        & p {
            margin-bottom: 1.5em;
            color: var(--backgroundColor);
        }

        @media screen and (max-width: 45rem) {
            flex-wrap: wrap;
            row-gap: 2em;
            column-gap: 1px;
            padding: 3em;

            & h2,
            div {
                width: 100%;
            }

            & p {
                max-width: 50ch;
            }
        }

        @media screen and (max-width: 30rem) {
            width: 100%;
            padding: 2em;
        }
    }

    .ambitious {
        border-top: solid 2px var(--accentColor);
        border-bottom: solid 2px var(--accentColor);
        padding: calc(1em + 5vw);
        margin: calc(1em + 5vw);

        & p {
            font-size: clamp(1.5rem, 3vw, 4rem);
            color: var(--accentColor);
            text-align: center;
        }
    }

    .descriptions {
        display: flex;
        flex-direction: column;
        row-gap: 10em;
        padding: calc(1em + 5vw);

        & .flex {
            display: flex;
            column-gap: calc(1em + 10vw);
            align-items: center;
            justify-content: center;

            & .text {
                max-width: 50%;

                & h2 {
                    margin-bottom: 1em;
                    color: var(--accentColor);
                }

                & p {
                    max-width: 50ch;
                }
            }

            & .image {
                max-width: 45%;
                border-top-left-radius: 50px;
                border-bottom-right-radius: 50px;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
                overflow: hidden;
            }

            @media screen and (max-width: 40rem) {
                flex-wrap: wrap;
                row-gap: 3em;

                & .text {
                    max-width: 75%;
                }

                & .image {
                    max-width: 75%;
                }
            }
        }

        & .flipped {
            flex-direction: row-reverse;
        }
    }

    .villain {
        background-image: url("/images/commissions/villain.jpeg");
        @media (hover:hover) {
            background-attachment: fixed;
        }
        background-size: cover;
        background-repeat: no-repeat;
        margin-bottom: -25vh;
        padding: 10em clamp(2em, 20vw, 20em);

        & div {
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            padding: 5em;
        }

        @media screen and (max-width: 50rem) {
            padding: 5em;
        }

        @media screen and (max-width: 35rem) {
            padding: 2em;

            & div {
                padding: 3em;
            }
        }

        @media screen and (max-width: 30rem) {
            padding: 1em;

            & div {
                padding: 2em;
            }
        }
    }
</style>
