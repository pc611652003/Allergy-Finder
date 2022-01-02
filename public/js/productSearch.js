const searchHandler = async (event) => {
	event.preventDefault();
	const search_product = document.querySelector('#product-search').value.trim();
	const search_allergen = document.querySelector('#filter-search').value.trim();
	const allergen_array = search_allergen.split(',');

	//grabs each input within the array and then saves it into the db
	if (search_product && search_allergen) {
		for (let i = 0; i < allergen_array.length; i++) {
			var allergen_name = allergen_array[i]; 
			console.log(allergen_name)
			const allergyResponse = await fetch('/api/allergens', {
				method: 'POST',
				body: JSON.stringify({allergen_name}),
				headers: {'Content-Type' : 'application/json'},
			});
			if (allergyResponse.ok){
				document.location.replace('/');
			} else {
				alert('Error')
			}
		}

		//this only fetches name and images but you are able to filter by intolerances such as dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
		await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=${product}&number=5&intolerances=${allergen_name}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"x-rapidapi-key": "cb11f2ee2fmsha08fecdbc24fd3cp11b47bjsn82e3b7599a4d"
			}
		})
		.then(response => response.json())
		.then(async data => 
			{
				console.log(data)
				for (let i = 0; i < data.length; i++){
					var name = data[i].name
					var product_image = data[i].image
					const response = await fetch('/api/products',{
						method:'POST',
						body: JSON.stringify({name, product_image}),
						headers: {'Content-Type': 'application/json'},
					});
					if (response.ok){
						document.location.replace('/');
					} else {
						alert('Error')
					}
				}
			})

}
}

document.querySelector('.search-form').addEventListener('submit', searchHandler);
