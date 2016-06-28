
// Structure
// ------------------------------------------------
var input = document.querySelector(".task-item");
var taskButton = document.querySelector("button");
var itemsList = document.querySelector(".items");
var date = document.querySelector(".date");


// Setup
// ------------------------------------------------
var todoList = {
	tasks: []
};


// Events
// ------------------------------------------------
taskButton.addEventListener("click", submitForm);
window.addEventListener("load", reloadPage);
itemsList.addEventListener("click", completedTask);


// Event Handlers
// ------------------------------------------------
//rebuild the todo list with page is reloaded
function reloadPage(e) {
	//get the saved data from localStorage, convert to JSON, save it back into the JSON object (todoList)
	todoList = JSON.parse(localStorage.getItem('todoList'));
	createTodoList();
}

//event handler for when the user clicks the add button
function submitForm(e) {
	var task = {
		name: input.value,
		date: date.value,
		completed: checkbox.value
	};

	todoList.tasks.push(task);
	//save to local storage
	localStorage.setItem("todoList", JSON.stringify(todoList));
	createTodoList();
}

function completedTask(e) {
	console.log("completedTask", e.target);

}


// Update Page
// ------------------------------------------------

//creates entire todo list from json data
function createTodoList(){
	//clears out the list
	itemsList.innerHTML = "";
	//adds one new task for each item in the array
	todoList.tasks.forEach(createTask);
}

//create one li on the page from a task object
function createTask(task) {
	console.log(task);
	if (e.target.tagName != 'LABEL') {
		return;
	}



// 1. Create Markup
	var addLi = document.createElement("li");
	var checkbox = document.createElement("input");
	var labelTask = document.createElement("label");
	var labelDate = document.createElement("label");
	
// 2. Bedazzle Markup (add attributes and content)
	checkbox.setAttribute("type", "checkbox");
	labelTask.textContent = task.name;
	labelDate.textContent = "(" + task.date + ")";
	labelDate.classList.add("gray");


// 3. Append new elements to DOM tree
	itemsList.appendChild(addLi);
	addLi.appendChild(checkbox);
	addLi.appendChild(labelTask);
	addLi.appendChild(labelDate);
}
