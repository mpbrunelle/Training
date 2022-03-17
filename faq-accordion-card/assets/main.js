"use strict";

const faq = document.querySelector(".card");

// open only one detail at a time
faq.addEventListener("click", (e) => {
    const question = e.target.closest("summary");
    const openQuestion = faq.querySelector(".card__item[open]");
    if (null !== openQuestion) {
        openQuestion.removeAttribute("open");
    }
    question.setAttribute("open", "");
});
