//Structure
//-----------------------------------------------
var body = document.querySelector("body")
var ul = document.querySelector("ul");
var textTheme = document.querySelector(".text-theme")

//Events
//-----------------------------------------------
ul.addEventListener('click', changeTheme);

//on page load, get the theme from localStorage
window.addEventListener('load', updatePage);

//Event handler functions
//-----------------------------------------------
function changeTheme(e) {
	console.log(e.target, e.type);

	//error checking. return early if a li wasn't clicked
	if (e.target.tagName != "LI") {
		return;
	}

	body.className = e.target.className;
	textTheme.textContent = e.target.className;

	//save theme to localStorage
	localStorage.setItem("theme", e.target.className);
}

//get theme from localStorage
//eg red
var theme = localStorage.getItem("theme")

function updatePage() {
	body.className = theme;
	textTheme.textContent = theme;
}


