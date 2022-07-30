import { readable, writable } from "svelte/store"

export const state = writable("home")

export const accentColors = readable({
    about: "#271647",
    studio: "#243269",
    commissions: "#642e1a",
    shop: "#d1dce7",
    news: "#726a12",
})