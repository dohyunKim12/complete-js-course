'use strict';

// // Functions
// // Default Parameters
// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // numPassengers = numPassengers || 1; // default 값 설정 (ES5 way)(Not good).
//   // price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2);
// createBooking('LH123', 2, 800);

// createBooking('LH123', undefined, 1000); // 2번째 parameter로 default값 이용.

// const flight = 'LH234';
// const dohyun = {
//   name: 'Dohyun Kim',
//   passport: 9545494654,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'SH999';
//   passenger.name = 'Mr. ' + passenger.name;
//   if (passenger.passport === 9545494654) console.log('checked in');
//   else console.log('Wrong passport!');
// };
// checkIn(flight, dohyun);
// console.log(flight);
// console.log(dohyun);
// // Result -> flight는 안바뀌었지만 passenger의 name은 변경됨.(reference val이라서 주소복사. 같은대상을 가리킴.)
// // Doing same like this...
// // const flightNum = flight;
// // const passenger = dohyun;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000);
// };

// newPassport(dohyun);
// checkIn(flight, dohyun); // passport number가 바뀌었음!!! Problem..
// console.log(dohyun);
// // 두개의 함수가 하나의 object를 동시에 manipulate 하고 있다.. -> Be Careful!! Can Cause problem..!!
// // Javascript 에서는 passing by reference는 없음!!! Only Passing by value 방식만 존재!
// // Passing by Reference 처럼 보이는 것도, 사실은 passing by value 임. (주소도 그냥 value일 뿐.)

// //***********************************************************
// // First-Class and Higher-Order Functions
// // First-Class Function은  단지 "Function도 하나의 value이다" 라는 개념을 뜻함. (JS의 특성.)
// // High-Order Functino은 고차함수로, 하나의 함수에서 parameter로 다른 callback function을 부르거나,
// // 함수가 다른 새로운 함수를 return하는 경우를 뜻함.
// // First-Class Function은 그냥 Concept의 개념임. (no Practice!)
// // High-Order Function은 Javascript가  First-Class Function을 지원하기 때문에 가능.

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };
// const maskFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   let maskedFirst = '';
//   maskedFirst = maskedFirst.padStart(first.length, '*');
//   return [maskedFirst, ...others].join(' ');
// };

// // Higher-order Function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`); // Callback function!
//   console.log(`Transformed by: ${fn.name}`); // 모든 function 은  name property를 갖는다.
//   return fn(str);
// };

// console.log(transformer('Javascript is the best!', upperFirstWord));
// console.log(transformer('Javascript is the best!', oneWord));
// console.log(transformer('Javascript is the best!', maskFirstWord));

// // JS uses callback all the time
// // Why??? -> PROS of ABSTRACTION!!!
// const high5 = function () {
//   // Callback function
//   console.log('🖐');
// };
// document.body.addEventListener('click', high5); // High-order function

// ['Dohyun', 'Martha', 'Adam'].forEach(high5);

// const exercise = function (sets, kind) {
//   const [first, ...others] = kind;
//   kind = [first.toUpperCase(), ...others].join('');
//   for (let i = 1; i < sets; i++) {
//     console.log(
//       `Do ${kind} ${i} set ${Math.trunc(Math.random() * 20) + 1} reps!`
//     );
//   }
// };

// const workout = function (person, exercise) {
//   const setNum = Math.trunc((person.height / person.weight) * 2.5);
//   exercise(setNum, person.favoriteWorkout);
// };

// const dohyun = {
//   name: 'Dohyun',
//   height: 180,
//   weight: 75,
//   favoriteWorkout: 'squat',
// };

// workout(dohyun, exercise);

// // //***********************************************************
// // Closures
// // 변수의 Scope 와 관련되어 활용할 수 있는 영역이 많다. (함수를 여러 번 호출시 상태가 연속적을 유지되어야 할 때,
// // React 의 hook API가 Closure를 통해 구현됨.)
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey'); // greeterHey 는 function이다.
// // same with this.
// const greeterHey2 = function (name) {
//   console.log(`Hey ${name}`);
// };
// //(function (name{ console.log(`{greeting} ${name}`)}))
// greeterHey('Dohyun');
// greeterHey('Steven');

// greet('Hello')('Dohyun');

// // greet function 을 arrow 사용해서 표현 (같은 함수임!!)
// // But, more confusing. (traditional way 사용 권장.)
// const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

// greetArrow('Hollo!')('Fucky');

// //***********************************************************
// // This Keyword!

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   // book: function() {} 같은표현임.
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Dohyun Kim');
// lufthansa.book(635, 'John Smith');
// console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// // Call Method
// // book(23, 'Sarah Williams'); // Doesn't Work. (Regular function call 에서는 this 가 undefined.)
// // 위의 방식 대신, 이런식으로 call 할 수 있다. call method를 사용하면서 this keyword를 첫 파라미터로 넘겨줌.
// book.call(eurowings, 23, 'Sarah Williams'); // call method의 첫번째 인자로 this가 가리킬 것을 전달함.
// book.call(lufthansa, 987, 'Mary Cooper');

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');
// console.log(swiss);

// // Apply Method (Call method와 동일하나, this keyword 이후 param에 대해 배열로 전달한다.)
// const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData);
// // Apply method는 ES6에서 거의 쓰지 않음. 대신, 아래와 같은 방식으로 spread operator 활용.
// book.call(swiss, ...flightData);

// // Bind Method.
// // book.call(eurowings, 23,'Sarah Williams');

// const bookEW = book.bind(eurowings); // eurowings를 this keyword에 바인딩.
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(888, 'Steven Williams'); // Looks like normal function call. this keyword를 바인딩 시켜놨음.

// const bookEW23 = book.bind(eurowings, 23); //bind method는 this keyword 이외에도 추가적으로 parameter를 binding 할 수 있다.
// bookEW23('Dohyun Kim'); // Only need a Name.
// bookEW23('Martha Cooper');

// // With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };

// // Very Good UseCase of BIND METHOD !!!
// const btnClick = lufthansa.buyPlane.bind(lufthansa);
// document.querySelector('.buy').addEventListener('click', btnClick);

// // Partial Application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23); // 23% tax. mean same under
// // addVAT = value => value + value * 0.23;

// console.log(addVAT(100));
// console.log(addVAT(23));

// //***********************************************************
// // IIFE(Immediately Invoked Function Expressions)
// const runOnce = function () {
//   console.log('This will never run again');
// };
// runOnce();

// // IIFE (Immediately Invoked Function Expressions) -- 2 Ways. ( ES6 -> Not use anymore.. )
// // IIFE pattern은 최근에도 딱 한번만 호출해야 할 경우, 사용하긴 함.
// (function () {
//   console.log('This will never run again');
//   const isPrivate = 23;
// })();

// // console.log(isPrivate);

// (() => {
//   console.log('This will NEVER run again -- arrow func --');
// })();

// {
//   const isPrivate = 23;
//   var notPrivate = 46;
// }

// // console.log(isPrivate);
// console.log(notPrivate);

// //***********************************************************
// // Closures
// // Closure란, Execution Context (Function 실행 중)에 생성된 function은,
// // 그 function을 생성시킨 execution context(모함수)의 variable에 접근할 수 있다!!

// // 이 경우, booker function은 secureBooking의 Execution Context 즉 실행 중, 생성되었다.
// // 따라서, booker function은 passengerCount 변수에 접근할 수 있다.
// // secureBooking 함수가 종료되면, execution context는 사라지고 끝나지만,
// // variable environment (변수 등)은, booker 함수에게로 간다.
// // 이러한 연결을 Closure라고 한다.
// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers.`);
//   };
// };

// const booker = secureBooking(); // 이 때, Closure 발생!!! (booker function으로 모든 변수들이 넘어옴.)
// booker();

// console.dir(booker);

// Closure Examples
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();

console.dir(f);

h(); // f assigned again!
f();

console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // 얘는 무시됨. (cover over)
boardPassengers(180, 2);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
