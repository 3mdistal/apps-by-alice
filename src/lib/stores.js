import { readable, writable } from "svelte/store"

export const state = writable("home")

export const names = readable(["about", "studio", "commissions", "blog", "news"]);

export const accentColors = readable({
    about: "#271647",
    studio: "#243269",
    commissions: "#642e1a",
    blog: "#d1dce7",
    news: "#726a12",
})

export const backgroundColors = readable({
    about: "#beb5ca",
    studio: "#d6ddf0",
    commissions: "#dcc9c6",
    blog: "#838391",
    news: "#eeeded",
});