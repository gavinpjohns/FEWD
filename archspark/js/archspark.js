// Structure
// ------------------------------------------------
var body = document.querySelector('body');
var gallery = document.querySelector(".gallery");
var dropdown = document.querySelector('.dropdown');
var dropdownTrigger = document.querySelector('.dropdown-trigger');
var menu = document.querySelector('.menu');
var menuTrigger = document.querySelector('.menu-trigger');



// Setup
// ------------------------------------------------
var todoList = {
	tasks: []
};


// Events
// ------------------------------------------------
window.addEventListener("load", reloadPage);
dropdownTrigger.addEventListener('click', showDropdown);
menuTrigger.addEventListener('click', showMenu);




// Event Handlers
// ------------------------------------------------
//rebuild the todo list with page is reloaded
function reloadPage(e) {
	refreshGallery("archdaily");
	refreshDropdown();
}


// Update Page
// ------------------------------------------------

//creates entire todo list from json data
function refreshGallery(id){
	//clears out the list
	gallery.innerHTML = "";
	//adds one new task for each item in the array
	// archspark.posts.forEach(createPost);

	for (var i = 0; i < archspark.posts.length; i++) {
		createPost(archspark.posts[i], id);
	}
}

//creates entire todo list from json data
function refreshDropdown(){
	//clears out the list
	dropdown.innerHTML = "";
	//adds one new task for each item in the array
	archspark.resources.forEach(createResource);
}




//creates entire todo list from json data
function clickDropdown(e){
	var target = e.target


	//error checking. return early if a li wasn't clicked
	if (target.tagName != "LI") {
		target = target.parentElement;
	}

	var resourceId = target.getAttribute("id");
	console.log(resourceId);
	refreshGallery(resourceId);

	dropdown.classList.toggle('dropdown-close');
	body.classList.toggle('dropdown-overlay-open');
}

//creates entire todo list from json data
function clickMenu(e){
	var target = e.target

	//error checking. return early if a li wasn't clicked
	if (target.tagName != "LI") {
		target = target.parentElement;
	}
	var menuClass = target.getAttribute('class');
	console.log(menuClass);

	menu.classList.toggle('menu-close');
	body.classList.toggle('menu-overlay-open');
}

//show dropdown
function showDropdown() {
	dropdown.classList.toggle('dropdown-close');
	body.classList.toggle('dropdown-overlay-open');
}
//show menu
function showMenu() {
	menu.classList.toggle('menu-close');
	body.classList.toggle('menu-overlay-open');
}


//create one li on the page from a post
function createPost(post, id) {
	
	if (post.resource != id) {
		return;
	} 
	console.log(id);
	// 1. Create Markup
	var li = document.createElement("li");
	var template = 
		'<img class="image" src="' + post.image + '">' +
		'<div class="card">' +
			'<div class="card-header">' +
      			'<img src="' + post.logo + '" class="logo">' +
      				'<div class="card-title">' +
      					'<h3 class="title">' + post.title + '</h3>' +
						'<p class="date">' + post.date + '</p>' +
					'</div>' +
      		'</div>' +
      		'<p class="summary">' + post.summary + '</p>' +
      		'<div class="card-footer">' +
      			'<img src="img/icons/heart.svg" class="heart">' +
      			'<img src="img/icons/share.svg" class="share">' +
      		'</div>' +
      	'</div>'
    ;	
	// 2. Bedazzle Markup (add attributes and content)
	// img.setAttribute("src", post.image);

	// 3. Append new elements to DOM tree
	li.innerHTML = template;
	gallery.appendChild(li);
}

//create one li on the page from a dropdown resource
function createResource(resource) {
	console.log(resource);

	// 1. Create Markup
	var li = document.createElement("li");
	var template = 
		'<h1>' + resource.name + '</h1>' +
		'<img src="' + resource.logo + '" class="logo">';


    	
	// 2. Bedazzle Markup (add attributes and content)
	li.setAttribute("id", resource.id);
	li.addEventListener('click', clickDropdown);




	// 3. Append new elements to DOM tree
	li.innerHTML = template;
	dropdown.appendChild(li);
}

