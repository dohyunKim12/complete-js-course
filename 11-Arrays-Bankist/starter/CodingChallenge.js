'use strict';

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = dogsJulia.slice();
  const dogsKateCopy = dogsKate.slice();

  dogsJuliaCopy.splice(0, 1);
  dogsJuliaCopy.splice(-2);

  const dogs = dogsJuliaCopy.concat(dogsKate);

  dogs.forEach(function (dogAge, i) {
    const isAdult = dogAge >= 3 ? true : false;

    const str = isAdult
      ? `Dog number ${i + 1} is an adult, and is ${dogAge} years old. `
      : `Dog number ${i + 1} is still a puppy `;
    // console.log(str);
  });
};

const calcAverageHumanAge = function (ages) {
  const humanAgesAvg =
    ages
      .map(function (age) {
        return age <= 2 ? 2 * age : 16 + age * 4;
      })
      .filter(age => age >= 18)
      .reduce((prev, cur) => prev + cur, 0) / ages.length;

  return humanAgesAvg;
};

checkDogs([1, 2, 3, 4, 5], [7, 5, 2, 4, 3]);

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// CC #4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => {
  dog.recommandedFood = dog.weight ** 0.75 * 28;
  console.log(dog.recommandedFood);
});

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

if (
  sarahDog.curFood > sarahDog.recommandedFood * 0.9 &&
  sarahDog.curFood < sarahDog.recommandedFood * 1.1
)
  console.log('Nice Sarah!');
else console.log('WTF Sarah!');

// 3
let ownersEatTooMuch = [];
let ownersEatTooLittle = [];

dogs.forEach(dog => {
  if (dog.curFood > dog.recommandedFood * 1.1)
    ownersEatTooMuch.push(dog.owners);
  else if (dog.curFood < dog.recommandedFood * 0.9)
    ownersEatTooLittle.push(dog.owners);
  else;
});
ownersEatTooMuch = ownersEatTooMuch.flat();
ownersEatTooLittle = ownersEatTooLittle.flat();

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4
let str = '';
ownersEatTooMuch.forEach(owner => {
  str += `${owner} and `;
});
str = str.slice(0, -5);
console.log(str + "'s dogs eat too much!");

// 5
dogs.some(dog => {
  if (dog.curFood === dog.recommandedFood) console.log('Exactly!');
});

// 6 , 7
const okayDog = [];
dogs.some(dog => {
  if (
    dog.curFood > dog.recommandedFood * 0.9 &&
    dog.curFood < dog.recommandedFood * 1.1
  ) {
    console.log('Yeah!');
    okayDog.push(dog);
  }
});
console.log(okayDog);
