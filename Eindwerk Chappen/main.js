const clientSecret = "PKQKFU4SM0FSWU2XFGO2A2453BTGMSSUQAR3P0PJ5VAZQGXP"
const clientId = "WBWCTH4BRWR3POXCCOOK4IFF5H0030MDRUMNPJIN3EXCWM4N"
const zoekButton = document.getElementById("zoek-btn")
const radiusInput = document.getElementById("radius-input")
zoekButton.onclick = findRestaurants

async function findRestaurants(){
    console.log(google_map)
    if (categoryID != -1){
        let radius = parseInt(radiusInput.value)
        console.log(radius)
        let options = {
            lat: google_map.center.lat(),
            long: google_map.center.lng(),
            categoryId: `${categoryID}`,
            radius: radius
        }
        let result = await sendRequest(options);
        console.log(result)
        if (result.response.venues == undefined || result.response.venues.length == 0){
            console.log("Error request, or no venues")
        }
        for (var venue of result.response.venues){
            addTohtml(venue);
        }
    }
    else{
        console.log("Select a category first")
    }
}

// https://api.foursquare.com/v2/venues/search?ll=50.84883093470575,4.350540392775344&radius=250&categoryId=52e81612bcbc57f1066b79ff&client_id=&client_secret=&v=20211012

async function sendRequest(options){
    let response = await fetch(`https://api.foursquare.com/v2/venues/search?ll=${options.lat},${options.long}&radius=${options.radius}&categoryId=${options.categoryId}&client_id=${clientId}&client_secret=${clientSecret}&v=20211012`)
    let result = await response.json();
    return result;
}

function addTohtml(venue){
    createVenue(venue)
}

function createVenue(venue){
    let venueContainer = document.createElement("div")
    let generalInfo = createVenueInfo(venue)
    let marker = document.createElement("i")
    marker.classList = "marker-icon fas fa-map-marker-alt fa-2x"
    venueContainer.appendChild(generalInfo)
    venueContainer.appendChild(marker)
    venueContainer.classList.add("venue")
    let venues = document.getElementById("venues")
    venues.appendChild(venueContainer)
}

function createVenueInfo(venue){
    let generalInfo = document.createElement("div")
    let name = document.createElement("h3")
    name.innerText = venue.name
    let adress = createVenueAdress(venue)
    generalInfo.appendChild(name)
    generalInfo.appendChild(adress)
    generalInfo.classList.add("venue-info")
    return generalInfo
}

function createVenueAdress(venue){
    let address = document.createElement("div")
    let street = document.createElement("p")
    let city = document.createElement("p")
    let country = document.createElement("p")
    street.innerText = venue.location.address
    city.innerText = venue.location.city
    country.innerText = venue.location.country
    address.appendChild(street)
    address.appendChild(city)
    address.appendChild(country)
    address.classList.add("venue-adress")
    return address;

}