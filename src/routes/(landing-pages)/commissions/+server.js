import { addCommission } from "$lib/notion/notion";
import { json } from "@sveltejs/kit";

export const POST = async (event) => {
    const data = await event.request.formData()
    const name = data.get('name')
    const email = data.get('email')
    const description = data.get('description')

    addCommission(name, email, description)

    return new Response(json({ success: true }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}