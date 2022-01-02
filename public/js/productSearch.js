const searchFormHandler = async (event) => {
    event.preventDefault();
  
    const productInput = document.querySelector('#product-search').value.trim();
    const filterInput = document.querySelector('#filter-search').value.trim();

    const alertMessage = document.querySelector('#errorMessage-search');
  
    console.log('product : ', productInput);
    console.log('filter : ', filterInput);

    document.location.replace('/search');
};
  
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