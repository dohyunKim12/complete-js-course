// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];
// const temperatures2 = [3, -2, -6, -1, 999, 9, 13, 17, 15, 14, 9, 5];

// // 1) Understanding the problem
// // - What is temp amplitude? Answer: difference between highest and lowest temp
// // - How to compute max and min temperatures?
// // - What's a sensor error? And what to do?

// // 2) Breaking up into sub-problems
// // - How to ignore errors?
// // - Find max value in temp array
// // - Find min value in temp array
// // - Subtract min from max(amplitude) and return it

// const calcTempAmplitude = function (temps) {
//   const tmp_list = temps.slice();
//   for (let i = 0; i < tmp_list.length; i++) {
//     if (typeof tmp_list[i] !== "number") {
//       tmp_list.splice(i, 1);
//     }
//   }
//   return Math.max(...tmp_list) - Math.min(...tmp_list);
// };
// const calcTempAmplitude2 = function (temps, temps2) {
//   const tmp_list = temps.concat(temps2);
//   for (let i = 0; i < tmp_list.length; i++) {
//     if (typeof tmp_list[i] !== "number") {
//       tmp_list.splice(i, 1);
//     }
//   }
//   return Math.max(...tmp_list) - Math.min(...tmp_list);
// };

// console.log(calcTempAmplitude([3, 4, 2, 1]));
// console.log(calcTempAmplitude(temperatures));
// console.log(calcTempAmplitude2(temperatures, temperatures2));

// // Problem 2:
// // Function should now receive 2 arrays of temps

// // 1) Understanding the problem
// // - With 2 arrays, should we implement function twice? No! just merge two arrays

// // 2) Breaking up into sub-problems
// // How to merge two arrays?

// // Debugging
// any unexpected error => bug
const measurKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    // C) FIX
    // value: Number(prompt("Degrees celsius: ")),
    value: 10,
  };

  // B) FIND
  console.table(measurement);
  // console.log(measurement);
  // console.warn(measurement);
  // console.error(measurement);

  const kelvin = measurement.value + 273;
  return 0;
};

// A) IDENTIFY THE BUG.
console.log(measurKelvin());

// Using Debugger
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    debugger;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// A) IDENTIFY
console.log(amplitudeBug);
