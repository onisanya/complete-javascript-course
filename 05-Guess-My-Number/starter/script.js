'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Lets check!';

// set variables
const secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber, typeof secretNumber);
let highscore = 999;
let score = 20;
function initGame() {
  document.querySelector('.again').style.visibility = 'hidden';
  document.querySelector('.check').style.visibility = 'visible';
  document.querySelector('body').style.backgroundColor = '#35443b';
  document.querySelector('.number').textContent = '?';
}

function onGameEnd() {
  document.querySelector('.again').style.visibility = 'visible';
  document.querySelector('.check').style.visibility = 'hidden';
  if (score < highscore) {
    highscore = score;
  }
  document.querySelector('.highscore').textContent = highscore;
}

function checkGameover() {
  score--;
  if (score < 1) {
    document.querySelector('.message').textContent =
      'Game is over! It was ' + secretNumber;
    //document.querySelector('.check').ariaHidden = true;
    onGameEnd();
    document.querySelector('.number').textContent = secretNumber;
  }
  document.querySelector('.score').textContent = score;
}

function resetGame() {
  score = 20;
  initGame();
}

// show secret number
//document.querySelector('.number').textContent = secretNumber;

// on hit "check" button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  //when no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ Not a number!';
  }
  // when win!!!!!
  else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct number!';
    checkGameover();
    highscore = score;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').style.fontSize = '12rem';
    onGameEnd();
  }
  //when no win
  else if (guess > secretNumber) {
    document.querySelector('.message').textContent = '📈 Too big';
    checkGameover();
  } else if (guess < secretNumber) {
    document.querySelector('.message').textContent = '📉 Too small';
    checkGameover();
  } else if (guess < 1 || guess > 20) {
    document.querySelector('.message').textContent =
      '🚩 Choose between 1 to 20 🚩';
  }
});

document.querySelector('.again').addEventListener('click', function () {
  resetGame();
});
