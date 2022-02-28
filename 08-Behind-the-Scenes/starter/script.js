'use strict';

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     let output = `${firstName} You are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       const firstName = 'Steven';
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       output = 'New output!!';
//     }

//     console.log(millenial); // can access (not block scope, function scope)

//     console.log(output);
//   }

//   printAge();

//   return age;
// }

// const firstName = 'Dohyun';

// calcAge(1995);

// Variables
// console.log(me); //undeifined
// console.log(job); // cannot access job before initialization
// console.log(year); //cannot access year before initialization

// var me = 'Dohyun';
// let job = 'SW Engineer';
// const year = 1995;

// //Functions
// console.log(addDecl(2, 3));
// console.log(addExpr(2, 3)); //cannot access err
// console.log(addArrow(2, 3)); //cannot access err

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// const addArrow = (a, b) => {
//   return a + b;
// };

// // Example
// if (!numProducts) deleteShoppingCart(); // hoisting 때문에 undefined(falsy value) 라서 함수 실행됨.

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x);
// console.log(y === window.y);
// console.log(z === window.z);

// //This keyword.
// // This is not static.
// // This points object who called method.

// const dohyun = {
//   name: 'Dohyun',
//   year: 1995,
//   calcAge: function () {
//     return 2037 - this.year; //In method.
//   },
// };

// console.log(dohyun.calcAge());
// // Regular function 의 this => undeifined.(호출자가 없으므로.)
// // Arrow function 은 this keyword를 제공하지 않음!!!!!!!!! (부모의 this를 그대로 가져옴.)
// // Arrow function 의 this => this of surrounding function (lexical this)
// // Event listener 의 this => DOM element that the handler is attached to

// // KEYWORD <new, call, apply, bind>

// // This keyword practice.
// console.log(this);
// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this); // parent의 this를 가리킴.
// };

// calcAge(1995);
// calcAgeArrow(1995);

// const dohyun = {
//   year: 1995,
//   calcAge: function () {
//     console.log(this); // call한 object
//     console.log(2037 - this.year); // call한 object
//   },
// };
// dohyun.calcAge();

// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = dohyun.calcAge; // *** function borrowing
// matilda.calcAge();

// const f = dohyun.calcAge;

// const dohyun = {
//   firstName: 'Dohyun',
//   year: 1995,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);

//     const self = this; // self or that
//     const isMillenial1 = function () {
//       // solution one.
//       console.log(self.year >= 1981 && self.year <= 1996);
//     };
//     const isMillenial2 = () => {
//       // solution two
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };

//     isMillenial1();
//     isMillenial2();
//   },
//   greet: () => {
//     console.log(`Hey ${this.firstName}`); // FUCK AWAY!! Doesn't work.
//   },
// };

// dohyun.greet();
// dohyun.calcAge();

// //Arguments keyword
// const addExpr = function (a, b) {
//   console.log(arguments);
//   console.log(arguments[3]);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12);

// const addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5); // arguments is not defined

// let age = 30;
// let oldAge = age;
// age = 31;

// console.log(age);
// console.log(oldAge);

// const me = {
//   firstName: 'Dohyun',
//   age: 30,
// };
// const friend = me; // 얕은 복사. (pointer가 가리키는 주소를 복사했음.)
// friend.age = 25;

// console.log(me);
// console.log(friend);

// const newfriend = Object.assign({}, me);
// newfriend.age = 7;
// console.log(newfriend);
// console.log(me);

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'David';

console.log(lastName);
console.log(oldLastName); // String 은 Primitive value.

// Refernece types
const jessica = {
  firstName: 'Jessica',
  lastName: 'WIlliams',
  age: 27,
};
const marriedJessica = jessica;

marriedJessica.lastName = 'David';

console.log('Before marriage', jessica);
console.log('After marriage', marriedJessica);

// marriedJessica = {}; not allowed

// copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'WIlliams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2); //Shallow copy. (Real copy) (Only works first level)
jessicaCopy.lastName = 'David';
jessicaCopy.family.push('fucky');

console.log('Before marriage', jessica2);
console.log('Before marriage', jessicaCopy);
