//first require('dotenv').config file
//kept getting an error that require was not defined so tried something else
//require('dotenv').config();
//console.log(process.env);
//secret api key as a variable
const searchForm = document.querySelector('form');
const searchResultDiv =  document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const app_key = 'efed37a9da8aeb824a97bf8faf9ede00';
console.log(app_key);
const app_id = 'aeaa765c';
const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${app_id}&app_key=${app_key}`;
console.log(app_id);

//grabs the results from the form and console.logs them after submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    console.log(searchQuery);
    fetchAPI();
});
//test query
async function fetchAPI () {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${app_id}&app_key=${app_key}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results){
    let generatedHTML= '';
    results.map(result =>{
    generatedHTML +=
      ` <img src="${result.recipe.image}" alt="">
      <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-button" href=${result.recipe.url} target = "_blank">View Recipe</a>
      </div>
      <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
      <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Label Found'}</p>
      <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>

      `  
    })
    searchResultDiv.innerHTML = generatedHTML;
}
