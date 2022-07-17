"use strict";

document.body.classList.add('js-loading');

window.addEventListener("load", showPage);

function showPage() {
    document.body.classList.remove('js-loading');
}

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
        hide(homepageSections);
        removeHoverColor(homepageSections);
        event.target.classList.remove("hide");
        setTimeout(unsetScaleTransition, 500);

        switch (event.target) {
            
        case aboutSection:
            aboutContent.classList.remove("hide");
            break;
        
        case studioSection:
            studioContent.classList.remove("hide");
            break;
            
        case commissionsSection:
            commissionsContent.classList.remove("hide");
            break;
            
        case shopSection:
            shopContent.classList.remove("hide");
            break;
            
        case newsSection:
            newsContent.classList.remove("hide");
            break;
        
        }
    })
}

function hide(collection) {
    for (let elem of collection) {
        elem.classList.add("hide");
    }
}

function unhide(collection) {
    for (let elem of collection) {
        elem.classList.remove("hide");
    }
}

function addHoverColor(collection) {
    for (let elem of collection) {
        elem.classList.add("hover-color");
    }
}

function removeHoverColor(collection) {
    for (let elem of collection) {
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

// function setAnimationOn() {
//     document.querySelector(".logo").style.animationPlayState = play;
//     document.querySelector(".site-title").style.animationPlayState = play;
//     document.querySelector(".subtitle").style.animationPlayState = play;
// }


let lastScrollPosition = 0;

function scrollTopDetect() {
    if (scrollY < lastScrollPosition
        && scrollY < 200
        && scrollY > 5) {
        setTimeout(setScaleTransition, 500);
        unhide(homepageSections);
        addHoverColor(homepageSections);
        hide(homepageSectionContent);
        // setAnimationOn;
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