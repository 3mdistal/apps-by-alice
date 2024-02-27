## 0.4.1

_27 Feb 2024_

**Refactors**
- Moved application into a monorepo alongside some other projects.
- Internal Notion fetching wasn't super typed, but now it is.

**Bugfixes**
- There was an edge case where you could hit a 404 by trying to visit a blog, which happened if you hard refreshed the homepage and then navigated to the blog + an article. This is fixed.

**Goals from Last Changelog**
- SvelteKit -> Next.js (cancelled). After playing with React and Next.js quite a bit, I decided I like the semantics and native performance of SvelteKit more than I like some of the conveniences of Next.js, like component-level data/caching and font optimization. I'll continue to be on the lookout for how to optimize my own workflow within SvelteKit, especially with 5.0 launching soon.

**Adjusted Upcoming Goals**
- Upgrade to SvelteKit 2.0 and prepare for Svelte 5.0
- Monorepo foundations improved
- Design system foundations improved
- Increased type safety across the application
- Test suite begun
- Fix CLS on homepage and subpages for better Core Web Vitals.
- Use SvelteKit 2 image optimization.


## 0.4.0

_21 Nov 2023_

**Honestly, this release is just a lot of random shit I've been working on.**

**Features**
- New studio homepage! (/studio)
  - Lots of projects coming here, lots of new links. Highly recommend checking it out to see what's coming, creatively speaking.
- New poems page! (/studio/hfc)
- New illustrations page! (/studio/illustrations)
- New arcade page! (/studio/arcade) (But let's be real, this is just a weird place where _I'm_ playing and learning HTML canvas.)
- Vercel Analytics added for shallow info (Basically number of requests coming in for which pages. Nothing too user-tracky.)
- Blog now has categories and auto-generated read times.

**Enhancements**
- Pong loading spinner for blog images bc why the fuck not.
- Lots of pages that didn't have metadata/OG images now have that.
- HR added to Notion parser.
- Notion synced blocks get fetched on the server rather than client now, which allows for caching the result with ISR.
- Mastodon verification.

**Refactors**
- Continuing to eliminate Typescript squigglies across the application. (Mostly now down to the way I fetch data from Notion—which needs some sort of schema implemented. Actively searching for a way to generate types from Notion so I don't have to write them myself.)
- Big cleanup in my notion.ts server fetching. Functions are fewer, shorter and more reusable at this point, with params to customize behavior moved over to the individual API layers.
- Tailwind more or less app-wide at this point. I keep switching as I see it, but it's pretty well integrated.

**Bugfixes**
- Homepage transition to other pages was rocky at slow loading speeds. Smoothed this out. (Going to implement View Transitions API in a future update.)
- Various instances of Notion CMS erroring out that have been smoothed over time.
- Various background image behavior fixed on mobile.

**Goals from Last Changelog**

- Typescript app-wide. (Check, just working on passing for data schema.)
- Tailwind app-wide, design system solidified, class variance authority used for dynamic design cases. (Tailwind is app wide, but I've used Svelte native functionality for dynamic cases.)
- Light mode / dark mode. (Nothing here yet, besides the blog.)
- CMS further implemented with Incremental Static Regeneration. (Check, esp. with moving more dynamic behavior to the server.)
- More blog content. (Check.)
- More studio content. (Check.)
- Newsletter begun. (Honestly backlogged in favor of other things.)

**Upcoming Goals**

- Incremental migration to Next.js + Turborepo. I don't take the decision of abandoning SvelteKit lightly, but I also can't ignore Next's feature set at the moment, primarily around React Server Components, which would drastically help me organize my data across the app. There's a whole lot of other longterm goals I have that really need a more solid foundation than what I have currently. So, all that said: the 0.5.0 milestone will (likely) be when I have all current functionality over on Next.js. Wish me luck!


## 0.3.0

_10 March 2023_

**The Notion CMS has landed.**

**Features**

- Blog posts populated from Notion database.
- Blog entries populated from Notion.
  - Automatically generated Table of Contents for each post.
  - Custom subscript and superscript tags.
  - Space made for custom Notion components that will map to certain Svelte components, like a "real" CMS.
- Blog post light mode / dark mode.
- Syntax highlighting for code examples on the blog.

**Enhancements**

- Incremental Static Regeneration (ISR) implemented throughout blog, for fast cached data.
- Github added to social media area.
- Home button on landing pages and blogs has been given an animation for clarity.
- Scroll smoothing on the blog.
- Open Graph images and descriptions added.

**Refactors**

- Typescript implmented, app-wide. Will fix all my red squigglies eventually.

**Bugfixes**

- Images from Notion properly updated when Notion link expires.
- On the dev side, got Prettier to work correctly with sorting Tailwind classes.

**Upcoming Goals**

- Tailwind app-wide, design system further solidified.
- Design improvements to site to match homepage aesthetic more.
- App-wide light mode / dark mode.
- Homepage transitions cleaned up (currently using timeouts but should be listening to transition end).
- Vite ImageTools fixed up to function.
- Fleshing out the studio pages with content.
- More content moved over to the CMS to separate concerns.

## 0.2.0

_21 February 2023_

**Features**

- Notion backend for commissions form, including email notification system.
- All landing pages now have their own dedicated routes.
- Transition added between homepage and landing pages that fits the vibe.
- Images now imported via Vite Image Tools and converted to webp, making size much smaller.
- Blog added and started.
- Coming soon content for all studio pages.

**Enhancements**

- All animations converted to GSAP and finessed.
- Landing page animations now on scroll.
- MDSvex implementation for simple content.
- A11y more intuitive for homepage.

**Refactors**

- Sass => TailwindCSS
- Change "news" to "connect."
- Store deprecated in favor of blog.
- Bio updated.

**Bugfixes**

- Commissions button no longer reveals email.
- Graphical performance issues on Safari across devices.
- Fixes numerous FOUCs.

**Upcoming Goals**

- Typescript app-wide.
- Tailwind app-wide, design system solidified, class variance authority used for dynamic design cases.
- Light mode / dark mode.
- CMS further implemented with Incremental Static Regeneration.
- More blog content.
- More studio content.
- Newsletter begun.

## 0.1.0

_August 2022_

Site is functional, though missing content and working forms.
