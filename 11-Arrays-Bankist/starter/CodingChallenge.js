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
    console.log(str);
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

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
