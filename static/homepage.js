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
const commissionsSection = homepageSections[2];
const shopSection = homepageSections[3];
const newsSection = homepageSections[4];

const homepageSectionMenuLinks = document.querySelectorAll(".homepage-section-menu-link")

const homepageSectionContent = document.querySelectorAll(".homepage-section-content");
const aboutContent = homepageSectionContent[0];
const studioContent = homepageSectionContent[1];
const commissionsContent = homepageSectionContent[2];
const shopContent = homepageSectionContent[3];
const newsContent = homepageSectionContent[4];

const homepageStateObject = {
    showSiteHeaderContainer: true,
    content: "",
}

function homepageStateChange(state) {

    switch (state) {

    case "home":
        homepageStateObject.showSiteHeaderContainer = true;
        toggleSiteHeaderContainer();
        homepageStateObject.content = "";
        
        for (let elem of homepageSectionContent) {
            hide(elem);
        }

        for (let elem of homepageSections) {
            unhide(elem);
            addHoverColor(elem);
        }

        for (let elem of homepageSectionMenuLinks) {
            unhide(elem);
        }

        return;

    case "about":
        homepageStateObject.content = aboutContent;
        break;

    case "studio":
        homepageStateObject.content = studioContent;
        break;

    case "commissions":
        homepageStateObject.content = commissionsContent;
        break;
        
    case "shop":
        homepageStateObject.content = shopContent;
        break;

    case "news":
        homepageStateObject.content = newsContent;
        break;
        
    }

    toggleSiteHeaderContainer();
    unhide(homepageStateObject.content);
}

for (let elem of homepageSections) {
    elem.addEventListener("click", (event) => {

        homepageStateObject.showSiteHeaderContainer = false;

        for (elem of homepageSections) {
            if (elem != event.target) {
                hide(elem);
            }

            removeHoverColor(elem);
        }

        for (elem of homepageSectionMenuLinks) {
            hide(elem);
        }

        switch (event.target) {

        case aboutSection:
            homepageStateChange("about");
            break;

        case studioSection:
            homepageStateChange("studio");
            break;

        case commissionsSection:
            homepageStateChange("commissions");
            break;

        case shopSection:
            homepageStateChange("shop");
            break;

        case newsSection:
            homepageStateChange("news");
            break;

        }
    })
}



const options = {
    rootMargin: "-100px 0px 0px 0px"
};

const callback = entries => {
    for (let entry of entries) {
        if (entry.isIntersecting) { 
            homepageStateChange("home"); 
        }
    }
}

const observer = new IntersectionObserver(callback, options);

observer.observe(siteHeaderContainer);


function toggleSiteHeaderContainer() {
    homepageStateObject.showSiteHeaderContainer == true
        ? siteHeaderContainer.classList.remove("hide")
        : siteHeaderContainer.classList.add("hide");
}

function hide(elem) {
    elem.style.transition = "opacity .5s";
    elem.classList.add("hide");
    setTimeout(() => {
        elem.classList.add("invisible");
    }, 500);
}

function unhide(elem) {
    elem.style.transition = "opacity .5s .5s";
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