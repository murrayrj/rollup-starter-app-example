let myPlaces = [];
let userData = {};
const geocoder = new google.maps.Geocoder;

let changeListeners = [];

export function subscribe(callbackFunction) {
  changeListeners.push(callbackFunction);
}

function publish(data) {
  changeListeners.forEach((changeListener) => { changeListener(data); });
}

export function addPlace(latLng) {
  geocoder.geocode({ 'location': latLng }, function (results) {
    try {
      const cityName = results
        .find(result => result.types.includes('locality'))
        .address_components[0]
        .long_name;

      myPlaces.push({ position: latLng, name: cityName });

      publish(myPlaces);

      localStorage.setItem('myPlaces', JSON.stringify(myPlaces));
    } catch (e) {
      console.log('No city found in this location! :(');
    }
  });
}

export function populateAddress(addressData, prefix) {
  var addressKeys = Object.keys(addressData);
  var k;
  for (k = 0; k < addressKeys.length; k += 1) {
    var addressProperty = addressKeys[k];
    var addressValue = addressData[addressProperty];
    var addressId = prefix + addressProperty;
    if(addressProperty === 'address_label'){
      document.getElementById(addressId).innerHTML = addressValue;
      continue;
    }
    $('#' + addressId).val(addressValue);
  }
};

export function editPolicyDetails(policyType) {
  var i, j;
  $('.disabled.dropdown', '#' + policyType + '_user').removeClass('disabled');
  $('.disabled.calendar', '#' + policyType + '_user').removeClass('disabled');
  $('.' + policyType + '-edit', '#' + policyType + '_user').removeClass('disabled');
  var userInfoInputs = $('.populate_user_info', '#' + policyType + '_user');
  for (i = 0; i < userInfoInputs.length; i += 1) {
    $(userInfoInputs[i]).removeAttr('disabled');
  }
  if (policyType === 'car') {
    var userInfoButtons = $('input', '.car_main_gender').add($('#car_user .uk_status .button'));
    for (j = 0; j < userInfoButtons.length; j += 1) {
      $(userInfoButtons[j]).removeAttr('disabled');
    }
  }
};

function initLocalStorage() {
  const placesFromLocalstorage = JSON.parse(localStorage.getItem('myPlaces'));
  if (Array.isArray(placesFromLocalstorage)) {
    myPlaces = placesFromLocalstorage;
    publish();
  }
}

export function getPlaces() {
  return myPlaces;
}

initLocalStorage();
