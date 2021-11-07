const clientSecret = "PKQKFU4SM0FSWU2XFGO2A2453BTGMSSUQAR3P0PJ5VAZQGXP"
const clientId = "WBWCTH4BRWR3POXCCOOK4IFF5H0030MDRUMNPJIN3EXCWM4N"

window.onload = init;

function init(){
    findRestaurants();
}

async function findRestaurants(){
    let options = {
        lat: 50.84883093470575,
        long: 4.7300273687570416,
        categoryId: "4bf58dd8d48988d110941735",
        radius: 250
    }
    let result = await sendRequest(options);
    // console.log(result)
    if (result.response.venues == undefined || result.response.venues.length == 0){
        console.log("Error request, or no venues")
    }
    for (var venue of result.response.venues){
        addTohtml(venue);
    }
}

// https://api.foursquare.com/v2/venues/search?ll=50.84883093470575,4.350540392775344&radius=250&categoryId=52e81612bcbc57f1066b79ff&client_id=&client_secret=&v=20211012

async function sendRequest(options){
    let response = await fetch(`https://api.foursquare.com/v2/venues/search?ll=${options.lat},${options.long}&radius=${options.radius}&categoryId=${options.categoryId}&client_id=${clientId}&client_secret=${clientSecret}&v=20211012`)
    let result = await response.json();
    return result;
}

function addTohtml(venue){
    // console.log(venue)
    let container = document.createElement("div")
    let generalInfo = document.createElement("div")
    let name = document.createElement("h3")

    name.innerText = venue.name
    generalInfo.appendChild(name)
    container.appendChild(generalInfo)
    container.classList.add("venue")

    let venues = document.getElementById("venues")
    venues.appendChild(container)
}