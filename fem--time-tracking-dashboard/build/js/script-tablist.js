"use strict";
const tabs = document.querySelectorAll("[role='tab']");
const tablist = document.querySelector("[role='tablist']");

let tabFocus = 1;
tablist.addEventListener("keydown", changeTabFocus);
tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabPanel);
});

function changeTabFocus(e) {
    const key = e.key;
    if (
        key === "ArrowRight" ||
        key === "ArrowDown" ||
        key === "ArrowLeft" ||
        key === "ArrowUp"
    ) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (key === "ArrowRight" || key === "ArrowDown") {
            tabFocus++;
            // If we're at the end, go to the start
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
            // Move left
        } else if (key === "ArrowLeft" || key === "ArrowUp") {
            tabFocus--;
            // If we're at the start, move to the end
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

function changeTabPanel(e) {
    const target = e.target;
    const pageContent = document.querySelector(".page-content");

    // Remove all current selected tabs
    tablist
        .querySelectorAll('[aria-selected="true"]')
        .forEach((t) => t.setAttribute("aria-selected", false));

    // Set this tab as selected
    target.setAttribute("aria-selected", true);

    // Hide all tab panels
    pageContent
        .querySelectorAll('[role="tabpanel"]')
        .forEach((p) => p.setAttribute("hidden", true));

    // Show the selected panel
    pageContent
        .querySelector(`#${target.getAttribute("aria-controls")}`)
        .removeAttribute("hidden");
}
