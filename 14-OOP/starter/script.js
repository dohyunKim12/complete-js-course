'use strict';

// const user = {
//   user: 'dohyun',
//   password: 'ehgus0303!',
//   login(password) {
//     //login logic
//   },
//   sendMessage(str) {
//     //sending logic
//   },
// };

// // 4 Fundamental principles of OOP
// // * Abstraction * (추상화)
// // ignore or to hide detail.

// // * Encapsulation * (캡슐화)
// // keep some properties and methods Private inside the class. (Not accessible outside of class)
// // but some methods can be exposed as a public interface (API)

// // * Inheritance *
// // * Polymorphism *

// // Classical OOP: Class -> instances (Instaciation)
// // OOP in Javascript :  Prototype <- Object (delegated)

// // 1. Constructor functions : Technique to create obejcts from a function
// // 2. ES6 Classes : Do not behave like classes in "Classical OOP" (Just nicer syntax)
// // 3. Object.create() : Easiest, most straight-forward. (But not usual)

// // Constructor function
// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // Never Do this. (Do not create methods in constructor function) (Terrible performance)
//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYear);
//   // };
// };

// const dohyun = new Person('Dohyun', 1995);
// console.log(dohyun);

// // 1. New {} is created
// // 2. function is called, this = {}
// // 3. {} linked to prototype
// // 4. function automatically return {}

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);

// console.log(matilda, jack);

// console.log(dohyun instanceof Person);

// // Use Prototypes for attach methods
// console.log(Person.prototype);
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// console.log(Person.prototype);

// dohyun.calcAge();
// matilda.calcAge();

// console.log(dohyun.__proto__);

// console.log(dohyun.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(dohyun));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// Person.prototype.species = 'Homo Sapiens';
// console.log(dohyun.species, matilda);

// console.log(dohyun.hasOwnProperty('firstName'));
// console.log(dohyun.hasOwnProperty('species'));

// console.log(dohyun.__proto__);
// // Object.prototype (top of prototype chain)
// console.log(dohyun.__proto__.__proto__);
// console.log(dohyun.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [3, 6, 4, 5, 6, 9, 3]; // new Array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

// // Not good idea..
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.dir(x => x + 1);

// ES6 Classes (Class is just special type of functions)
// class expression
// const PersonCl = class {}

// // class declaration (Nicer)
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Methods will be addedd to .prototype protperty
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }
//   greet() {
//     console.log(`Hey ${this.fullName}!`);
//   }
//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set a property that already exists
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert('err! no full name');
//   }
//   get fullName() {
//     return this._fullName;
//   }
// }

// const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
// jessica.calcAge();
// console.log(jessica.age);

// console.log(jessica.__proto__ === PersonCl.prototype);

// jessica.greet();

// // 1. Calsses are NOT hoisted
// // 2. Classes are first-class citizens (pass them into functions, return them from functions)
// // 3. Classes are executed in strict mode

// const walter = new PersonCl('Walter White', 1965);

// // Setters & Getters

// const account = {
//   owner: 'dohyun',
//   movements: [200, 530, 120, 300],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// account.latest = 234; // call setter
// console.log(account.latest); // call getter

// Object.create
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// steven.name = 'Steven';
// steven.birthYear = 2002;
// steven.calcAge();

// console.log(steven.__proto__ === PersonProto);

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 2002);
// sarah.calcAge();

// // Inheritance Between "Classess": Constructor Functions
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student);
// console.log(mike instanceof Person);
// console.log(mike instanceof Object);

// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);

// // ES6 Inherit
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Methods will be addedd to .prototype protperty
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }
//   greet() {
//     console.log(`Hey ${this.fullName}!`);
//   }
//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set a property that already exists
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert('err! no full name');
//   }
//   get fullName() {
//     return this._fullName;
//   }
//   static hey() {
//     console.log(`Hey there ! `);
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     // PersonCl.call(fullName, birthYear)
//     // Always needs to happen first.
//     super(fullName, birthYear); //위에줄 필요가 없이 이걸 부르면 됨.
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }
//   calcAge() {
//     // Method overriding
//     console.log(
//       `I'm ${
//         2037 - this.birthYear
//       } years old, but as a student I feel more like ${
//         2037 - this.birthYear + 10
//       }`
//     );
//   }
// }

// const martha = new StudentCl('Martha Jones', 2012);
// // const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
// martha.introduce();
// martha.calcAge();

// // Inheritance Between "Classes": Object.create
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const jay = Object.create(StudentProto);
// jay.init('Jay', 2010, 'Computer Science');
// jay.introduce();
// jay.calcAge();

// Another Class Example
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (There is also the static version too.)

class Account {
  // 1) Public fields (On Instances)
  locale = navigator.language; // 이건 예외적으로 이렇게 작성.

  // 2) Private fields (#)
  #movements = []; // syntax that make field private
  #pin; // 일단 선언만 해 놓고 밑에서 재 할당.

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this.#pin = pin;
    this.#movements = []; // We can create even more property
    // _ is not truly private (Just for convention)
    this.locale = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods
  getMovements() {
    return this.#movements;
  }
  // Public Interface (APIs)
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val); // call another method
    return this;
  }
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }

  static helper() {
    console.log('Static method');
  }

  // 4) Private methods (아직 구현 안됨.)
  // #approveLoan(val) {
  _approveLoan(val) {
    return true; // 실제로는 구현 생략.
  }
}

const acc1 = new Account('Dohyun', 'WON', 1111);
console.log(acc1);

// acc1._movements.push(250);
// acc1._movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
// acc1.approveLoan(1000); // Should be not allowed (data privacy.)
// console.log(acc1.pin); // Should be not allowed

console.log(acc1);

// console.log(acc1.#movements); // occur syntax error! (protected.)
// console.log(acc1.#pin);

Account.helper();

// Chaining methods
acc1.deposit(300).deposit(500).withdraw(350).requestLoan(25000).withdraw(120);
console.log(acc1.getMovements());
