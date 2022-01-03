const searchHandler = async (req, res, event) => {
	event.preventDefault();
	const search_product = document.querySelector('#product-search').value.trim();
	const search_allergen = document.querySelector('#filter-search').value.trim();
	const searchProducts = [];

	//grabs each input within the array and then saves it into the db
	if (search_product && search_allergen) {
		
		//this only fetches name and images but you are able to filter by intolerances such as dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
		await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=${search_product}&number=5&intolerances=${search_allergen}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"x-rapidapi-key": "cb11f2ee2fmsha08fecdbc24fd3cp11b47bjsn82e3b7599a4d"
			}
		})
		.then(response => response.json())
		.then(async data => 
			{
				console.log(data);
				for (let i = 0; i < data.length; i++){
					var name = data[i].name;
					var product_image = `https://spoonacular.com/cdn/ingredients_100x100/${data[i].image}`;
					var searchItem = {
						index: i,
						name: name,
						product_image: product_image
					};
					searchProducts.push(searchItem);
					const response = await fetch('/api/products',{
						method:'POST',
						body: JSON.stringify({name, product_image}),
						headers: {'Content-Type': 'application/json'},
					});
				}
				res.session.search_results = searchProducts;
				console.log(res.session.search_result);
			})
		.catch(err => {
			console.error(err);
		});

}
}

document.querySelector('.search-form').addEventListener('submit', searchHandler);
