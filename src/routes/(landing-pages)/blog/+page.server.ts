import { getBlogs } from "$lib/notion/notion";

export async function load() {
  return {
    post: await getBlogs(),
  };
}
