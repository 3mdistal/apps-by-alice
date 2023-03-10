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
