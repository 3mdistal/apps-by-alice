<script>
    import handleCSSVariables from "../utils/css-variables";
    import { accentColors, state } from "../stores";

    const accentColor = $accentColors[$state];

    let form = true;
</script>

{#if form}
    <form method="POST" action="/form">
        <p class="heading" use:handleCSSVariables={accentColor}>
            Let's make something together.
        </p>
        <p style="margin-top: -1.5em; margin-bottom: 2em">
            This form is not currently working. Please reach out to me on social
            media, or from the button at the top of the commissions section.
        </p>
        <div class="form-flex">
            <div class="item-flex">
                <label for="name">Preferred Name:</label>
                <input type="text" id="name" required />
            </div>
            <div class="item-flex">
                <label for="email">Email or Best Contact:</label>
                <input type="email" id="email" required />
            </div>
            <div class="item-flex">
                <label for="description">Project Description:</label>
                <textarea id="description" rows="4" required />
            </div>
            <button type="submit">Submit.</button>
        </div>
    </form>
{:else}
    <p class="heading" style="margin-top: 20%;">
        Thank you for your submission! I'll be in touch shortly.
    </p>
{/if}

<style lang="scss">
    form {
        & .form-flex {
            display: flex;
            flex-direction: column;
            row-gap: 2em;

            & .item-flex {
                display: flex;
                flex-direction: column;
                width: 80%;

                & label {
                    font-size: clamp(1rem, 1.5vw, 2rem);
                    font-weight: 400;
                    color: var(--accentColor);
                }

                & textarea {
                    min-width: 100%;
                    max-width: 100%;
                }
            }
        }
    }

    .heading {
        color: var(--accentColor);
        font-size: clamp(1.5rem, 3vw, 4rem);
        text-align: center;
        margin-bottom: 1em;
    }

    button {
        box-sizing: content-box;
        border-radius: 10px;
        border: none;
        padding: 1em;
        cursor: pointer;
        font-size: clamp(0.8rem, 1.2vw, 1.5rem);
        font-weight: 400;
        text-decoration: none;
        background-color: var(--backgroundColor);
        color: var(--accentColor);
        border: 2.5px solid;
        border-color: var(--accentColor);
        filter: brightness(96%);
        width: 100px;
    }

    button:hover,
    button:focus {
        background-color: var(--accentColor);
        color: var(--backgroundColor);
    }
</style>
