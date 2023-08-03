const chartItems = document.querySelectorAll(".chart__item");
const date = new Date();
const day = date.getDay();
let today = (day === 0 ) ? 6 : day - 1;
chartItems.item( today ).classList.add("chart--today");


chartItems.forEach(function(item) {
	const amount = item.dataset.amount;
	const chartBar = item.querySelector(".chart__bar");

	chartBar.style.height = `${ amount * 3 }px`;
});