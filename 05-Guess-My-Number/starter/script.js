'use strict';

/*
console.log(document.querySelector('.message'));
// querySelector는 css와 동일하게 요소를 찾을 수 있게 해준다.

console.log(document.querySelector('.message').textContent);
console.log(document.getElementById('firstm').textContent);

document.querySelector('.message').textContent = 'Correct number!!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value = 999;
console.log(document.querySelector('.guess').value); 
*/
let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (msg) {
  document.querySelector('.message').textContent = msg;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    // Alert that have to input something.
    displayMessage('T-T! No number!');
  } else if (guess === secretNumber) {
    // correct number should be display.
    displayMessage('Correct number!!!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#0dd70d';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      guess > secretNumber
        ? displayMessage('Too high!🐱‍🚀')
        : displayMessage('Too Low!🐱');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You Lost the Game...🚀');
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;

  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  displayMessage('Start guessing...');
});
