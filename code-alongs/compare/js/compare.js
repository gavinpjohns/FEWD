//Structure
var firstNumber = document.querySelector(".first-number");
var secondNumber = document.querySelector(".second-number");
var sign = document.querySelector(".sign");
var compare = document.querySelector(".compare");

//Events
compare.addEventListener('click', compareNumbers);


//Event Handlers
function compareNumbers() {
	sign.textContent = "TGIF";
}
