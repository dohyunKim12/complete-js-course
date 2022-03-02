'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, 'Substitution'],
  [47, '⚽ GOAL'],
  [61, 'Substitution'],
  [64, '🔸Yellow card'],
  [69, 'Red card'],
  [70, 'Substitution'],
  [72, 'Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, 'Yellow card'],
]);

// CC #4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const convertStr = function () {
  const statement = document.querySelector('textarea').value;
  const strAry = statement.split('\n');

  let resStr = '';
  for (const str of strAry) {
    let res = str.trim().toLowerCase();
    let idx = res.indexOf('_');
    if (res.includes('_'))
      res =
        res.slice(0, idx) +
        res.slice(idx + 1)[0].toUpperCase() +
        res.slice(idx + 2);
    resStr += res + '\n';
  }

  document.querySelector('textarea').value = resStr;

  return;
};

document.querySelector('button').addEventListener('click', convertStr);

console.log(convertStr('underscore_case'));
console.log(convertStr(' first_name'));
console.log(convertStr('Some_Variable'));
console.log(convertStr(' calculate_AGE'));
console.log(convertStr('delayed_departure'));

// //Q1
// const events = [...new Set([...gameEvents.values()])];
// console.log(events);

// //Q2
// gameEvents.delete(64);
// console.log(gameEvents);

// //Q3
// let min = 0;
// for (const time of gameEvents.keys()) {
//   min += time;
// }
// min = Math.floor(min / 90);
// console.log(`An event happend, on avg every ${min} minuates`);

// //Q4
// for (const [key, val] of gameEvents) {
//   let str = '';
//   key <= 45 ? (str = '[FIRST HALF]') : (str = '[SECOND HALF]');
//   console.log(`${str} ${key} : ${val}`);
// }

// const [players1, players2] = game.players;
// const [gk, ...fieldPlayers] = players1;
// const allPlayers = [...players1, ...players2];
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// const team1 = game.odds.team1;
// const draw = game.odds.x;
// const team2 = game.odds.team2;

// const printGoals = function (...players) {
//   for (let i = 0; i < players.length; i++) {
//     let goals = 0;
//     for (let j = 0; j < game.scored.length; j++) {
//       if (game.scored[j] === players[i]) goals++;
//     }
//     console.log(`${players[i]} got ${goals} goals!!`);
//   }
// };

//CodingChallenge #3

// // Q1
// for (const [idx, val] of game.scored.entries()) {
//   console.log(`Goal ${idx + 1} : ${val}`);
// }

// // Q2
// let sum = 0;
// for (const val of Object.values(game.odds)) {
//   sum += val;
// }
// console.log(sum / Object.keys(game.odds).length);

// // Q3
// console.log(Object.entries(game.odds));
// for (const [key, val] of Object.entries(game.odds)) {
//   let str = game[key] ? 'victory ' : '';
//   str += game[key] ?? 'draw';
//   console.log(str);

//   console.log(`Odd of ${str}: ${val}`);
// }

// Q4
// const scorers = {};
// for (const val of game.scored) {
//   scorers?.[val] ? scorers[val]++ : (scorers[val] = 1);
// }
// console.log(scorers);

// team1 < team2 && console.log('team1');
// team1 > team2 && console.log('team2');

///////////////
// console.log(players1);
// console.log(players2);
// console.log(gk);
// console.log(fieldPlayers);
// console.log(allPlayers);
// console.log(players1Final);
// console.log(team1);
// printGoals('mumu', 'fucky', 'Hakimi', 'Lewandowski', 'Gnarby');
