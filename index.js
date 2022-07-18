"use strict";

document.body.classList.add('js-loading');

window.addEventListener("load", showPage);

function showPage() {
    document.body.classList.remove('js-loading');
}


const siteHeaderContainer = document.querySelector(".site-header-container");

const homepageSections = document.querySelectorAll(".homepage-section");
const aboutSection = homepageSections[0];
const studioSection = homepageSections[1];
const commissionsSection = homepageSections[1];
const shopSection = homepageSections[1];
const newsSection = homepageSections[1];

const homepageSectionContent = document.querySelectorAll(".homepage-section-content");
const aboutContent = homepageSectionContent[0];
const studioContent = homepageSectionContent[1];
const commissionsContent = homepageSectionContent[1];
const shopContent = homepageSectionContent[1];
const newsContent = homepageSectionContent[1];



for (let elem of homepageSections) {
    elem.addEventListener("click", (event) => {

        siteHeaderContainer.classList.add("hide");

        for (elem of homepageSections) {
            if (elem != event.target) {
                hide(elem);
            }

            removeHoverColor(elem);
        }

        for (elem of homepageSectionContent) {
            elem.style.transition = ".5s .5s";
        }


        switch (event.target) {

        case aboutSection:
            unhide(aboutContent);
            break;

        case studioSection:
            unhide(studioContent);
            break;

        case commissionsSection:
            unhide(commissionsContent);
            break;

        case shopSection:
            unhide(shopContent);
            break;

        case newsSection:
            unhide(newsContent);
            break;

        }
    })
}

function hide(elem) {
    elem.classList.add("hide");
    setTimeout(() => {
        elem.classList.add("invisible");
    }, 500);
}

function unhide(elem) {
    elem.classList.remove("invisible");
    setTimeout(() => {
        elem.classList.remove("hide");
    }, 1);
}

function addHoverColor(elem) {
    elem.classList.add("hover-color");
}

function removeHoverColor(elem) {
    elem.classList.remove("hover-color");
}


let lastScrollPosition = 0;

function scrollTopDetect() {
    if (scrollY < lastScrollPosition
        && scrollY < 200
        && scrollY > 5) {

        siteHeaderContainer.classList.remove("hide");

        for (let elem of homepageSections) {
            unhide(elem);
            addHoverColor(elem);
        }

        for (let elem of homepageSectionContent) {
            elem.style.transition = ".5s";
            hide(elem);
        }

        lastScrollPosition = 0;
    }

    lastScrollPosition = scrollY;
}


(function listenUserScroll() {
    window.addEventListener(
        "scroll",
        scrollTopDetect,
        { passive: true }
    )
})();