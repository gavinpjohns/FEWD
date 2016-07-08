//Structure
//--------------------------------------------------

var results = document.querySelector('.results');
var form = document.querySelector('form');
var input = document.querySelector('input');



//Event Listener
//--------------------------------------------------
form.addEventListener('submit', getMovies);



//Event Handler
//--------------------------------------------------
 

function getMovies(e) {
	e.preventDefault();

	//building the url string
	var search = input.value;
	var url = "http://www.omdbapi.com/?s=" + search;

	// making ajax request for data from api
	$.getJSON(url, updateMovies);

	//use JSONP to get json data
	// create a new <script> tag instead of ajax
	// url = url + "&callback=updateRestaurants";
	// var scriptTag = document.createElement("script")
	// scriptTag.src = url;
	// document.body.appendChild(scriptTag);


}


//Update page
//--------------------------------------------------
function updateMovies(json) {
	console.log('updateMovies');
	console.log('json');
	//clear it out
	results.innerHTML = "";

	json.Search.forEach(createMovie);
}


function createMovie(movie) {
	//Step 1: create markup
	var li = document.createElement("li");
	var img = document.createElement("img")
	var h2 = document.createElement("h2");	
	var p = document.createElement("p");


	//Step 2: add content / attributes
	img.src = movie.Poster;
	h2.textContent = movie.Title;
	p.textContent = movie.Year;

	//Step 3: append / bedazzle
	li.appendChild(img);
	li.appendChild(h2);
	li.appendChild(p);
	results.appendChild(li);
}

// updateMovies(json.Search);









