<script>
    import Socials from "../icons/socials.svelte";
    import SubpageContent from "../partials/subpage-content.svelte";

    // TODO: Edit about content and animate individual parts. Take about content off Notion.
</script>

<div class="spacer" />

<SubpageContent>
    <svelte:fragment slot="heading">
        <strong>tempo immaterial</strong>, verb,
        <em>to dream of perpetual insufficiency.</em>
    </svelte:fragment>
    <svelte:fragment slot="text">
        <p>
            I needed a place for everything. If you're a creative like me, you
            might understand the urge to combine all your work, to try to keep
            it in one place. That, in essence, is what <em>Tempo Immaterial</em>
            is, but it's also a powerful reminder: that I am and always will be in
            progress.
        </p>

        <p>
            This website, as you might notice, is incomplete. I lovingly call it
            the eternal beta. The fact of the matter is, as a solo designer and
            developer who thrives taking on complex ideas, I might never iron
            out everything, but I'll always be improving.
        </p>

        <p>
            And yet, I hope you can see the site for what else it is: my best
            attempt to offer a little beauty to a world that too often looks
            hideous. To teach and learn all at once. To sustain myself,
            financially and emotionally, through creative work while trying to
            make it all mean something. All work here—from art to design to
            writing to music—is my own.
        </p>

        <p>
            So, take your time. There's much to discover if you have the
            patience. I know I did, and it was well worth it.
        </p>
    </svelte:fragment>
    <img
        slot="image"
        src="/images/about/owl.png"
        alt="A painting of a Screech Owl staring eerily at the viewer. Painting by Alice Alexandra Moore."
    />
</SubpageContent>

<div class="spacer" />

<SubpageContent flexDirection="row">
    <!-- TODO: Make this section "My Story" or something keda. -->
    <svelte:fragment slot="heading">
        i grew up in a backwoods town, just above the Ohio River.
    </svelte:fragment>
    <svelte:fragment slot="text">
        <p>
            Something about the landscape has resided in me to this day, even as
            I've shed the backwards ideologies of Southern Baptist cults
            threaded through my veins. As a closeted trans woman, I learned not
            to discard the white supremacist neo-fascism, but to understand
            it—to learn how an entire people can become so misled and to hope in
            art that can help them change their views when so many political
            discussions fall on deaf ears.
        </p>
        <p>
            After leaving Ohio, I stayed in the Midwest, pursuing postgraduate
            work in Muncie, Indiana, coming out to myself as trans, and learning
            how to cope with the different ways adhd affects my everyday life.
            These were some of the hardest times I ever experienced, but I grew
            through them, developing an urge to participate in so many
            communities I'd been blind to.
        </p>
        <p>
            The last few years have found me in a different space. I've always
            loved creating all shades of art, and I thrive most when I'm
            learning a new way to do something. Often, my brain pushes me into
            new territory before I've finished old projects, but I've learned to
            appreciate all the "incomplete" works I've made along the way.
            Finally, through this site, I'm sharing so many of them.
        </p>
        <p>
            Currently, I live in Alexandria, Egypt, learning Arabic among so
            many other things. I spend my days here working on various projects,
            whether for myself or commissions for others. If you're interested
            in hiring me, please send me your idea, and we can brainstorm
            together to make something extraordinary.
        </p>
    </svelte:fragment>
    <img
        slot="image"
        src="/images/about/author-photo.jpg"
        alt="Alice Alexandra Moore."
    />
</SubpageContent>

<div class="spacer" />

<SubpageContent>
    <svelte:fragment slot="heading">
        why do i limit my definition of meaningful?
    </svelte:fragment>
    <svelte:fragment slot="text">
        <p class="heading">
            I expect myself to be a specific version of excellent.
        </p>
        <p>
            I eschew conformity in my art only to find myself grasping at
            others' measures of success to weigh my work against.
        </p>
        <p>
            In talking with a dear friend recently, we came to the conclusion
            that <em>
                questions exist not solely to be answered, but rather, too, as
                spelunkers for deeper questions
            </em>.
        </p>
        <p>
            That each idea, once explored, is revealed to be a multitude of
            uncharted worlds.
        </p>
        <p class="heading">
            If art is to be mimesis, must it not, as life, remain incomplete?
        </p>
        <p>
            I've been trying to make a website for a few years now: a place to
            house all my work that doesn't seem to fit anywhere else. What
            always stopped me dead was how much my work, when joined together,
            asks so many more questions than it answers—feels, in other words,
            desperately unfinished.
        </p>
        <p class="heading">
            How arrogant to think I'd be the only voice to ask & answer.
        </p>
        <p>
            This place, instead, I'm making the <em>terra sancta</em> I know how
            to create right now, without all the knowledge I've yet to see before
            I die. Perhaps instead of this studio being a declaration, I can posture
            myself into the shape of a question mark:
        </p>
        <p class="heading">Will you teach me what you know?</p>
    </svelte:fragment>
    <img
        slot="image"
        src="/images/about/mirror.jpeg"
        alt="Painting of a person sitting, holding a mirror. By Alice Alexandra Moore."
    />
</SubpageContent>

<div class="spacer" />

<SubpageContent flexDirection="row">
    <svelte:fragment slot="heading">have thoughts to share?</svelte:fragment>
    <svelte:fragment slot="text">
        <p>
            Though I have plans of fuller, richer ways to engage with the work
            here—even to contribute—this is what I have for now. My ears are
            open, and as such, I may take my time to consider before replying.
            I'll get back to you as I'm able.
        </p>
    </svelte:fragment>
    <Socials slot="image" />
</SubpageContent>

<div class="spacer" />

<style lang="scss">
    strong {
        font-weight: 600;
    }

    img {
        object-fit: contain;
        border-radius: 50px;
    }

    p {
        margin-bottom: 1.5em;
    }

    .heading {
        font-size: clamp(1rem, 1.5vw, 2rem);
        font-weight: 400;
    }
</style>
