var searchFilter = ["","","","","","","",""];
var displayMessage = "None";
var queryMessage = "";

const searchHandler = async (event) => {
	event.preventDefault();
	const search_product = document.querySelector('#product-search').value.trim();
	const search_allergen = queryMessage;
	const searchProducts = [];

	//grabs each input within the array and then saves it into the db
	if (search_product) {
		var apiUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=${search_product}&number=5`;

		if (search_allergen) {
			apiUrl = apiUrl + `&intolerances=${search_allergen}`;
		}

		var apiKey = "";
		var apiKeySearch = fetch(`api/search`, {
			method: 'GET'
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
		})
		.then(data => {
			if(data) {
				console.log(data);
				apiKey = data.message;
				return apiKey;
			}
		})
		.then(apiKey => {
			//this only fetches name and images but you are able to filter by intolerances such as dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
			fetch(apiUrl, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
					"x-rapidapi-key": `${apiKey}`
				}
			})
			.then(response => response.json())
			.then(async data => 
				{
					for (let i = 0; i < data.length; i++){
						var name = data[i].name;
						var nameAttitute = name.replace(/\s/g, "%20");
						var product_image = `https://spoonacular.com/cdn/ingredients_100x100/${data[i].image}`;
						var searchItem = {
							index: i,
							name: name,
							nameAttitute: nameAttitute,
							product_image: product_image
						};
						searchProducts.push(searchItem);
					}
					const searchResponse = await fetch('/api/search', {
						method: 'POST',
						body: JSON.stringify({ searchProducts }),
						headers: {'Content-Type': 'application/json'},
					});
					document.location.replace('/search');

				})
			.catch(err => {
				console.error(err);
			});
		})
		.catch(err => {
			console.error(err);
		});
	}
}

const filterHandler = (event) =>{
	event.preventDefault();
	switch (event.target.id) {
		case "Egg": 
			if (searchFilter[0] == "") {
				searchFilter[0] = "Egg";
			} else {
				searchFilter[0] = "";
			}
			break;
		case "Dairy":
			if (searchFilter[1] == "") {
				searchFilter[1] = "Dairy";
			} else {
				searchFilter[1] = "";
			}
			break;
		case "Seafood":
			if (searchFilter[2] == "") {
				searchFilter[2] = "Seafood";
			} else {
				searchFilter[2] = "";
			}
			break;
		case "Shellfish":
			if (searchFilter[3] == "") {
				searchFilter[3] = "Shellfish";
			} else {
				searchFilter[3] = "";
			}
			break;
		case "Soy": 
			if (searchFilter[4] == "") {
				searchFilter[4] = "Soy";
			} else {
				searchFilter[4] = "";
			} 
			break;
		case "Tree%20Nut":
			if (searchFilter[5] == "") {
				searchFilter[5] = "Tree Nut";
			} else {
				searchFilter[5] = "";
			}
			break;
		case "Peanut":
			if (searchFilter[6] == "") {
				searchFilter[6] = "Peanut";
			} else {
				searchFilter[6] = "";
			}
			break;
		case "Wheat":
			if (searchFilter[7] == "") {
				searchFilter[7] = "Wheat";
			} else {
				searchFilter[7] = "";
			}
			break;
	}
	var completeFilter = searchFilter.filter(element => element != "").join(',');
	displayMessage = completeFilter.replaceAll(",", ", ");
	queryMessage = completeFilter.replace("Tree Nut","Tree%20Nut").toLowerCase();
	if (displayMessage == "") {
		displayMessage = "None";
	}
	document.querySelector('#filter-message').innerHTML = displayMessage;
}

document.querySelector('.search-form').addEventListener('submit', searchHandler);
const eightIcons = document.querySelectorAll('.icon-button');
for (var i = 0; i < 8; i++) {
	eightIcons[i].addEventListener('click', filterHandler);
}