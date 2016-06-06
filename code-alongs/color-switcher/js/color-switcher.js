var body = document.querySelector("body")
var textTheme = document.querySelector(".text-theme")

var tomato = document.querySelector(".tomato")
var red = document.querySelector(".red")
var salmon = document.querySelector(".salmon")
var firebrick = document.querySelector(".firebrick")
var darkred = document.querySelector(".darkred")



function bodyColorChanger(color) {
	body.className = color;
}


//Events
//-----------------------------------------------
tomato.addEventListener('click', changeThemeTomato);
red.addEventListener('click', changeThemeRed);
salmon.addEventListener('click', changeThemeSalmon);
firebrick.addEventListener('click', changeThemeFirebrick);
darkred.addEventListener('click', changeThemeDarkred);

function changeThemeTomato() {
	console.log('fn changeThemeTomato');
	body.className = "tomato";
	textTheme.textContent = "tomato"
}

function changeThemeRed() {
	console.log('fn changeThemeRed');
	body.className = "red";
	textTheme.textContent = "red"
}

function changeThemeSalmon() {
	console.log('fn changeThemeSalmon');
	body.className = "salmon";
	textTheme.textContent = "salmon"
}

function changeThemeFirebrick() {
	console.log('fn changeThemeFirebrick');
	body.className = "firebrick";
	textTheme.textContent = "firebrick"
}

function changeThemeDarkred() {
	console.log('fn changeThemeDarkred');
	body.className = "darkred";
	textTheme.textContent = "darkred"
}
