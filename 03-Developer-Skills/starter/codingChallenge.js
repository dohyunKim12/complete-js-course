"use strict";
// // CC#1
const temps = prompt("Enter 3 temperatures").split(" ").map(Number);

const printForecast = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(`${arr[i]}'C in ${i + 1} days...`);
  }
};

printForecast(temps);
