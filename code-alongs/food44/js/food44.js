//Structure
//--------------------------------------------------

var results = document.querySelector('.results');
var form = document.querySelector('form');
var input = document.querySelector('input');



//Event Listener
//--------------------------------------------------
form.addEventListener('submit', getRestaurants);



//Event Handler
//--------------------------------------------------
 

function getRestaurants(e) {
	e.preventDefault();

	//building the url string
	var search = input.value;
	var url = "http://api.locu.com/v1_0/venue/search/?api_key=c0e1b184bfd3d35e7f8facfaeadc9f96e72622e6&postal_code=" + search;

	// making ajax request for data from api
	//$.getJSON(url, updateRestaurants);

	//use JSONP to get json data
	// create a new <script> tag instead of ajax
	url = url + "&callback=updateRestaurants";
	var scriptTag = document.createElement("script")
	scriptTag.src = url;
	document.body.appendChild(scriptTag);


}


//Update page
//--------------------------------------------------
function updateRestaurants(json) {
	console.log('updateRestaurants');
	console.log('json');
	//clear it out
	results.innerHTML = "";

	json.objects.forEach(createRestaurant);
}


function createRestaurant(restaurant) {
	//Step 1: create markup
	var li = document.createElement("li");
	var h2 = document.createElement("h2");	
	var p = document.createElement("p");
	var a = document.createElement("a");

	//Step 2: add content / attributes
	h2.textContent = restaurant.name;
	p.textContent = restaurant.street_address;
	a.textContent = restaurant.phone;
	a.setAttribute('href', + restaurant.phone);
	//Step 3: append / bedazzle
	li.appendChild(h2);
	li.appendChild(p);
	li.appendChild(a);
	results.appendChild(li);
}

//updateRestaurants(json.objects);









