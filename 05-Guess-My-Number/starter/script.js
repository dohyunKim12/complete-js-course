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
const secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;

document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    // Alert that have to input something.
    document.querySelector('.message').textContent = 'T-T! No number!';
  } else if (guess === secretNumber) {
    // correct number should be display.
    document.querySelector('.message').textContent = 'Correct Number!!!';
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Too high!🐱‍🚀';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'You Lost the Game...🚀';
      document.querySelector('.score').textContent = 0;
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Too Low!🐱';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'You Lost the Game...🚀';
      document.querySelector('.score').textContent = 0;
    }
  }
});
