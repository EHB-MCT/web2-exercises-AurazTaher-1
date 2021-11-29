const clientSecret = "PKQKFU4SM0FSWU2XFGO2A2453BTGMSSUQAR3P0PJ5VAZQGXP"
const clientId = "WBWCTH4BRWR3POXCCOOK4IFF5H0030MDRUMNPJIN3EXCWM4N"
const zoekButton = document.getElementById("zoek-btn")
const radiusInput = document.getElementById("radius-input")
zoekButton.onclick = findRestaurants

async function findRestaurants(){
    if (categoryID != -1){
        let radius = parseInt(radiusInput.value)
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
            addMarker(venue, markerClickCallback)
            // addTohtml(venue);
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

async function markerClickCallback(venue){
    let response = await fetch(`https://api.foursquare.com/v2/venues/${venue.id}/hours?client_id=${clientId}&client_secret=${clientSecret}&v=20211012`)
    let hours = await response.json()
    createVenue(venue,hours.response.hours)
}

function addTohtml(venue){
    createVenue(venue)
}

function createVenue(venue,hours){
    console.log(venue)
    console.log(hours)
    let venueContainer = document.createElement("div")
    let generalInfo = createVenueInfo(venue,hours)
    venueContainer.appendChild(generalInfo)
    venueContainer.classList.add("venue")
    let venues = document.getElementById("venue")
    venues.innerHTML = ""
    venues.appendChild(venueContainer)
}

function createVenueInfo(venue, hours){
    let generalInfo = document.createElement("div")
    let name = document.createElement("h2")
    name.innerText = venue.name
    let adress = createVenueAdress(venue)
    let timeTable = createVenueTimeTable(hours)
    generalInfo.appendChild(name)
    generalInfo.appendChild(adress)
    generalInfo.appendChild(timeTable)
    generalInfo.classList.add("venue-info")
    return generalInfo
}

function createVenueAdress(venue){
    let container = document.createElement("div")
    let address = document.createElement("p")
    address.innerText = `${venue.location.address}, ${venue.location.city}`
    // add icon
    let icon = document.createElement("i")
    icon.classList = "fas fa-map-marker-alt fa-2x"
    container.appendChild(icon)
    container.appendChild(address)
    container.classList.add("venue-adress")
    return container;
}

function createVenueTimeTable(timeTable){
    let days = ["Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag","Zondag"]
    if (timeTable.timeframes == undefined){
        let response = document.createElement("div")
        let text = document.createElement("p")
        text.innerText = "No data available"
        response.appendChild(text)
        return response
    }else{
        let container = document.createElement("div")
        let icon = document.createElement("i")
        icon.classList = "far fa-clock fa-2x"
        let hours = document.createElement("div")
        for (let timeframe of timeTable.timeframes){
            for (let day of timeframe.days){
                let dayHtml = createDay(days[day - 1], timeframe.open)
                dayHtml.classList.add("venue-hours")
                hours.appendChild(dayHtml)
            }
        }
        container.appendChild(icon)
        container.appendChild(hours)
        container.classList.add("venue-timetable")
        return container
    }
}

function createDay(dayName, timeFrames){
    let container = document.createElement("div")
    let dayNameHtml = document.createElement("p")
    dayNameHtml.innerText = `${dayName}`
    let timeFramesHtml = document.createElement("p")
    timeFrames = timeFrames.map(e => `${formatTime(e.start)} - ${formatTime(e.end)}`)
    timeFramesHtml.innerText = timeFrames.join(" / ")
    container.appendChild(dayNameHtml)
    container.appendChild(timeFramesHtml)
    return container
}

function formatTime(time){
    if (time[0] == "+") time = time.substr(1)
    return `${time.substr(0,2)}:${time.substr(2,2)}`
}