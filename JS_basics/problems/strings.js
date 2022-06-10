// 1. Calculate Average Score Based on User Inputs
// can assume input values are integers
const NUMBER_OF_SCORES = 3;
let total = 0;
let count = 1;

do {
  let string = 'Enter Score ' + String(count) + ':';
  let score = prompt(string);
  let numScore = Number(score);

  if (numScore > 0) {
    total += numScore;
    count += 1;
  } else {
    alert('Please enter your score again with a valid positive integer.')
  }

} while (count < 4);

let avg = total / 3;

function findGrade(avgScore) {
  if (avgScore >= 90) {
    return '"A".';
  } else if (avgScore >= 70) {
    return '"B".';
  } else if (avgScore >= 50) {
    return '"C".';
  } else {
    return '"F".';
  }
}

let MSG_1 = 'Based on the average of your 3 scores your letter grade is '
console.log(MSG_1 + findGrade(avg));