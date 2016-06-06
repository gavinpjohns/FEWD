//structure
//----------------------------------
var parent = document.querySelector(".sponsored-articles");


//event handler
//----------------------------------



//update page
//----------------------------------
function createItem(){

	//step 1: create
	var child = document.createElement("li");

	//step 2: add content and attributes
	child.textContent = "Boomshakalaka";
	child.classList.add("new");
	child.setAttribute('src', 'img/logo.jpg');

	// step 3: add to DOM tree
	parent.appendChild(child);

}



