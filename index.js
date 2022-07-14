"use strict";

document.body.classList.add('js-loading');

window.addEventListener("load", showPage);

function showPage() {
    document.body.classList.remove('js-loading');
}

let homepageSections = document.querySelectorAll(".homepage-section");

for (let elem of homepageSections) {
    elem.onclick = toggleDisplay;
}

function toggleDisplay() {
    setHide();
    this.classList.remove("hide");
    setTimeout(unsetScaleTransition, 500);
}

function setHide() {
    for (let elem of homepageSections) {
        elem.classList.add("hide");
        elem.classList.remove("hover-color");
    }
}

function setScaleTransition() {
    for (let elem of homepageSections) {
        elem.classList.add("scale-transition");
    }
}

function unsetScaleTransition() {
    for (let elem of homepageSections) {
        elem.classList.remove("scale-transition");
    }
}

function unsetHide(collection) {
    for (let elem of collection) {
        elem.classList.remove("hide");
        elem.classList.add("hover-color");
    }
}


let lastScrollPosition = 0;

function scrollTopDetect() {
    if (scrollY < lastScrollPosition
        && scrollY < 200
        && scrollY > 10) {
        setTimeout(setScaleTransition, 500);
        unsetHide(homepageSections);
        lastScrollPosition = 0;
    }

    lastScrollPosition = scrollY;
}


function listenUserScroll() {
    window.addEventListener(
        "scroll",
        scrollTopDetect,
        { passive: true }
    )
}

listenUserScroll();
