'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Dohyun Kim',
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // textContent와 비슷하나, 텍스트 뿐 아니라 html 모든 tag들에 대한 것.
  // .textContent = 0

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, index) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsername = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

const calcDisplayBalance = function (movements) {
  currentAccount.balance = movements.reduce((prev, cur) => prev + cur, 0);
  labelBalance.textContent = `${currentAccount.balance}€`;
};

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((prev, cur) => prev + cur, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outgoes = Math.abs(
    movements.filter(mov => mov < 0).reduce((prev, cur) => prev + cur, 0)
  );
  labelSumOut.textContent = `${outgoes}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * currentAccount.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((prev, cur) => prev + cur, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Event Handlers
let currentAccount = '';

btnLogin.addEventListener('click', function (event) {
  // form 안에 커서를 두고 Enter를 쳐도 click과 동일한 효과가 일어남.
  // Prevent form from submitting.
  event.preventDefault();

  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome message.
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 1;

    // Clear Input Fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    // // Display Movements
    // displayMovements(currentAccount.movements);

    // // Display Balance
    // calcDisplayBalance(currentAccount.movements);

    // // Dispaly Summary
    // calcDisplaySummary(currentAccount.movements);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movements
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  } else {
    alert('What the fuck are you trying?');
  }
  inputLoanAmount.value = '';
});

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc.movements);
  calcDisplaySummary(acc.movements);
};
// Transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount !== currentAccount.username
  ) {
    // Negative movement for current User
    currentAccount.movements.push(-amount);
    // Positive movement for receiver
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  } else alert('fuck you!!');
});

// Close account (Delete account)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    const index2 = accounts.indexOf(currentAccount);

    console.log(index);
    console.log(index2);
    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 100;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// Sort orders
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// More ways creating arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill methods
const x = new Array(7);
x.map(() => 5);
console.log(x);
// x.fill(1);
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
// first parameter는 length 전달, second parameter는 map의 callback function과 동일하게 작성.
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // _ 는 throwaway variable. (필요없는 parameter)
console.log(z);

// Array.from 의 좋은 예시. (querySelectorAll)
labelBalance.addEventListener('click', function (e) {
  e.preventDefault();
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // 이런식으로 spread operator 활용도 가능은 함.
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});

// FLAT
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr);
// console.log(arr.flat()); // Only goes 1 level deep

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep);
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((prev, cur) => prev + cur, 0);
// console.log(overallBalance);

// // flat
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((prev, cur) => prev + cur, 0);

// console.log(overallBalance);

// // flatMap
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements) // map 후 flat 하는것 뿐.
//   .reduce((prev, cur) => prev + cur, 0);

// console.log(overallBalance2);

// // Sort strings
// const owners = ['Dohyun', 'Zach', 'Adam', 'Martha'];
// owners.sort();
// console.log(owners);

// // Sort numbers
// console.log(movements);
// movements.sort(); // 예상치 못한 결과 도출. 이유는 string기반 sort이기 때문.
// console.log(movements);

// // Use callback function to sort
// // return < 0,  A, B (keep order)
// // return > 0,  B, A (switch order)
// movements.sort((a, b) => {
//   // Ascending
//   if (a > b) return 1;
//   else return -1;
// });
// movements.sort((a, b) => a - b); // same as above

// movements.sort((a, b) => {
//   // Descending
//   if (a > b) return -1;
//   else return 1;
// });
// movements.sort((a, b) => b - a); // same as above
// console.log(movements);

// // SOME
// // EQUALITY
// console.log(movements.includes(-130));
// console.log(movements.some(mov => mov === -130)); // same as this.

// // CONDITION
// const anyDeposits = movements.some(mov => mov > 5000);
// const anyDeposits2 = movements.some(mov => mov > 50);
// console.log(anyDeposits);
// console.log(anyDeposits2);

// // EVERY
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // Seprate callback !!!
// const deposit = mov => mov > 0; // 이렇게 정의해놓고, callback에서 사용 가능!
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// // FIND method.
// const firstWithDrawal = movements.find(mov => mov < 0); // only return first element that satisfy condition in array.
// console.log(firstWithDrawal);

// const account = accounts.find(function (account) {
//   return account.owner == 'Jessica Davis';
// });
// console.log(accounts);
// console.log(account);

// const eurToUsd = 1.1;

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     console.log(arr);
//     return mov * eurToUsd;
//   })
//   // .map(mov => mov * eurToUsd)
//   .reduce((prev, cur) => prev + cur);

// console.log(totalDepositsUSD);

// Array Methods.

// MAP (simillar forEach, 그러나 새로운 배열 생성.)
// FLITER (조건을 만족하는 요소들만 추려서 새로운 배열 생성.)
// REDUCE (배열 요소들을 하나로 합침. snowball 연상.)

// // FLITER Method.
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// const deposit = movements.filter(function (mov) {
//   return mov > 0;
// });

// const withdrawal = movements.filter(mov => mov < 0);
// console.log(deposit);
// console.log(withdrawal);

// // REDUCE Method (Array를 하나의 value로 ..)
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const balance = movements.reduce(function (prev, cur, idx, arr) {
//   console.log(`Iteration ${idx} in ${arr}: ${prev}`);
//   return prev + cur;
// }, 0);

// console.log(balance);

// // reduce 함수를 이용하여 maximum value를 이렇게 구할 수 도 있음.
// const max = movements.reduce((prev, cur) => {
//   if (prev > cur) return prev;
//   else return cur;
// }, movements[0]);

// // MAP Method.
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(mov => Math.floor(mov * eurToUsd));

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) {
//   movementsUSDfor.push(Math.floor(mov * eurToUsd));
// }
// // 이 방식보다 위에 map을 쓰는 방식이 훨씬 좋음. (functional programming)

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'depositied' : 'withdrew'} ${mov}`
// );

// console.log(movementsDescriptions);

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, val, set) {
//   console.log(value);
//   console.log(val);
//   console.log(set);
// });

// console.log('----forEach on Map');
// /////////////////////////////////////////////////
// // // For Each method on MAP.
// currencies.forEach(function (currency, key, maps) {
//   console.log(currency);
//   console.log(key);
//   console.log(maps);
// });

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
