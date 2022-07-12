"use strict";
alert('Welcome to the site that *will* contain all things Alice Alexandra Moore. For now, what you see is a hulking shell as I get some Javascript to behave correctly. Thanks for your patience. ~Alice');

let homepageSections = document.querySelectorAll(".homepage-section");

for (let elem of homepageSections) {
    elem.classList.add("hover-color")
    elem.onclick = function () {
        for (let eachElem of homepageSections) {
            eachElem.classList.toggle("hide");
        }
        elem.classList.toggle("hide");
        elem.classList.toggle("hover-color");
    }
}
