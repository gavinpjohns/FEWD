// setup


var taskField = document.querySelector(".task-field");
var dateField = document.querySelector(".date-field");
var addButton = document.querySelector("button");

function init() {
	events = document.querySelector("ol");
	for(var i = 0; i < events.children.length; i++) {
		var event = events.children[i];
		var check = event.children[0];
		check.addEventListener("click", onCheckboxClicked);
	}

	addButton.addEventListener("click", onAddClicked);
}

// event liseners

function onAddClicked(e) {
	e.preventDefault();
	addEvent();
}

function onCheckboxClicked(e) {
	var myParent = e.currentTarget.parentElement;
	if(e.currentTarget.checked) {
		myParent.classList.add("checked");
	} else {
		myParent.classList.remove("checked");
	}
}

// update page

function addEvent() {
	var newLi = document.createElement("li");
	var newTask;
	var newDate;
	var event = "";
	if(taskField.value) {
		newTask = "<span class='event-name'>" + taskField.value + "</span>";
		event += newTask;

		if(dateField.value) {
			newDate = "<span class='event-date'>(" + dateField.value + ")</span>";
			event += newDate;
		}

		var input = document.createElement("input");
		input.type = "checkbox";
		newLi.appendChild(input);
		newLi.innerHTML += event;
		newLi.children[0].addEventListener("click", onCheckboxClicked);
		events.appendChild(newLi);

		taskField.value = "";
		dateField.value = "";
	} 
}

// utility functions