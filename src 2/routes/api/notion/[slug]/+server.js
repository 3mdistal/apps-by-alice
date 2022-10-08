import { findName } from "../+server";
import { json } from "@sveltejs/kit"

export async function GET( { params } ) {
    const res = await findName(params.slug)
    return json(
        { "text": res }
    )
}