let map;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 50.88834214278629, lng: 4.7300273687570416}, 
        zoom: 15,
        disableDefaultUI: true
      });
      addMarker()
}

function addMarker(){
  const marker = new google.maps.Marker({
    position: {
      lat: 50.88834214278629,
      lng: 4.7300273687570416
    },
    map: map
  })
}
