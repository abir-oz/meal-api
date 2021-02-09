document.getElementById("btn-search").addEventListener("click", () => searchMeal())

const searchInput = document.getElementById('search-field');

searchInput.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
        //console.log("Enter Button pressed!")
        searchMeal();
    }
});

const searchMeal = () => {

    const searchText = searchInput.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

    console.log(url);
    // load data
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals)).catch(error => displayError('Something Went Wrong!! Please try again later!'));

}
const displayMeals = meals => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';


    meals.forEach(meal => {

        const mealDiv = document.createElement('div');
        mealDiv.className = 'col-xl-3 col-lg-4 col-md-6 col-sm-10 mx-auto mb-3';
        mealDiv.innerHTML = `
        <div class="single-result" onclick="getIngredients('${meal.idMeal}')">
            <img class="img-fluid rounded-top" src="${meal.strMealThumb}">  
            <h4 class="p-4">${meal.strMeal}</h4>
        </div>

        `;
        mealContainer.appendChild(mealDiv);
    })


    document.getElementById('search-field').value = '';



}


const getIngredients = idMeal => {
    //   console.log("details");
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`

    console.log(url);

    fetch(url).then(res => res.json()).then(data => displayIngredients(data.meals));
}



const displayIngredients = meals => {

    console.log(meals[0])
    const mealIngredients = document.getElementById('meal-details');
    mealIngredients.innerHTML = '';
    const mealDiv = document.createElement('div');
    mealDiv.className = 'col-md-10 mx-auto mb-3 d-flex justify-content-center align-items-center';
    mealDiv.innerHTML = `
        <div>
            <img class="img-fluid rounded-3 text- " src="${meals[0].strMealThumb}">  
            <h2 class="py-4">${meals[0].strMeal}</h2>
            <h5>Ingredients</h5>
            <ul class="ingredients">
                <li>${meals[0].strIngredient1}
                <li>${meals[0].strIngredient2}
                <li>${meals[0].strIngredient3}
                <li>${meals[0].strIngredient4}
                <li>${meals[0].strIngredient5}
                <li>${meals[0].strIngredient6}
            </ul>
        </div>
        `;
    mealIngredients.appendChild(mealDiv);
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}