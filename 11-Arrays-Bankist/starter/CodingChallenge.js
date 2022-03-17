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

checkDogs([1, 2, 3, 4, 5], [7, 5, 2, 4, 3]);
