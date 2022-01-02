const searchFormHandler = async (event) => {
    event.preventDefault();
  
    const productInput = document.querySelector('#product-search').value.trim();
    const filterInput = document.querySelector('#filter-search').value.trim();
  
    var searches = [];
      
    await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=${productInput}&number=5&intolerances=${filterInput}`, {
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
                    var searchItem = {
                        index: i,
                        name: data[i].name,
                        product_image: data[i].image,
                    };
					searches.push(searchItem);
				}
			}
		)
    const searchResponse = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ searches }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (searchResponse.ok) {
        document.location.replace('/search');
    } 
};

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
		fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=${product}&number=5&intolerances=${allergen_name}`, {
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
    }
}
  
document
    .querySelector('.search-form')
    .addEventListener('submit', searchFormHandler);

// const request = require('request');

// const options = {
// method: 'POST',
// url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/classify',
// qs: {locale: 'en_us'},
// headers: {
// 'content-type': 'application/json',
// 'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
// 'x-rapidapi-key': 'cb11f2ee2fmsha08fecdbc24fd3cp11b47bjsn82e3b7599a4d',
// useQueryString: true
// },
// body: {plu_code: '', title: 'Kroger Vitamin A & D Reduced Fat 2% Milk', upc: ''},
// json: true
// };

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);

// 	console.log(body);
// });