//Structure
//--------------------------------------------------

var results = document.querySelector('.results')



//Update page
//--------------------------------------------------
function updateRestaurants(restaurants) {
	restaurants.forEach(createRestaurant);
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

updateRestaurants(json.objects);