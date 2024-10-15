function setVariables() {
	let scrollbar = window.innerWidth - document.body.clientWidth;
	document.documentElement.style.setProperty("--scrollbar", `${scrollbar}px`);

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVariables);
window.addEventListener('DOMContentLoaded', setVariables);
