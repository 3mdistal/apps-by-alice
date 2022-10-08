import { readable, writable } from "svelte/store"

export const state = writable("home")

export const names = readable(["about", "studio", "commissions", "shop", "news"]);

export const accentColors = readable({
    about: "#271647",
    studio: "#243269",
    commissions: "#642e1a",
    shop: "#d1dce7",
    news: "#726a12",
})

export const backgroundColors = readable({
    about: "#beb5ca",
    studio: "#d6ddf0",
    commissions: "#dcc9c6",
    shop: "#838391",
    news: "#eeeded",
});

// export const notion = writable("Default")