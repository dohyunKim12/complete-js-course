// Ajax 는 Async javascript and xml. but xml은 옛 방식이고 요즘은 전부 json을 주고받음.
// Callback funtion 이나 eventListener는 그 자체로 절때 async를 유발하지 않는다!!
// (예를들어 이미지 로드 후 load 에 따른 이벤트리스너를 정의한다면, 이미지가 로딩되는 자체가 async지, 이벤트리스터가 async가 아니다.)
'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
          <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 100000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
   `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest(); // Old school way.

  request.open('GET', `https://restcountries.com/v2/name/${country}`); // github public apis
  request.send();

  request.addEventListener('load', function () {
    // (this === request)
    const [data] = JSON.parse(this.responseText);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest(); // Old school way.

    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`); // api call by country code
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

// Chaining. ( 1 -> 2 ) ( callback inside a callback) (make sequential)
// Working all Parallel
// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('germany');

// Callback hell => 이러한 nested callback 구조가 10개던 20개던 끝없이 반복되는 것. (지금은 2개)
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
// Callback hell problem => 코드의 가독성도 떨어지고 지저분하게 되버림. worst code.
// Code which hard to understand is basically bad code. (more bugs)
// ES6에서는 다행히도 이에 대한 대처방안으로 'promises' 라는 것을 통해 callback escape

// const request = new XMLHttpRequest(); // Old school way.
// request.open('GET', `https://restcountries.com/v2/name/${country}`); // github public apis
// request.send();

const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request); // fetch는 promise 를 리턴함.
// promise 는 로또 티켓같은거라고 생각하면 됨. (event handler의 callback 지옥으로부터 벗어나게 해준다.)
// nested callback 대신 promise를 chaining 할 수 있음.

// Promise 단계
// 1. Pending ( Before the future value is available)
// 2. Settled (Async task has finished) only settled one
// 3-1. Fullfilled (Success! The value is now available)
// 3-2. Rejected (An error happend! The value is now unavailable)

// const getCountryData = function (country) {
//   // then은 fullfilled state일때 실행됨.
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); // all of the resolved value from fetch function.
//       // 이것을 return 함으로써, 그 뒤에 또 then 메서드를 달아 chaining 할 수 있다.
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
// fetch는 promise를 리턴. 그로부터 response를 받는 then 메서드 사용. response를 data화 할 수 있는 json 메서드 사용.
// then 메서드가 또다시 promise를 return 하기 때문에 이것을 연결하여 또다시 then 메서드 사용.

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      if (!data[0].borders) throw new Error('No neighbour found!');

      const neighbour = data[0].borders[0];

      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 🤷‍♂️🤷‍♂️🤷‍♂️ `);
      renderError(`Something went wrong 🤷‍♂️🤷‍♂️ ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// look nicer! (callback hell 대신, flat 한 chaining을 통해 해결!)
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       // Immediately reject. go directly catch handler

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'asdfasdf';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       response.json();
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//     })
//     .then(data => {
//       renderCountry(data, 'neighbour');

//       const neighbour = data.borders[0];
//       if (!neighbour) return;
//       // Country 3
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🤷‍♂️🤷‍♂️🤷‍♂️ `); // console.error 는 stack trace(추적) 기능 포함.
//       renderError(`Something went wrong 🤷‍♂️🤷‍♂️ ${err.message}. Try again!`);
//     }) // catch도 역시 promise를 리턴함.
//     .finally(() => {
//       // called always( no matter promise fullfilled or rejected)
//       // loading spinner 같은 곳에 활용!!
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('australia');
// getCountryData('asdasdfasd');

// Event loop practice
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 100000000; i++) {}
//   console.log(res);
// });

// console.log('Test end');
// 순서 1->4->3->2. 이유는 micro task queue 때문!
// timmer가 먼저 callback queue에 들어가지만 먼저 실행되는것은 아니다.
// Promise는 micro-task queue에 들어가고, callback-queue보다 priority를 갖게 된다.

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       // fullfilled promise
//       resolve('You WIN !'); // call resolve function
//     } else {
//       reject(new Error('You lost your money TT'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// // Real async way to use Timer
// // Nice way to use Timer
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     // no need reject parameter
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited 1 more second'));

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// Promisifying the Geolocation API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}`));
// };

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));
};
btn.addEventListener('click', whereAmI);

// Async & Await
// Even better & easier way to consume promises.
const whereAmIAsync = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem with getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    // fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res));

    // same as above.
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.state}`
    );
    if (!resGeo.ok) throw new Error('Problem with getting Country');

    const data = await res.json();
    renderCountry(data[2]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong!!! ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmIAsync(); // async function => always return promise
// console.log(city);

// whereAmIAsync()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmIAsync();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();
