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

const border1 = document.querySelectorAll(".border-1");
const sectionHeadings = document.querySelectorAll(".section-content-div h2");

const aboutAccentColor = "#271647";
const studioAccentColor = "#243269";
const commissionsAccentColor = "#642e1a";
const shopAccentColor = "#fafafa";
const newsAccentColor = "#726a12";

const homepageStateObject = {
    showSiteHeaderContainer: true,
    accentColor: "",
    content: "",
}

function homepageStateChange(state) {

    switch (state) {

    case "home":
        homepageStateObject.showSiteHeaderContainer = true;
        toggleSiteHeaderContainer();
        homepageStateObject.accentColor = "";
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
        homepageStateObject.accentColor = aboutAccentColor;
        homepageStateObject.content = aboutContent;
        break;

    case "studio":
        homepageStateObject.accentColor = studioAccentColor;
        homepageStateObject.content = studioContent;
        break;

    case "commissions":
        homepageStateObject.accentColor = commissionsAccentColor;
        homepageStateObject.content = commissionsContent;
        break;
        
    case "shop":
        homepageStateObject.accentColor = shopAccentColor;
        homepageStateObject.content = shopContent;
        break;

    case "news":
        homepageStateObject.accentColor = newsAccentColor;
        homepageStateObject.content = newsContent;
        break;
        
    }

    toggleSiteHeaderContainer();
    changeBorderColor(border1, homepageStateObject.accentColor);
    changeSectionHeadingsColor(sectionHeadings, homepageStateObject.accentColor);
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




function changeBorderColor(collection, color) {
    for (let elem of collection) {
        elem.style.borderColor = color;
    }
}

function changeSectionHeadingsColor(collection, color) {
    for (let elem of collection) {
        elem.style.color = color;
    }
}

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