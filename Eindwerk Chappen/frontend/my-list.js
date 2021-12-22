window.onload = setup

async function setup(){
    let venues = await sendApiRequest("http://localhost:3000/api/venues","GET")
    createVenues(venues)
}

async function sendApiRequest(url,method,body){
    let response = await fetch(url,{
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    let result = await response.json()
    return result
}

function createVenues(venues){
    let venuesHtml = document.getElementById("my-list-venues")
    venuesHtml.innerHTML = ""
    for (let venue of venues){
        console.log(venue)
        venuesHtml.appendChild(createVenue(venue.venue, venue.hours,venue._id))
    }
}

function createVenue(venue,hours,id){
    console.log(venue)
    console.log(hours)
    let venueContainer = document.createElement("div")
    let rating = createRating(venue,id)
    let generalInfo = createVenueInfo(venue,hours)
    let buttons = document.createElement("div")
    let updateButton = createUpdateButton(id,venue)
    let removeButton = createRemoveButton(id)
    buttons.appendChild(updateButton)
    buttons.appendChild(removeButton)
    venueContainer.appendChild(generalInfo)
    venueContainer.appendChild(rating)
    venueContainer.appendChild(buttons)
    venueContainer.classList ="venue my-list-venue"
    return venueContainer
}

function createRating(venue,id){
    let rating = document.createElement("input")
    rating.type = "number"
    rating.id = `rating-value-${id}`
    rating.classList = "form-input"
    let ratingValue = venue.my_rating
    rating.value = ratingValue
    return rating 
}

function createRemoveButton(id){
    let button = document.createElement("button")
    button.innerText = "verwijder"
    button.onclick = async () =>{
        await sendApiRequest(`http://localhost:3000/api/venues/${id}`,"DELETE")
        await setup()
    }
    return button
}

function createUpdateButton(id,venue,hours){
    let button = document.createElement("button")
    button.innerText = "update"
    button.onclick = async () => {
        let rating = document.getElementById(`rating-value-${id}`).value
        rating = parseInt(rating)
        console.log(rating)
        if (rating < 0){
            rating = 0
        }else if (rating > 10){
            rating = 10
        }
        venue.my_rating = rating
        await sendApiRequest(`http://localhost:3000/api/venues/${id}`,"PUT",{venue: venue, hours:hours})
        await setup()
    }
    return button
}

function createVenueInfo(venue, hours){
    console.log(venue)
    console.log(hours)
    let generalInfo = document.createElement("div")
    let name = document.createElement("h2")
    name.innerText = `${venue.name}\t${venue.my_rating}/10`
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