'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const statements = flights.split('+');

// // My Version
// for (let flight of statements) {
//   flight = flight.replaceAll('_', ' ');
//   const strAry = flight.split(';');

//   let newStr =
//     strAry[0] +
//     ' from ' +
//     strAry[1].slice(0, 3).toUpperCase() +
//     ' to ' +
//     strAry[2].slice(0, 3).toUpperCase() +
//     ` (${strAry[3].replace(':', 'h')})`;
//   if (newStr.startsWith(' Delayed')) {
//     newStr = '🎈' + newStr;
//   }

//   console.log(newStr.padStart(45, ' '));
// }

// Jonas Ver ... Pretty Better!
// const upper = str => str.slice(0, 3).toUpperCase();

// for (const flight of flights.split('+')) {
//   const [type, from, to, time] = flight.split(';'); // Please Use Destructuring !!!
//   const output = `${type.startsWith('_Delayed') ? '🎈' : ''}${type.replaceAll(
//     '_',
//     ' '
//   )} ${upper(from)} ${upper(to)} (${time.replace(':', 'h')})`.padStart(40); //default empty space
//   console.log(output);
// }

// // Data needed for first part of the section
// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// const openingHours = {
//   [weekdays[3]]: {
//     open: 12,
//     close: 22,
//   },
//   fri: {
//     open: 11,
//     close: 23,
//   },
//   sat: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
//   [`day-${2 + 4}`]: {
//     open: 2,
//     close: 4,
//   },
// };

// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   // openingHours: openingHours,
//   // ES6 Enhanced object literals
//   openingHours,

//   // order: function (starterIndex, mainIndex) {
//   //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   // },
//   // ES6
//   order(starterIndex, mainIndex) {
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   },

//   orderDelivery({
//     starterIndex = 1, // default values
//     mainIndex = 1,
//     time = '19:00',
//     address = 'funky town',
//   }) {
//     console.log(
//       'Order received!',
//       this.starterMenu[starterIndex],
//       this.mainMenu[mainIndex],
//       time,
//       address
//     );
//   },

//   orderPasta(ing1, ing2, ing3) {
//     console.log(
//       `Here is Your Delicious Pasta with ${ing1}, ${ing2}, and ${ing3}`
//     );
//   },

//   orderPizza(mainIngredient, ...otherIngredients) {
//     let str = `Here is Your Delicious Pizza with ${mainIngredient}`;
//     for (let i = 0; i < otherIngredients.length; i++) {
//       str += `, ${otherIngredients[i]}`;
//     }
//     str += '!';
//     console.log(str);
//   },
// };

// // ////////////////////////////////////
// // Working with Strings
// const airLine = 'TAP Air Portugal';
// const plane = 'A320';

// console.log(airLine.toLowerCase());
// console.log(airLine.toUpperCase());

// // FIX capitalization in name
// const passenger = 'DOhYuN';
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// // Comparing emails
// const email = 'hello@dohyuns.io';
// const loginEmail = '  Hello@Dohyuns.Io \n';

// const loginEmailLower = loginEmail.toLowerCase();
// const loginEmailCorrect = loginEmailLower.trim(); //trim method 사용해서 공백제거.
// console.log(loginEmailCorrect);

// // One way (Same as above)
// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// // replacing
// const priceGB = '288,97#';
// const priceUS = priceGB.replace('#', '$').replace(',', '.'); // No matter with chaining
// console.log(priceUS);

// const announcement =
//   'All Passengers come to boarding door 23, Boarding door 23!';

// console.log(announcement.replace('door', 'Gate')); // Only replace first element
// console.log(announcement.replaceAll('door', 'Gate')); // Replace All

// // Regular Expressions
// console.log(announcement.replace(/door/g, 'Gate')); // Replace All ( g means global)

// // Booleans
// const plane = 'Airbus A320neo';
// console.log(plane.includes('A320'));
// console.log(plane.includes('Boeing'));
// console.log(plane.startsWith('Air'));
// console.log(plane.startsWith('A3'));

// if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
//   console.log('Part of the NEW Airbus Family');
// }

// // Practice exercise
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();

//   console.log(baggage);
//   if (baggage.includes('knife') || baggage.includes('gun'))
//     console.log('You are NOt allowed aboard! ');
//   else console.log('Welcome!');
// };

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some snacks and a gun for protection');

// // Part 3 (string devider SPLIT) and JOIN
// console.log('a+very+nice+string'.split('+'));
// console.log('Dohyun Kim'.split(' '));

// const [firstName, lastName] = 'Dohyun Kim'.split(' ');

// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// const capitalizeName = function (name) {
//   const nameAry = name.split(' ');
//   const naemsUpper = [];

//   for (const n of nameAry) {
//     // naemsUpper.push(n[0].toUpperCase() + n.slice(1));
//     naemsUpper.push(n.replace(n[0], n[0].toUpperCase())); //Same result! as Above
//   }
//   console.log(naemsUpper.join(' '));
// };

// capitalizeName('jessica ann smith davis');
// capitalizeName('dohyun kim');

// // Padding
// const message = 'GO to gate 23!';
// console.log(message.padStart(20, '+').padEnd(30, '+'));
// console.log('Dohyun'.padStart(20, '+').padEnd(30, '+'));

// // Usecase -> Credit Card! (left 4 number, rest of it, *****)
// const maskCreditCard = function (number) {
//   const str = number + ''; // make number as string. (operator 효과)
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// };

// console.log(maskCreditCard(9974100));
// console.log(maskCreditCard(9974100084462454));
// console.log(maskCreditCard('99741000844624546489444'));

// // Repeat
// const message2 = 'Bad weather... All Departures Delayed...! ';
// console.log(message2.repeat(3));
// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
// };
// planesInLine(5);
// planesInLine(3);
// planesInLine(12);

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log('B737'[0]);

// console.log(airLine.length);
// console.log('B737'.length);

// console.log(airLine.indexOf('r'));
// console.log(airLine.lastIndexOf('r')); //뒤에서부터 count
// console.log(airLine.indexOf('Portugal')); // Case Sensitive
// console.log(airLine.slice(4, 7)); // Always return new string.

// console.log(airLine.slice(0, airLine.indexOf(' '))); // 첫 단어 출력.
// console.log(airLine.slice(airLine.lastIndexOf(' ') + 1)); // 끝 단어 출력.

// console.log(airLine.slice(-2));
// console.log(airLine.slice(1, -1));

// const checkMiddleSeat = function (seat) {
//   // B, E is middle Seat
//   const s = seat.slice(-1);
//   s === 'B' || s === 'E' ? console.log('Middel seat!') : console.log('NO T.T');
// };
// checkMiddleSeat('11B');
// checkMiddleSeat('11C');
// checkMiddleSeat('3E');

// console.log(new String('Dohyun')); // Object
// console.log(typeof new String('Dohyun')); // Object

// // ////////////////////////////////////
// // Summary - Wichi DataStructure to Use?

// // ////////////////////////////////////
// // Maps: Iteration

// const question = new Map([
//   ['question', 'What is the best Programming Language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct!!!'],
//   [false, 'Try again!'],
// ]);
// console.log(question);
// // Convert Object to Map (Easy Way!)
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // Quiz App
// console.log(question.get('question'));
// for (const [key, val] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key} : ${val}`);
// }

// const answer = Number(prompt('Your answer'));
// console.log(question.get(answer === question.get('correct')));

// // Convert map to array
// console.log([...question]); // arrays of arrays
// console.log(question.entries());
// console.log(question.keys());
// console.log(question.values());

// // ////////////////////////////////////
// // Maps // key value 쌍으로 이루어짐.
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal')); // set메소드는 Map객체를 반환.
// console.log(rest);

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open!')
//   .set(false, 'We are closed TT');

// console.log(rest);
// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get('true')); // Type depends.

// const time = 21;

// console.log(rest.get(rest.get('open') <= time && rest.get('close') >= time));

// console.log(rest.has('categories'));
// rest.delete(2);
// console.log(rest);
// console.log(rest.size);
// rest.clear();

// rest.set([1, 2], 'Test');
// console.log(rest);
// console.log(rest.get([1, 2])); // Not same object! (다른 번지의 주소를 갖고있다.)

// // Instead of above, do this way.
// const arr = [1, 2];
// rest.set(arr, 'Test');
// rest.set(document.querySelector('h1'), 'Heading'); // It's possible this way too!(Sounds crazy;)
// console.log(rest);
// console.log(rest.get(arr));

// // ////////////////////////////////////
// // Sets
// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(ordersSet);

// console.log(new Set('Dohyun'));

// console.log(ordersSet.size); // Not length. instead of length size.
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// ordersSet.delete('Risotto');
// console.log(ordersSet);
// console.log(...ordersSet); // No way to out value from set.

// for (const order of ordersSet) console.log(order);

// // Example
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffSet = new Set(staff);
// console.log(staffSet);
// const staffUnique = [...staffSet];
// console.log(staffUnique);
// console.log(staffSet.size);

// console.log(new Set('Dohyunnee babo').size); //중복되지 않은 문자 몇개인지?

// // ////////////////////////////////////
// // Looping Objects: Object Keys, Values, and Entries

// // Property Names
// for (const day of Object.keys(openingHours)) console.log(day);

// const properties = Object.keys(openingHours);
// console.log(properties);

// console.log(`We are open on ${properties.length} days.`);

// let openStr = `We are open on ${properties.length} days: `;
// for (const day of properties) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// // Property Valeus
// for (const day of Object.values(openingHours)) console.log(day);

// // Entire object
// const entries = Object.entries(openingHours);
// console.log(entries);

// // Destructure object in For Loop
// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// // ////////////////////////////////////
// Enhanced Object Literals
// Optional Chaning
// if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);
// if (restaurant.openingHours && restaurant.openingHours.mon)
// console.log(restaurant.openingHours.mon.open);

// //WITH optional chaining
// console.log(restaurant.openingHours.mon?.open); // open 이 존재하면 open 출력. (위의 두 줄을 한번에.)
// console.log(restaurant.openingHours?.mon?.open);
// console.log(restaurant.openingHours?.fri?.open);

// // Example
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'Sorry, we closed';
//   console.log(`On ${day}, we open at ${open}`);
// }

// // Use in Methods (optional chaining)
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exists');
// console.log(restaurant.orderFuck?.(0, 1) ?? 'Method does not exists');

// // Use in Arrays (optional chaining)
// const users = [
//   {
//     name: 'Dohyun',
//     email: 'blahblah@gmail.com',
//   },
// ];
// console.log(users[0]?.name ?? 'User array empty');
// console.log(users[1]?.name ?? 'User array empty');

// // ////////////////////////////////////
// // Looping Arrays.

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);

// for (const [index, element] of menu.entries()) {
//   // console.log(`${item[0] + 1} : ${item[1]}`);
//   console.log(`${index + 1} : ${element}`); // Work same!
// }

// console.log([...menu.entries()]);

// // ////////////////////////////////////
// // Logical Assignment Operators.
// const rest1 = {
//   name: 'Capri',
//   // numGuests: 20,
//   numGuests: 0,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// // rest1.numGuests = rest1.numGuests || 10;
// // rest2.numGuests = rest2.numGuests || 10;

// // OR assignment operator
// // rest1.numGuests ||= 10; // It Works.
// // rest2.numGuests ||= 10;

// // Nullish assignment operator (null or undefined)
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// // rest1.owner = rest1.owner && '<ANDONYMOUS>';
// // rest2.owner = rest2.owner && '<ANDONYMOUS>';
// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

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
const restaurant = {
  starterMenu: ['salad', 'bread', 'soup'],
  mainMenu: ['pizza', 'pasta', 'goguma'],
  name: `Bonny's Pasta`,
  openingHours: '9am to 8pm',
  categories: ['blah', 'blahblah'],
  orderDelivery({
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
};

const deliveryObj = {
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
};

restaurant.orderDelivery(deliveryObj);
// Object 하나만 보낸다. 그러면 fucntion에서 자체적으로 destructuring.
restaurant.orderDelivery({
  mainIndex: 0,
});

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// With new variable names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

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
