<div class="container">
    <div class="flex">
        <div class="rabbit">
            <a href="https://soundcloud.com/tempoimmaterial" target="_blank">
                <img
                    src="images/social-media/soundcloud-rabbit.png"
                    alt="Link to Soundcloud in the form of an illustrated rabbit wearing headphones. Painted by Alice Alexandra Moore."
                />
            </a>
        </div>
        <div class="bear">
            <a href="https://www.instagram.com/alice.alexandra.moore" target="_blank">
                <img
                    src="images/social-media/insta-polar-bear.png"
                    alt="Link to Instagram in the form of an illustrated polar bear taking a selfie. Painted dby Alice Alexandra Moore."
                />
            </a>
        </div>
        <div class="squirrel">
            <a href="https://twitter.com/tempoimmaterial" target="_blank">
                <img
                    src="images/social-media/twitter-squirrel.png"
                    alt="Link to Twitter in the form of a squirrel drinking its morning coffee. Painted by Alice Alexandra Moore."
                />
            </a>
        </div>
    </div>
    <div class="flex labels">
        <p class="rabbit">Soundcloud</p>
        <p class="bear">Instagram</p>
        <p class="squirrel">Twitter</p>
    </div>
</div>

<style>
    .labels {
        width: 100%;
    }

    p {
        transform: scale(.8);
    }

    .flex {
        display: flex;
    }

    .bear {
        width: 40%;
    }

    .rabbit {
        width: 30%;
    }

    .squirrel {
        width: 25%;
    }

    img {
        object-fit: contain;
        transition: .3s ease-in-out;
    }

    img:hover {
        transform: scale(1.1);
    }

    p {
        display: block;
        text-align: center;
    }
</style>
