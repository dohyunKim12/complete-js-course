'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

btn.addEventListener('click', function () {
  console.log('fuck');
});

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data.country);
    })
    .catch(err => console.error(`${err.message}`));
};

whereAmI('37.4994', '127.0334');
