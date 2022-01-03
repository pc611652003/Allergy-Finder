var searchFilter = ["","","","","","","",""];
var displayMessage = "None";
var queryMessage = "";

const searchHandler = async (event) => {
	event.preventDefault();
	const search_product = document.querySelector('#product-search').value.trim();
	if (displayMessage == "None") {
		queryMessage = "";
	} else {
		queryMessage = displayMessage.replaceAll(", ",",").replace("Tree Nut", "Tree%20Nut").toLowerCase();
	}
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
				})
			.then(() => {
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

const applyFilter = (event) => {
	event.preventDefault();
	displayMessage = event.target.textContent;
	document.querySelector('#filter-message').innerHTML = displayMessage;
	searchFilter = ["","","","","","","",""];
	if (displayMessage.includes("Egg")) {
		searchFilter[0] = "Egg";
	}
	if (displayMessage.includes("Dairy")) {
		searchFilter[1] = "Dairy";
	}
	if (displayMessage.includes("Seafood")) {
		searchFilter[2] = "Seafood";
	}
	if (displayMessage.includes("Shellfish")) {
		searchFilter[3] = "Shellfish";
	}
	if (displayMessage.includes("Soy")) {
		searchFilter[4] = "Soy";
	}
	if (displayMessage.includes("Tree Nut")) {
		searchFilter[5] = "Tree Nut";
	}
	if (displayMessage.includes("Peanut")) {
		searchFilter[6] = "Peanut";
	}
	if (displayMessage.includes("Wheat")) {
		searchFilter[7] = "Wheat";
	}
}

const saveFilter = async (event) => {
	event.preventDefault();
	var allergen_name = displayMessage;
	var response = await fetch(`api/allergens/`, {
		method: 'POST',
		body: JSON.stringify({ allergen_name }),
		headers: { 'Content-Type': 'application/json' },
	})
	if (response.ok) {
		document.location.replace('/');
    }
}

const deleteFilter = async (event) => {
	event.preventDefault();
	const target = event.target.id;
	var response = await fetch(`api/allergens/${target}`, {
		method: 'DELETE'
	})
	if (response.ok) {
        document.location.replace('/');
    }
}

document.querySelector('#search-btn').addEventListener('click', searchHandler);

document.querySelector('#filter-sav-btn').addEventListener('click', saveFilter);

const eightIcons = document.querySelectorAll('.icon-button');
for (var i = 0; i < 8; i++) {
	eightIcons[i].addEventListener('click', filterHandler);
}
const filterApplyBtns = document.querySelectorAll('.filter-btn');
filterApplyBtns.forEach(target => {
	target.addEventListener('click', applyFilter);
})
const filterDeleteBtns = document.querySelectorAll('.filter-del-btn');
filterDeleteBtns.forEach(target => {
	target.addEventListener('click', deleteFilter);
})