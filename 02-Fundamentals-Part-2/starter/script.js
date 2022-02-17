// //********************Strict mode */
// "use strict"; //activate strict mode //has to be first in the script
// // accidental error . 에러 발견을 쉽게 해줌. 디버깅을 쉽게 해줌. Show visible error.
// // 항상 strict mode 를 on 할 것.!!
// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true; // 오타 발생. strict mode가 아니라면 이러한 에러를 발견할 수 없음.
// if (hasDriversLicense) console.log("I can drive :D");

// const interface = "Audio"; //reserved word. 예약어 사용. -> strict mode가 잡아냄.

// console.log(interface);

// const private = 534; //마찬가지로 예약어.
// const if = 23;

// // ********************Functions */
// // function은 variable과 비슷. 한 블록의 코드를 할당받는다.

// function logger() {
//   console.log("My name is Dohyun");
// }

// // calling / running / invoking function
// logger();
// logger();
// logger();

// function fruitProcessor(apples, oranges) {
//   console.log(apples, oranges);
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//   return juice;
// }

// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

// console.log(fruitProcessor(5, 0));

// const appleOrangeJuice = fruitProcessor(2, 4);

// //********************Function Declarations vs Expressions */
// Function declaration
// function calcAge1(birthYear) {
//   return 2037 - birthYear;
// }

// const age1 = calcAge1(1995);
// console.log(age1);

// //Function expression (익명함수를 정의한 다음에, 변수에 할당.)
// //Function declaration과 같은 방식으로 작동한다.
// //calcAge2 라는 변수에 function value를 할당한다.
// //javascript에서는 function도 그냥 하나의 값이라고 생각하면 됨.
// const calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// };
// const age2 = calcAge2(1995);
// console.log(age2);

// // Function declaration과 expression 방식의 가장 큰 차이점은
// // declaration 방식은 함수의 정의 전에 함수를 call 할 수 있음.
// // expression 방식은, function 값을 변수에 할당하는 방식이므로, 정의 이전에 call 할 경우
// // not defined 문제가 발생됨.

// // 그렇다면, 둘 중 어느방식이 더 좋은가? -> 필자는 function expression방식을 더 선호.
// // looks more structured.

// // ********************Arrow Function  */
// // Function expression 방식의 조금 더 짧은 version.

// // All The Same
// function calcAge_dec() {
//   return 2037 - birthYear;
// }
// const calcAge1 = calcAge_dec;

// const caclAge2 = function (birthYear) {
//   return 2037 - brithYear;
// };

// const calcAge3 = (birthYear) => {
//   return 2037 - birthYear;
// };

// const caclAge4 = (birthYear) => 2037 - birthYear;

// // another function (return explicitly)
// const yearsUntilRetire = (birthYear, firstName) => {
//   const age = 2037 - birthYear;
//   const retirement = 65 - age;
//   return `${firstName} retire after ${retirement} years.`;
// };

// console.log(yearsUntilRetire(1995, "Dohyun"));

// //********************Functions Calling Other Functions */
// // fruitProcessor (믹서기)가 하나의 과일을 통째로 갈 수 없다고 가정.(small piecies로 분할해주는
// // 선작업 해주는 믹서기함수 필요.)
// function cutFruitPieces(fruit) {
//   return fruit * 4; // 4토막으로 잘라줌.
// }

// function fruitProcessor(apples, oranges) {
//   const applePieces = cutFruitPieces(apples);
//   const orangePieces = cutFruitPieces(oranges);
//   const juice = `Juice with ${applePieces} applePieces and ${orangePieces} orangePieces.`;
//   return juice;
// }

// console.log(fruitProcessor(1, 1));

// //********************Functions Calling Other Functions */
// const calcAges = function (year) {
//   return 2037 - year;
// };
// const yearsUntilRetire = function (birthYear, firstName) {
//   const age = calcAges(birthYear);
//   const retirement = 65 - age;

//   if (retirement > 0) {
//     console.log("Good Value.");
//     return retirement;
//   } else {
//     console.log("Bad Value.");
//     return -1;
//   }
//   // return `${firstName} retires in ${retirement} years.`;
// };

// console.log(yearsUntilRetire(1995, "Dohyun"));
// console.log(yearsUntilRetire(1950, "Mike"));

// //********************Introduction to Arrays */
// const friend1 = "Michael";
// const friend2 = "Steven";
// const friend3 = "Peter";

// const friends = ["Michael", "Steven", "Peter"];
// console.log(friends);

// const yearss = new Array(1995, 1984, 2008, 2020); //Array function 으로 배열 만들기. (new keyword가 필요.)

// console.log(friends[0]);
// console.log(friends[2]);

// console.log(friends.length);
// console.log(friends[friends.length - 1]); // last element

// friends[2] = "NewFriend_Jay"; // friends variable이 const로 되어있음에도, 변경가능함.(array is not primitive value.)
// console.log(friends[2]);

// // friends = ["Bob", "Alice"]; // Illegal. 배열 전체를 수정하는것음 안됨.
// const firstname = "Dohyun";
// const dohyun = [firstname, "Kim", 2037 - 1995, "SW Engineer", friends];
// console.log(dohyun);

// // Exercise
// const calcAge = function (birthYear) {
//   return 2037 - birthYear;
// };

// const years = [1990, 1967, 2002, 2010, 2018];
// // calcAge(years) -> not work.
// const age1 = calcAge(years[0]);
// const age2 = calcAge(years[1]);
// const age3 = calcAge(years[years.length - 1]);
// console.log(age1, age2, age3);

// const ages = [
//   calcAge(years[0]),
//   calcAge(years[1]),
//   calcAge(years[years.length - 1]),
// ];
// console.log(ages);

// // Do this by for loop.
// const ages_list = [];

// for (i = 0; i < years.length; i++) {
//   ages_list.push(calcAge(years[i]));
// }

// console.log(ages_list);

// //********************Basic Array Operations */
// There are so many array methods. (기본적인 것부터 살펴보자.)
const friends = ["Michael", "Steven", "Peter"];

// Add elements
const newLength = friends.push("Geenba"); // .push method는 배열의 길이를 반환.
console.log(friends);
console.log(newLength);

friends.unshift("John"); // 왼쪽으로 push. first element로 push
console.log(friends);

// Remove elements
const popped = friends.pop(); // Remove last element
console.log(friends);
console.log(popped);

friends.shift(); // Remove first element
console.log(friends);

console.log(friends.indexOf("Steven")); // 요소의 index를 반환.
console.log(friends.indexOf("Bob")); // not in the array. (return -1)

console.log(friends.includes("Peter")); // true if include, false if doesn't include

if (friends.includes("Peter")) {
  console.log("You have a friend called Peter.");
}
