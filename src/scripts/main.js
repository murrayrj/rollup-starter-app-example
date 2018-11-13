import { addPlace, getPlaces, subscribe } from './dataService.js';
import request from 'then-request';

let googleMap;

function renderMarkers(placesArray) {
  googleMap.markerList.forEach(m => m.setMap(null)); // remove all markers
  googleMap.markerList = [];

  placesArray.forEach((place) => {
    const marker = new google.maps.Marker({
      position: place.position,
      map: googleMap
    });

    googleMap.markerList.push(marker);
  });
}

function init() {
  googleMap = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 }, zoom: 3
  });

  googleMap.markerList = [];
  googleMap.addListener('click', addMarker);
}

function addMarker(event) {
  addPlace(event.latLng);
}

init();
renderMarkers(getPlaces());
subscribe(renderMarkers);

function renderCities(placesArray) {
  // Get the element for rendering the city list...
  const cityListElement = document.getElementById('citiesList');

  // ...clear it...
  cityListElement.innerHTML = '';

  // ...and populate it, one place at a time using forEach function
  placesArray.forEach((place) => {
    const cityElement = document.createElement('div');
    cityElement.innerText = place.name;
    cityListElement.appendChild(cityElement);
  });
}

renderCities(getPlaces());

subscribe(renderCities);

// request('GET', 'https://cat-fact.herokuapp.com/facts').done((res) => {
//   console.log(res.getBody());
// });
