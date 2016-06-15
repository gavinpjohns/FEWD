//Structure
//-----------------------------------------------
var body = document.querySelector("body")
var ul = document.querySelector("ul");
var textTheme = document.querySelector(".text-theme")

//Events
//-----------------------------------------------
ul.addEventListener('click', changeTheme);

//on page load, get the theme from localStorage
window.addEventListener('load', reloadPage);

//Event handler functions
//-----------------------------------------------
function reloadPage(e) {
	//on page load get theme from localStorage
	var theme = localStorage.getItem("theme");
	updatePage(theme);
}

function changeTheme(e) {
	console.log(e.target, e.type);

	//error checking. return early if a li wasn't clicked
	if (e.target.tagName != "LI") {
		return;
	}

	updatePage(e.target.className);

	//save theme to localStorage
	localStorage.setItem("theme", e.target.className);
}

//update the page

function updatePage(theme) {
	body.className = theme;
	textTheme.textContent = theme;
}


