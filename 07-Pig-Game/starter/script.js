'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // work same!!(littlebit faster than querySelector)
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let isPlayer0Score = 0;
let player1Score = 0;
let isPlayer0 = true;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //1. Generate random dice roll.
  const dice = Math.floor(Math.random() * 6) + 1;
  //2. Display the dice.
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  //3. Check if dice === 1, if true, switch player.
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    isPlayer0
      ? (current0El.textContent = currentScore)
      : (current1El.textContent = currentScore);
  } else {
    //Switch player
    currentScore = 0;
    if (isPlayer0) {
      current0El.textContent = currentScore;
      isPlayer0 = false;
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    } else {
      current1El.textContent = currentScore;
      isPlayer0 = true;
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  isPlayer0
    ? (score0El.textContent = isPlayer0Score += currentScore)
    : (score1El.textContent = player1Score += currentScore);

  //Switch player
  currentScore = 0;
  if (isPlayer0) {
    current0El.textContent = currentScore;
    isPlayer0 = false;
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    current1El.textContent = currentScore;
    isPlayer0 = true;
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
});
