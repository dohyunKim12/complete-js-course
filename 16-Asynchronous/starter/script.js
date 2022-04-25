// Ajax 는 Async javascript and xml. but xml은 옛 방식이고 요즘은 전부 json을 주고받음.
// Callback funtion 이나 eventListener는 그 자체로 절때 async를 유발하지 않는다!!
// (예를들어 이미지 로드 후 load 에 따른 이벤트리스너를 정의한다면, 이미지가 로딩되는 자체가 async지, 이벤트리스터가 async가 아니다.)
'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////

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
console.log(request); // fetch는 promise 를 리턴함.
// promise 는 로또 티켓같은거라고 생각하면 됨. (event handler의 callback 지옥으로부터 벗어나게 해준다.)
// nested callback 대신 promise를 chaining 할 수 있음.

// Promise 단계
// 1. Pending ( Before the future value is available)
// 2. Settled (Async task has finished) only settled one
// 3-1. Fullfilled (Success! The value is now available)
// 3-2. Rejected (An error happend! The value is now unavailable)
