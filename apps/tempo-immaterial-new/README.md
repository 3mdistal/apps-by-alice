# A New Portfolio

Over the next few weeks (or months, more likely), I'll be incrementally migrating my Svelte portfolio over to Next.js.

But why?

Two primary reasons:
1. I need practice in incremental migration to be better able to write about it for my job.
2. React Server Components can't be denied. So much so that I'm willing to give up the Svelte developer experience that I love (even amazing Svelte 5 features) to claim that experience of component-level fetching. The code organization wins are too huge, especially when I'm looking to grow the amount of apps I manage, more freely sharing components between them.

So, we find ourselves here. Coming steps:
1. Make alicealexandra.com point to this repo, which in turn will redirect to the other code. A bit counter-intuitive, perhaps, but this allows me to port over one feature at a time and then just take it out of the redirects file. I can keep developing new features in the meantime.
2. Homepage redesign (as new about page). Mini launch.
3. Menu layout migration, initially pointing to homepage.
4. Old homepage to new menu. Now when you click the menu button, the current homepage will show. "About" will take you to the actual homepage.
5. Commissions -> collabs. I'm at a life stage where I don't need work by commission, but would very much like to collab with others on interesting projects.
6. Connect page redesign.
7. Blog migration + redesign. This will be a mammoth project, getting the new Notion parser to work with RSC and developing from there.
8. Studio page migration.
9. Hymns migration and optimizations with RSC.
10. Illustrations migration and optimizations.
11. Postcards landing page + stories given a home.
12. Tall tales landing page + essays given a home.
13. Betson landing page.
14. These Makeshift Idiotika landing page.
15. Content, iterations, and development (also happening along the way, I'm sure).

As you can see, it's going to be a long path there, but one I'm extremely excited to keep walking.