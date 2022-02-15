// let js = 'amazing';

// console.log(40 + 8 + 23 - 10);

// console.log('Jonas');
// console.log(23);

// let firstName = 'Matilda'; //declaring varliable

// console.log(firstName);
// console.log(firstName);
// console.log(firstName);

// //let 3years = 'blah'  // Occur Err. (Syntax err)

// // Cannot naming variable like this
// // let 3years = 3;
// // let new = 27;
// // let function = 27;
// // let Person = 'jonas';  -> let person (lower case)

// let PI = 3.1415;

// let myFirstJob = 'Programmer';
// let myCurrentJob = 'Teacher';

// let job1 = 'programmer';
// let job2 = 'teacher';

// console.log(myFirstJob);

// //ASSIGNMENT
// let country = 'Seoul';
// let continent = 'YeokSam';
// let population = 30000;

// console.log(country);
// console.log(continent);
// console.log(population);

/////////////////////////
//Data Types
// let javascriptIsFun = true;
// console.log(javascriptIsFun);

// console.log(typeof true); //typeof 는 + 나 - 와 같은 연산자일 뿐이다. type을 반환함.
// console.log(typeof javascriptIsFun);
// console.log(typeof 'Dohyun');
// console.log(typeof 23);

// javascriptIsFun = 'fuck'; //재할당. (without let선언)
// console.log(javascriptIsFun);

// let year; //Undefined
// console.log(year);
// console.log(typeof year);

// year = 1991;
// console.log(typeof year);

// console.log(typeof null); //error. typeof null 은 null을 반환해야 함. object 아님.

////////////////////////
//let , const and var
// let age = 30;
// age = 31; // mutate variable

// const birthYear = 1995;
// //birthYear = 1990; // occur err! immutable variable
// // const job; //illegal (without initial value)

// // 나중에 변하지 않을 값은 무조건 const 를 사용할것. (default로 const 를 사용한다는 mind)
// // var는 절대 쓰지 말 것.

// lastName = "Kim"; // terrible!
// console.log(lastName);

////////////////////////
// Basic Operators

// const now = 2037;
// const ageDohyun = now - 1995;
// const ageSarah = now - 2018;
// console.log(ageDohyun, ageSarah);

// console.log(ageDohyun * 2, ageDohyun / 10, 2 ** 3);
// // 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

// const firstName = "Dohyun";
// const lastName = "Kim";
// console.log(firstName + " " + lastName);

// let x = 10 + 5;
// x += 10; // x = x + 10 == 25
// x *= 4; // x = x * 4 == 1000
// x++; // x = x + 1
// x--;
// x--;
// console.log(x);

// // comparison operator
// console.log(ageDohyun > ageSarah); // >, <, >=, <-
// console.log(ageDohyun >= 18);

// const isFullAge = ageSarah >= 18;

// console.log(now - 1995 > now - 2018);

// const firstName = "Dohyun";
// const job = "developer";
// const birthYear = 1995;
// const year = 2022;

// const dohyun =
//   "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "!";

// console.log(dohyun);

// //Template literal
// const dohyunNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
// console.log(dohyunNew);
// // 그냥 문자열 사용시 quote 대신 backtick만을 쓰는것도 괜찮음.

// console.log(`String with
// dodo`);

/////////////////////////////
// if/ else statement
// const age = 15;
// const isOldEnough = age >= 18;

// if (isOldEnough) {
//   console.log("Sarah can start driving license");
// } else {
//   const yearsLeft = 18 - age;
//   console.log(`Sarah is too young. Wait another ${yearsLeft} years`);
// }

// const birthYear = 1995;
// let centry;
// if (birthYear <= 2000) {
//   centry = 20;
// } else {
//   centry = 21;
// }
// console.log(centry);

/////////////////////////////
//TYPE Conversion and Coercion
// // Type Coercion은 javascript가 자동으로 type을 변경하는 것. (자동형변환)
// const inputYear = "1995";
// console.log(inputYear + 18); //concatnate as string
// console.log(Number(inputYear) + 18); //right way. (Type Conversion)

// console.log(Number("Dohyun")); //Nan(Not a number (invalid number))
// console.log(typeof NaN);

// console.log(String(23)); //number to string
// console.log(23);

// //Type Coercion
// console.log("I am " + 23 + " years old"); // Type Coercion (number to string)
// // 문자열과 '+' 연산자 사이에 숫자가 있으면 자동으로 문자열로 형변환.
// console.log("23" - "10" - 3); // Type Coercion (String to number) '-'연산자가
// // 문자열을 숫자로 자동형변환 유발.
// console.log("23" * "2"); // * 연산자도 마찬가지.

// let n = "1" + 1; //string 11
// n = n - 1;
// console.log(n);

// Falsy values: 0, '', undefined, null, NaN

// console.log(Boolean(0));
// console.log(Boolean(undefined));
// console.log(Boolean("Dohyun"));
// console.log(Boolean(""));
// console.log(Boolean({}));

// const money = 0;
// if (money) {
//   console.log(`Don't spend it all`);
// } else {
//   console.log(`You Shoud get a job!`);
// }

// let height = 0;
// if (height) {
//   console.log("YAY! Height is defined");
// } else {
//   console.log("Height is Undefined"); //(falsy value)
// }

// height = 100;

// Equality Operators
// const age = 18;
// if (age === 18) console.log("You just became an adult");

// if (age == 18) console.log("You just became an adult (loose)");
// // avoid loose complarison operator as you can

// const favourite = Number(prompt("What's your favourite number?"));

// console.log(favourite);
// console.log(typeof favourite);

// if (favourite === 23) {
//   console.log("Cool! 23 is an amazing number!");
// } else {
//   console.log("Number is not 23");
// }

// if (favourite !== 23) {
//   console.log("Why not 23?");
// }

// Boolean Logic

// const hasDriversLicesnse = true;
// const hasGoodVision = true;

// console.log(hasDriversLicesnse && hasGoodVision);
// console.log(hasDriversLicesnse || hasGoodVision);
// console.log(!hasDriversLicesnse);

// const shouldDrive = hasDriversLicesnse && hasGoodVision;

// if (shouldDrive) {
//   console.log("Sarah is able to drive");
// } else {
//   console.log("Someone else should Drive...");
// }

// const isTired = false;
// console.log(hasDriversLicesnse && hasGoodVision && isTired);

// Switch statement
// const day = "saturdai";

// switch (day) {
//   case "monday": // day === 'monday' strict comparison
//     console.log("fucking monday");
//     break;
//   case "tuesday":
//     console.log("wow tuesday!");
//     break;
//   case "wednesday":
//     console.log("wow wed!");
//     break;
//   case "thursday":
//     console.log("wow thurs!");
//     break;
//   case "friday":
//     console.log("wow fry!");
//     break;
//   case "saturday":
//     console.log("wow sat!");
//     break;
//   case "sunday":
//     console.log("wow sun!");
//     break;
//   default:
//     console.log("what the fuck?");
// }

// 3 + 4;
// 1995;
// true && false && !false;

// if (23 > 10) {
//   const str = "23 is bigger";
// }

// console.log(`I'm ${2037 - 1995} years old. `);

// // Conditional Operator
// let wishNow = prompt();
// console.log(`I would like to ${wishNow ? "sleep." : "no Idea at all."}`);
