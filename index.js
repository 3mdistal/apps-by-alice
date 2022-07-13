"use strict";
// alert('Welcome to the site that *will* contain all things Alice Alexandra Moore. For now, what you see is a hulking shell as I get some Javascript to behave correctly. Thanks for your patience. ~Alice');

let homepageSections = document.querySelectorAll(".homepage-section");

for (let elem of homepageSections) {
    elem.classList.add("hover-color")

    elem.onclick = () => {
        for (let eachElem of homepageSections) {
            eachElem.classList.add("hide");
            eachElem.classList.remove("hover-color");
        }

        elem.classList.remove("hide");
    }
}

let lastScrollPosition = 0;

window.addEventListener("scroll", () => {
    if (scrollY < lastScrollPosition && scrollY < 200 && scrollY > 10) {
        for (let elem of homepageSections) {
            elem.classList.remove("hide");
            elem.classList.add("hover-color");
        }
        lastScrollPosition = 0;
    }

    lastScrollPosition = scrollY;
}, { passive: true })