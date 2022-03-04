'use strict';

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),

//   registerNewAnswer: function () {
//     let str = `${this.question}\n${this.options.join(
//       '\n'
//     )} \n(Write option number)`;
//     // for (const val of this.options) str += val + '\n';
//     const ans = Number(prompt(str));

//     typeof ans === 'number' && ans < this.ans.length && this.answers[ans]++;

//     this.displayResults('array');
//     this.displayResults('string');
//   },
//   displayResults: function (type = 'array') {
//     if (type === 'array') console.log(this.answers);
//     else if (type === 'string') {
//       let str = `Poll results are ${this.answers.join(', ')}`;
//       console.log(str);
//     } else console.log('nothing..');
//   },
// };

// // Q2
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// // Q5
// const Data1 = {
//   answers: [5, 2, 3],
// };
// const Data2 = {
//   answers: [1, 5, 3, 9, 6, 1],
// };

// poll.displayResults.bind(Data1)();
// poll.displayResults.call({ answers: [5, 2, 3] }); // Same as above
// poll.displayResults.bind(Data2)('string');

// // Coding Challenge
// IIFE (Immediately Invoked Function Expression)
// 즉시 실행 함수 표현.

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  header.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
