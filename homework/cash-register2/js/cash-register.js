// Structure
// ------------------------------------------------
var entries = document.querySelector(".entries");
var total = document.querySelector(".total");
var input = document.querySelector("input");

console.log("Structure's up n' runnin'")

// Setup
// ------------------------------------------------
var items = [];

// Events
// ------------------------------------------------
// 1. Get Data
//Text input --> x
//total

input.addEventListener('keypress', typePrice);
	console.log("event listener typePrice");


// Event handler functions
// ------------------------------------------------
// 2. Processing
//total=total+x;
function typePrice (e) {

		console.log("fn typePrice");
		console.log(e);
		
		// error validation - return early if blank
		if (e.keyCode ==13) {
			// prevet default event to prevent behavior to keep form from submitting
			e.preventDefault();

			// run function to add LI to the line

			createItem(input.value);

			items.push(input.value);

			// Update the price

			updateTotal();


			input.value="";
		}
	}

function createItem (price){
	var li = document.createElement('li')
	li.textContent = "$" + price;
	entries.appendChild(li);
}



// Update page functions
// ------------------------------------------------
// 3. Update page
//total -textContent
//item
	//add item to list
	//create a li element
	//attach new element to DOM


		function createItem () {
			var newTotal = 0;
			
			for (var index = 0; index <= items.length - 1; index = index = index +1)


		}



















