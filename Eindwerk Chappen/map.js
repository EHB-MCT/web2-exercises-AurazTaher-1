let google_map;

function initMap(){
    google_map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50.84806065263621, lng: 4.364622430548391},
        zoom: 15,
        disableDefaultUI: true
      });
}

// {
//   lat: 51.009082720293875,
//   lng: 4.835676295884941
// }

function addMarker(venue, callback){
  const infoWindow = new google.maps.InfoWindow({
    content: `<h6>${venue.name}</h6>`
  })
  const marker = new google.maps.Marker({
    position: {lat: venue.location.lat, lng: venue.location.lng},
    map: google_map
  })
  marker.addListener("click", ()=>{
    infoWindow.close()
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus:false
    })
    callback(venue)
  })
  infoWindow.open({
    anchor: marker,
    map,
    shouldFocus:false
  })
}
