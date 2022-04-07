'use strict';

const user = {
  user: 'dohyun',
  password: 'ehgus0303!',
  login(password) {
    //login logic
  },
  sendMessage(str) {
    //sending logic
  },
};

// 4 Fundamental principles of OOP
// * Abstraction * (추상화)
// ignore or to hide detail.

// * Encapsulation * (캡슐화)
// keep some properties and methods Private inside the class. (Not accessible outside of class)
// but some methods can be exposed as a public interface (API)

// * Inheritance *
// * Polymorphism *

// Classical OOP: Class -> instances (Instaciation)
// OOP in Javascript :  Prototype <- Object (delegated)

// 1. Constructor functions : Technique to create obejcts from a function
// 2. ES6 Classes : Do not behave like classes in "Classical OOP" (Just nicer syntax)
// 3. Object.create() : Easiest, most straight-forward. (But not usual)

// Constructor function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never Do this. (Do not create methods in constructor function) (Terrible performance)
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const dohyun = new Person('Dohyun', 1995);
console.log(dohyun);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

console.log(matilda, jack);

console.log(dohyun instanceof Person);

// Use Prototypes for attach methods
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(Person.prototype);

dohyun.calcAge();
matilda.calcAge();

console.log(dohyun.__proto__);

console.log(dohyun.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(dohyun));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(dohyun.species, matilda);

console.log(dohyun.hasOwnProperty('firstName'));
console.log(dohyun.hasOwnProperty('species'));

console.log(dohyun.__proto__);
// Object.prototype (top of prototype chain)
console.log(dohyun.__proto__.__proto__);
console.log(dohyun.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

// Not good idea..
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
