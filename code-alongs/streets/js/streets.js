var input = document.querySelector("input");
var button = document.querySelector("button");
var directions = document.querySelector(".directions");



//Setup
//-----------------------------------------------
var streets = [];



//Event
//-----------------------------------------------
button.addEventListener('click', addStreet);


//Event handler functions
//-----------------------------------------------
function addStreet(e) {
	//prevent default event behavior to submit form
	e.preventDefault();
	//error validation - return early if blank
	if (input.value ==""){
		return;
	}
	createStreet(input.value);
	streets.push(input.value);
	input.value = ""
}

//Update page
//-----------------------------------------------
function createStreet(name){
	var li = document.createElement('li');
	li.textContent = name;
	directions.appendChild(li);
}