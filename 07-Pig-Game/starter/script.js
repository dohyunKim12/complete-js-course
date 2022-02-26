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
let player0Score = 0;
let player1Score = 0;
let isPlayer0 = true;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  if (isPlayer0) {
    current0El.textContent = currentScore;
    isPlayer0 = false;
  } else {
    current1El.textContent = currentScore;
    isPlayer0 = true;
  }
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
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
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    let score;
    if (isPlayer0) {
      score = player0Score += currentScore;
      score0El.textContent = score;
    } else {
      score = player1Score += currentScore;
      score1El.textContent = score;
    }
    if (score >= 20) {
      // Game End.
      playing = false;
      diceEl.classList.add('hidden');
      if (isPlayer0) {
        player0.classList.add('player--winner');
        player0.classList.remove('player--active');
      } else {
        player1.classList.add('player--winner');
        player1.classList.remove('player--active');
      }
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  //Reset All.
  playing = true;
  diceEl.classList.add('hidden');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  isPlayer0 = true;
  player0Score = 0;
  player1Score = 0;
  score0El.textContent = 0;
  current0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
});
