import { addCommission } from "$lib/notion/notion";
import type { RequestEvent } from "@sveltejs/kit";

export const POST = async (event: RequestEvent) => {
  const data = await event.request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const description = data.get("description");

  const stream = await addCommission(name, email, description);

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
