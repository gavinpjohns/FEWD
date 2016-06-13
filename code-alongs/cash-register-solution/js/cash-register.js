// Structure
// ------------------------------------------------
var form    = document.querySelector("form");
var input   = document.querySelector("input");
var entries = document.querySelector(".entries");
var total   = document.querySelector(".total");


// Setup
// ------------------------------------------------
var totalValue = 0;
var receipt = {
	lineItems: [],
};
kb

// Events
// ------------------------------------------------
form.addEventListener("submit", enter);



// Event handler functions
// ------------------------------------------------
function enter(event) {
	event.preventDefault();

	// get the current entry value, convert to number with parseFloat
	var entry = parseFloat(input.value);
	receipt.lineItems.push(entry);

	createReceipt();

	// clean up!
	input.value = "";

	//clean up receipt
	
}

function createReceipt() {
	receipt.lineItems.forEach(createLineItem)

}

function createLineItem(cost) {
	// 1. create and append the new list item
	var li = document.createElement("li");

	// 2. add text content & attributes
	li.textContent = formatCurrency(cost);
	
	// 3. append new element to parent
	entries.appendChild(li);

	// update the value for the total
	totalValue = totalValue + cost;
	total.textContent = formatCurrency(totalValue);
}


// Utility functions
// ------------------------------------------------
function formatCurrency(number) {
	var currency = parseFloat(number);
	currency = currency.toFixed(2);
	currency = "$" + currency;
	return currency;
}












