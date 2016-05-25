//Structure
var firstNumber = document.querySelector(".first-number");
var secondNumber = document.querySelector(".second-number");
var sign = document.querySelector(".sign");
var compare = document.querySelector(".compare");

//Events
compare.addEventListener('click', compareNumbers);




//Listen for the compare button to be clicked

//Compare the first and second number

//Update the page - change the sign


//---------------------------------------------
//Event Handlers
function compareNumbers() {
	
	var firstValue = firstNumber.value;
	firstValue = parseInt(firstValue)

	sign.textContent = "=";
}
