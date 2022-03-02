'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1, // default values
    mainIndex = 1,
    time = '19:00',
    address = 'funky town',
  }) {
    console.log(
      'Order received!',
      this.starterMenu[starterIndex],
      this.mainMenu[mainIndex],
      time,
      address
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is Your Delicious Pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    let str = `Here is Your Delicious Pizza with ${mainIngredient}`;

    for (let i = 0; i < otherIngredients.length; i++) {
      str += `, ${otherIngredients[i]}`;
    }
    str += '!';

    console.log(str);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// ////////////////////////////////////
// Logical Assignment Operators.
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// OR assignment operator
// rest1.numGuests ||= 10; // It Works.
// rest2.numGuests ||= 10;

// Nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// rest1.owner = rest1.owner && '<ANDONYMOUS>';
// rest2.owner = rest2.owner && '<ANDONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

// console.log('----OR----');
// ////////////////////////////////////
// // // Logical Operator Short Circuiting.
// // // Can use ANY DataType, return ANY DataType
// console.log(3 || 'Dohyun');
// console.log('' || 'Dohyun');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// // turnary Operator
// restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// // Short Circuiting
// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log('----AND----');
// console.log(0 && 'Dohyun');

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'ham');

// console.log('----Nullish Coalescing----');
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// const guestsCorrect = restaurant.numGuests ?? 10;
// console.log(guestsCorrect); // It works! ( 0과 ''을 falsy value로 취급하지 않는다.)

////////////////////////////////////
// // Rest Pattern and Parameters

// // 1)  Destructuring
// // Spread, beacause on RIGHT side of =
// const arr = [1.2, ...[3, 4]];

// // REST, because on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [piz, , ris, ...otherFoods] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(piz, ris, otherFoods);

// // Objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);
// console.log(sat);

// // 2) Functions
// const add = function (...numbers) {
//   const reducer = (acc, cur) => acc + cur;
//   console.log(numbers.reduce(reducer));
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 5, 4, 3, 2, 1, 0, 5, 4);

// const x = [23, 5, 7];
// add(...x); // Spread Operator
// // add function 에 들어가는 순간, 다시 rest 연산자에 의해 배열로 압축됨.
// // Spread operator는 배열을 요소요소로 반환.
// // Rest operator는 반대로 요소요소를 배열로 묶음.

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');

////////////////////////////////////
// // Spread Operator (Unpacked Arrays)
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// // In ES6.  Use spread operator ...
// const newArr = [1, 2, ...arr];
// console.log(newArr);

// console.log(...newArr);

// const newMenu = [...restaurant.mainMenu, 'Kimchi'];
// console.log(newMenu);
// restaurant.mainMenu = newMenu; //Menu Update

// // Copy Array
// const mainMenuCopy = [...restaurant.mainMenu];

// // Join 2 Arrays
// const wholeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(wholeMenu);

// // Iterables: arrays, strings, maps, sets. NOT Objects
// const str = 'Dohyun';
// const letters = [...str, '', 'S.'];
// console.log(letters);

// const Ingredients = [
//   prompt("Let's make Pasta! Ingredient 1? "),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3.'),
// ];
// restaurant.orderPasta(...Ingredients);

// // Spread Operator also work in Objects! (Even if Object is NOT iterable.)
// const newRestaurant = { foundedIn: 1995, ...restaurant, founder: 'Geisseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Downy Restarant';
// console.log(restaurant.name);
// console.log(restaurantCopy.name);

////////////////////////////////////
// Destructuring Objects
// const deliveryObj = {
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// };

// restaurant.orderDelivery(deliveryObj); // Object 하나만 보낸다. 그러면 fucntion에서 자체적으로 destructuring.
// restaurant.orderDelivery({
//   mainIndex: 0,
// });

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // With new variable names
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;

// console.log(restaurantName, hours, tags);

// // setting default value
// const { fucky: menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// console.log(obj);

// // { blah, blah } = obj  이런식으로 쓰면, js 엔진은 {}를 코드블럭으로 인식, 코드블럭에 = 연산자로 무엇을 대입하는것은 오류로 인식.
// ({ a, b } = obj); // Good. (소괄호로 감싼다.)
// console.log(a, b); //It works!

// // Nested Objects
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

////////////////////////////////////
// // Destructuring Arrays
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr; // Destructuring Array. []는 array가 아니라 destructuring하는 것일 뿐.

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // Switching variables
// // const temp = main;
// // main = secondary;
// // secondary = temp;

// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// //Receive 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // Nested destructuring
// const nested = [2, 4, [5, 6]];
// const [i, j, [k, l]] = nested;
// console.log(i, j, k, l);

// // Default values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);
