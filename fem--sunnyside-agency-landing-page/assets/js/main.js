"use strict";

const btMenu = document.querySelector(".bt-menu");
const mainNav = document.querySelector(".main-nav");

btMenu.addEventListener("click", function () {
    mainNav.classList.toggle("is-open");
    "true" === btMenu.getAttribute("aria-expanded")
        ? btMenu.setAttribute("aria-expanded", "false")
        : btMenu.setAttribute("aria-expanded", "true");
});
