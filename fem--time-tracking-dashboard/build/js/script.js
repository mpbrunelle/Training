"use strict";
/**
 * Gets the data and displays the initial view in main.page-content
 */
const init = function () {
    // Get the data.
    const request = new XMLHttpRequest();
    request.open("GET", "./js/data.json");
    request.responseType = "json";
    request.send();
    request.onload = function () {
        const trackerData = request.response;
        const initialTimeframe = document
            .querySelector("[aria-current]")
            .innerText.toLowerCase();

        // Populate the main and listen for clicks on the nav.
        displayData(trackerData, initialTimeframe);
        listenToNav(trackerData);
    };
};

/**
 * Listens to clicks in nav,
 * updates page-nav__list-item status (aria-current)
 * and calls the new page view based on the item clicked.
 *
 * @param {object} trackerData JSON object that contains all the data.
 */
const listenToNav = function (trackerData) {
    document.querySelector(".page-nav").addEventListener("click", (e) => {
        // Find which button was clicked through event delegation (bubbling).
        const selectedItem = e.target;
        const timeframe = selectedItem.innerText.toLowerCase();

        setAriaSelected(selectedItem);
        displayData(trackerData, timeframe);
    });
};

/**
 * Moves the aria-current="true" property from
 * the previous page-nav__list-item to the one clicked by the user.
 *
 * @param {string} selectedItem The clicked element in the nav.
 */
const setAriaSelected = function (selectedItem) {
    // change the aria-current status on the nav buttons.
    document.querySelector("[aria-current]").removeAttribute("aria-current");
    selectedItem.setAttribute("aria-current", "page");
};

/**
 * Modifies the title property to make it suitable for a class name
 * (all lowercase and with hyphens instead of spaces);
 *
 * @param {string} attribute The title of the article.
 * @returns {string} The title in lowercase and with hyphens instead of spaces.
 */
const sanitizeAttribute = function (attribute) {
    /**
     * Notice the g flag on the RegExp, it will make the replacement globally within the string,
     * if it's not used, only the first occurrence will be replaced, and also, that RegExp will
     * match one or more white-space characters.
     */
    return attribute.replace(/\s+/g, "-").toLowerCase();
};

/**
 * Outputs the appropriate timeframe for the p.tracker__previous entry.
 *
 * @param {string} selectedTimeframe Data from data.json.
 * @returns {string} [day|week|month] in p.tracker__previous
 */
const previousTimeLabel = function (selectedTimeframe) {
    let name;
    switch (selectedTimeframe) {
        case "daily":
            name = "Yesterday";
            break;
        case "weekly":
            name = "Last Week";
            break;
        case "monthly":
            name = "Last Month";
            break;
        default:
            name = "";
    }
    return name;
};

/**
 * Outputs the content of the main.page-content
 *
 * @param {object} trackerData Data from data.json fetched through init()
 * @param {string} timeframe Selected timeframe [daily|weekly|monthly]
 */

const displayData = function (trackerData, timeframe) {
    const pageContent = document.querySelector(".page-content");

    // Remove existing content before adding new data.
    pageContent.innerHTML = "";

    // Build each article.tracker content
    trackerData.forEach((activity) => {
        const attribute = sanitizeAttribute(activity.title);
        const selectedTimeframe = activity.timeframes[timeframe];
        const currentTime = selectedTimeframe.current;
        const previousTime = selectedTimeframe.previous;

        const output = `<div class="tracker__inner">
				<header class="tracker__header">
				<h2 class="tracker__title"><span class="screen-reader-text"></span>${
                    activity.title
                }</h2>
				<button class="tracker__options"><span class="screen-reader-text">Options for ${
                    activity.title
                }</span></button>
				</header>
				<div class="tracker__content">
				<p class="tracker__current" aria-label="Current time for ${
                    activity.title
                }">${currentTime}${currentTime < 2 ? "hr" : "hrs"}</p>
				<p class="tracker__previous txt-small">${previousTimeLabel(
                    timeframe
                )} - ${previousTime}${previousTime < 2 ? "hr" : "hrs"}</p>
				</div>
			</div>`;

        // Create the article elements,
        // add classes and aria attibutes,
        // fill it with the appropriate content
        // and add it to the main.page-content.
        const trackerArticle = document.createElement("article");
        trackerArticle.classList.add("tracker", `tracker--${attribute}`);
        trackerArticle.setAttribute("aria-atomic", "true");
        trackerArticle.innerHTML = output;
        pageContent.appendChild(trackerArticle);
    });
};

init();
