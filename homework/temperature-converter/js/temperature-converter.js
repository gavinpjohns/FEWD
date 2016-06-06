console.log("js loaded up");

//Markup
//<input class="fahrenheit">
//<button class="convert">Convert!</button>

//Structure
//--------------------------------------------
var fahrenheit = document.querySelector(".fahrenheit");
var celcius = document.querySelector(".celcius");
var convertFahrenheit = document.querySelector(".convert-fahrenheit");
var convertCelsius = document.querySelector(".convert-celsius");

//Events
//--------------------------------------------
convertFahrenheit.addEventListener("click", fahrenheitToCelcius);
convertCelsius.addEventListener("click", CelciusToFahrenheit);


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
	celcius.value = c 

}


function CelciusToFahrenheit() {
	console.log("fn CelciusToFahrenheit")

	var c = parseInt(celcius.value);
	console.log("c:",c);

	var f = (c*1.8)+32;

	fahrenheit.value = f 

}
