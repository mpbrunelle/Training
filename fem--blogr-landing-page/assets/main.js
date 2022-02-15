const pageNav = document.getElementById("page-nav");

document.addEventListener("click", (e) => {
    const target = e.target;
    const btState = target.getAttribute("aria-expanded");
    const subMenu = pageNav.querySelector(
        `#${target.getAttribute("aria-controls")}`
    );
    // Close open menu.
    const openMenu = pageNav.querySelector("[aria-expanded='true']");
    if (openMenu !== null) {
        openMenu.setAttribute("aria-expanded", false);
    }

    // Change state of
    if (target.hasAttribute("aria-expanded")) {
        if ("true" === btState) {
            target.setAttribute("aria-expanded", "false");
            subMenu.setAttribute("aria-hidden", "true");
        } else {
            target.setAttribute("aria-expanded", "true");
            subMenu.setAttribute("aria-hidden", "false");
        }
    }
});

window.addEventListener("resize", (e) => {
    const viewportWidthInEm =
        window.innerWidth /
        parseFloat(
            getComputedStyle(document.querySelector("body"))["font-size"]
        );
    const mainMenu = document.getElementById("main-menu");
    if (viewportWidthInEm >= 48) {
        mainMenu.setAttribute("aria-hidden", "false");
    } else {
        mainMenu.setAttribute("aria-hidden", "true");
    }
});
