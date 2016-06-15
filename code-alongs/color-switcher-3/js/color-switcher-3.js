//Structure
//-----------------------------------------------
var body = document.querySelector("body")
var ul = document.querySelector("ul");
var textTheme = document.querySelector(".text-theme")

//Events
//-----------------------------------------------
ul.addEventListener('click', changeTheme);

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
}
