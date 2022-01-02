const searchHandler = async (event) => {
	event.preventDefault();
	const product = document.querySelector('#product-search').value.trim();
	const allergen_name = document.querySelector('#filter-search').value.trim();
	const allergen_array = allergen_name.split(',');
	if (product && allergen_name) {
		for (let i = 0; i < allergen_array; i++) {
			var allergenInput = allergen_array[i]; 
			console.log(allergenInput)
			const allergyResponse = await fetch('/api/allergens', {
				method: 'POST',
				body: JSON.stringify({allergenInput}),
				headers: {'Content-Type' : 'application/json'},
			});
			if (allergyResponse.ok){
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
						//document.location.replace('/');
					} else {
						alert('Error')
					}
				}
			})

}}

document.querySelector('.search-form').addEventListener('submit', searchHandler);
