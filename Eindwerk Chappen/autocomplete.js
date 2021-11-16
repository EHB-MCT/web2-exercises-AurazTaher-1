let categoryList = []
const restaurantInput = document.getElementById("restaurant-input")
let categoryID = -1;
restaurantInput.oninput = input
loadCategories()

async function loadCategories(){
    let url = "https://api.foursquare.com/v2/venues/categories?client_id=WBWCTH4BRWR3POXCCOOK4IFF5H0030MDRUMNPJIN3EXCWM4N&client_secret=PKQKFU4SM0FSWU2XFGO2A2453BTGMSSUQAR3P0PJ5VAZQGXP&v=20211012"
    let response = await fetch(url)
    let result = await response.json()
    createCategoryList(result.response.categories)
}

function createCategoryList(categories){
    for (var category of categories){
        categoryList = categoryList.concat(category.categories)
    }
    console.log(categoryList)
}

function input(){
    categoryID = -1
    let input = restaurantInput.value
    if (input != ""){
        let mappedCategories = categoryList.map(c => c.name)
        let filteredCategories = mappedCategories.filter(c => c.toLowerCase().indexOf(input) !== -1)
        updateCategories(filteredCategories)
    }
    else{
        updateCategories([])
    }
}

function updateCategories(categories){
    let container = document.getElementById("autocomplete-items")
    container.innerHTML = ""
    let counter = 0
    for (var cat of categories){
        if (counter > 10) break;
        container.appendChild(addItem(cat))
        counter++
    }
}

function addItem(category){
    let container = document.createElement("div")
    container.innerText = category
    container.classList.add("autocomplete-item")
    container.onclick = function(){
        restaurantInput.value = category
        let selectedCategory = categoryList.filter(c => c.name === category)
        console.log(selectedCategory)
        if (selectedCategory.length == 1){
            categoryID = selectedCategory[0].id
            console.log(categoryID)
        }
        updateCategories([])
    }
    return container
}