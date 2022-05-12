'use strict';

const budget = Object.freeze([
  // Not deep freeze, only shallow freeze
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freentryancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  // make immutable
  jonas: 1500,
  matilda: 100,
  dohyun: 2000,
});

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
// Use optional chaining
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function :D
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'dohyun'
) {
  // if (!user) user = 'jonas'; // change to default parameter
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
console.log(newBudget1);
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  10,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget); // chain of addExpense

// Impure function
const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';

  // output = output.slice(0, -2); // Remove last '/'
  // console.log(output);
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');

  console.log(bigExpenses);
};

logBigExpenses(finalBudget, 100);

//////////////////////////////////////
// Imperative vs Declarative way

// Imperative
// How to do things. need to explain every single step.
// Example: step-by-step recipe of a cake

// Declarative
// Programmer tells "Waht to do"
// simply describe the way the computer should achieve the result
// the HOW

// Functional Programming
// 기본적으로 Declarative programming임.
// Based on the idea of writing sw by combining many pure functions, avoiding side effects and mutating data

// Side effect: Modification (mutation) of any data outside of the function
// Pure function: function without side effects.
