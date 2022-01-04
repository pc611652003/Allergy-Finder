var searchFilter = ["","","","","","","",""];
var displayMessage = "None";
var queryMessage = "";

const searchHandler = async (event) => {
	event.preventDefault();
	const search_product = document.querySelector('#product-search').value.trim();
	if (search_product) {
		if (displayMessage == "None") {
			queryMessage = "";
		} else {
			queryMessage = displayMessage.replaceAll(", ",",").replace("Tree Nut", "Tree%20Nut").toLowerCase();
		}

		const search_allergen = queryMessage;
		
		const response = await fetch('/search', {
			method: 'POST',
			body: JSON.stringify({ search_product, search_allergen }),
			headers: { 'Content-Type': 'application/json' },
		})
		.catch(err => {
			console.error(err);
		});

		if (response.ok) {
			document.location.replace('/search');
		}
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