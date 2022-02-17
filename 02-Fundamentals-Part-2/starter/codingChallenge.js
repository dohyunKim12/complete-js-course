// win only double avg score.

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

let [dol_score1, dol_score2, dol_score3] = prompt().split(" ").map(Number);
let [koa_score1, koa_score2, koa_score3] = prompt().split(" ").map(Number);

console.log(dol_score1);
console.log(dol_score2);
console.log(dol_score3);

const dol_avg = calcAverage(dol_score1, dol_score2, dol_score3);
const koa_avg = calcAverage(koa_score1, koa_score2, koa_score3);

const checkWinner = (dol_avg, koa_avg) => {
  if (dol_avg >= koa_avg * 2) {
    console.log(`Dolphins win (${dol_avg} vs. ${koa_avg})`);
  } else if (koa_avg >= dol_avg * 2) {
    console.log(`Koalas win (${koa_avg} vs. ${dol_avg})`);
  } else console.log(`Just Draw...`);
};

checkWinner(dol_avg, koa_avg);
