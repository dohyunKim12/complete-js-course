'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, val, set) {
  console.log(value);
  console.log(val);
  console.log(set);
});

console.log('----forEach on Map');
/////////////////////////////////////////////////
// // For Each method on MAP.
currencies.forEach(function (currency, key, maps) {
  console.log(currency);
  console.log(key);
  console.log(maps);
});

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// // Arrays are object, and can use built-in methods.

// // Looping Arrays: For Each
// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('----FOR EACH----'); // BETTER to use FOREACH method.
// // CALLBACK method를 정의. , Continue와 break은 여기서는 안통함.
// movements.forEach(function (mov, idx, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${idx + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${idx + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

// // AT method. 언제쓰냐?? -> 마지막 요소 출력시 유용.(String 에도 가능)
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0)); //same as above (위의 코드는 사실 이와같이 작동하는 것임.)

// console.log(arr[-1]); //doesn't work.

// //Getting the last element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1)); // Use this instead of above.

// let arr = ['a', 'b', 'c', 'd', 'e'];
// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(1, 3)); // position 1부터 position 3미만까지 요소들 삭제.
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -1));
// // Shallow copy
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE
// // All the same as slice, BUT, It change original array.
// // 보통 splice method는 원본array의 요소를 delete할 때 많이 사용. (slice의 목적과는 다름.)
// console.log(arr.splice(2));
// // arr.splice(-1); // 마지막 요소 삭제.
// arr.splice(1, 3); // position 1부터 3개 요소 삭제.
// console.log(arr);

// // REVERSE
// const arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); // original array 또한 바뀐다.
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]); //Just same as above

// // JOIN
// console.log(letters.join('-')); // 명시한 seperator를 이용해 string을 만듦.
