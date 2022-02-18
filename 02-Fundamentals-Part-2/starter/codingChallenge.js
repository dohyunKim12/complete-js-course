"use strict";
// // CC#1
// // win only double avg score.

// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

// let [dol_score1, dol_score2, dol_score3] = prompt().split(" ").map(Number);
// let [koa_score1, koa_score2, koa_score3] = prompt().split(" ").map(Number);

// console.log(dol_score1);
// console.log(dol_score2);
// console.log(dol_score3);

// const dol_avg = calcAverage(dol_score1, dol_score2, dol_score3);
// const koa_avg = calcAverage(koa_score1, koa_score2, koa_score3);

// const checkWinner = (dol_avg, koa_avg) => {
//   if (dol_avg >= koa_avg * 2) {
//     console.log(`Dolphins win (${dol_avg} vs. ${koa_avg})`);
//   } else if (koa_avg >= dol_avg * 2) {
//     console.log(`Koalas win (${koa_avg} vs. ${dol_avg})`);
//   } else console.log(`Just Draw...`);
// };

// checkWinner(dol_avg, koa_avg);

// // CC#2
// const calcTip = (bill_val) =>
//   bill_val >= 50 && bill_val <= 300 ? bill_val * 0.15 : bill_val * 0.2;

// console.log(calcTip(100));

// const bills = prompt("Input arrs.").split(" ").map(Number);
// console.log(bills);

// const tips = [];
// const total = [];

// for (i = 0; i < bills.length; i++) {
//   tips.push(calcTip(bills[i]));
//   total.push(tips[i] + bills[i]);
// }

// console.log(tips);
// console.log(total);

// // CC#3
// BMI = mass / height ** 2
// const mark = {
//   firstName: "Mark",
//   lastName: "Miller",
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () {
//     this.bmi = (this.mass / this.height ** 2).toFixed(1);
//     return this.bmi;
//   },
// };
// const john = {
//   firstName: "John",
//   lastName: "Smith",
//   mass: 92,
//   height: 1.95,
//   calcBMI: function () {
//     this.bmi = (this.mass / this.height ** 2).toFixed(1);
//     return this.bmi;
//   },
// };
// const higherbmi = mark.bmi > john.bmi ? mark : john;
// const lowerbmi = mark.bmi > john.bmi ? john : mark;
// mark.calcBMI();
// john.calcBMI();

// console.log(
//   `${higherbmi.firstName}'s BMI(${higherbmi.bmi}) is higher than ` +
//     `${lowerbmi.firstName}'s (${lowerbmi.bmi})`
// );

// // CC#4
const bills = [100, 200, 150, 400, 300, 500, 200, 120, 90, 700];
const tips = [];
const totals = [];

const calcTip = (bill_val) =>
  bill_val >= 50 && bill_val <= 300 ? bill_val * 0.15 : bill_val * 0.2;

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(tips[i] + bills[i]);
  console.log(`The total value is ${totals[i]}`);
}

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log(calcAverage(totals));
