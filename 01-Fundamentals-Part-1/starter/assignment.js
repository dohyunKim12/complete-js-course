const country = "Seoul";
const continent = "Asia";
let population = 300000;

const isIsland = false;
const language = "Korean";

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

console.log(population / 2);
console.log((population += 1));

population > 60000 ? console.log("Yes") : console.log("No");

const description = `${country} is in ${continent}, and its ${population} poeple speak ${language}`;
console.log(description);

let stringval;
population >= 330000
  ? (stringval = `${country}'s population is above average`)
  : (stringval = `${country}'s population is 22 million below average`);

console.log(stringval);

console.log("9" - "5"); // 4
console.log("19" - "13" + "17"); // 617
console.log("19" - "13" + 17); //23
console.log("123" < 57); // false
console.log(5 + 6 + "4" + 9 - 4 - 2); //117
