// Structure
// ------------------------------------------------
var form    = jQuery("form");
var input   = jQuery("input");
var entries = jQuery(".entries");
var total   = jQuery(".total");


// Setup
// ------------------------------------------------
var totalValue = 0;
var receipt = {
	lineItems: [],
};


// Events
// ------------------------------------------------
form.on("submit", enter);



// Event handler functions
// ------------------------------------------------
function enter(event) {
	event.preventDefault();

	// get the current entry value, convert to number with parseFloat
	var entry = parseFloat(input.val());
	receipt.lineItems.push(entry);

	createReceipt();

	// clean up!
	input.value("");

	//clean up receipt
	
}

function createReceipt() {
	receipt.lineItems.forEach(createLineItem)

}

function createLineItem(cost) {
	// 1. create and append the new list item
	var li = jQuery('<li></li>');
	// 3. append new element to parent
	entries.append(li);

	// 2. add text content & attributes
	li.text(formatCurrency(cost));
	


	// update the value for the total
	totalValue = totalValue + cost;
	total.text(formatCurrency(totalValue));
}


// Utility functions
// ------------------------------------------------
function formatCurrency(number) {
	var currency = parseFloat(number);
	currency = currency.toFixed(2);
	currency = "$" + currency;
	return currency;
}












