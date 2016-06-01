console.log("js loaded up");

//Markup
//<input class="fahrenheit">
//<button class="convert">Convert!</button>

//Structure
//--------------------------------------------
var fahrenheit = document.querySelector(".fahrenheit");
var convert = document.querySelector(".convert");

//Events
//--------------------------------------------
convert.addEventListener("click", fahrenheitToCelcius);


//Event Handler
//--------------------------------------------
function fahrenheitToCelcius() {
	console.log("fn fahrenheitToCelcius")

//get data from page

var f = parseInt(fahrenheit.value);
console.log("f:",f);


//do some work / processing
var c = (f-32)*5/9;

//update the page
fahrenheit.value = c 


}


