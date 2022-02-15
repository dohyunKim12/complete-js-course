// const mass_Mark = 95;
// const height_Mark = 1.88;

// const mass_John = 85;
// const height_John = 1.77;

// let markHigherBMI;

// const bmi_Mark = (mass_Mark / height_Mark ** 2).toFixed(1);
// const bmi_John = (mass_John / height_John ** 2).toFixed(1);

// bmi_Mark > bmi_John ? (markHigherBMI = true) : (markHigherBMI = false);

// console.log(markHigherBMI);

// let HigherPerson;
// let LowerPerson;
// if (markHigherBMI) {
//   HigherPerson = "Mark";
//   LowerPerson = "John";
//   bmiHigher = bmi_Mark;
//   bmiLower = bmi_John;
// } else {
//   HigherPerson = "John";
//   LowerPerson = "Mark";
//   bmiHigher = bmi_John;
//   bmiLower = bmi_Mark;
// }

// console.log(
//   `${HigherPerson}'s BMI ${bmiHigher} is hgiher than ${LowerPerson}'s ${bmiLower}!`
// );

// const score_Dolphins = (97 + 112 + 102) / 3;
// const score_Koalas = (109 + 95 + 123) / 3;

// let winner;

// if (score_Dolphins > score_Koalas) {
//   if (score_Dolphins >= 100) winner = "Dolphins";
//   else winner = "wtf";
// } else if (score_Dolphins < score_Koalas) {
//   if (score_Koalas >= 100) winner = "Koalas";
//   else winner = "wtf";
// } else {
//   if (score_Dolphins >= 100) winner = "draw...";
//   else winner = "what the fuck!!";
// }

// console.log(winner);

// #4
let usual_tip_rate;
let bill_value;

50 <= bill_value && bill_value <= 300
  ? (usual_tip_rate = 0.15)
  : (usual_tip_rate = 0.2);

bill_value = Number(prompt());

const tip = bill_value * usual_tip_rate;
console.log(
  `The bill value is ${bill_value}, and the Tip is ${tip}, Finally the amount you should pay is ${
    bill_value + tip
  }`
);
