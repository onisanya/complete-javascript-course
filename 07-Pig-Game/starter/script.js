"use strict";

// select score elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const curScoreP0 = document.getElementById("current--0");
const curScoreP1 = document.getElementById("current--1");

//initialization
let curPlayer = 0;
let currentScore = 0;
let scoreP0 = 0;
let scoreP1 = 0;
const scores = [0, 0];
let gameover = false;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

function resetGame() {
  curPlayer = 0;
  currentScore = 0;
  scoreP0 = 0;
  scoreP1 = 0;
  scores[0] = 0;
  scores[1] = 0;
  gameover = false;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
}

//rolling dice functionality
function rollDice() {
  const value = Math.trunc(Math.random() * 6) + 1;
  console.log(`You've rolled ${value} `);
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${value}.png`;

  if (value !== 1) {
    //add value to current score
    currentScore += value;
    document.getElementById(`current--${curPlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
}
// switch player
function switchPlayer() {
  currentScore = 0;
  console.log(document.getElementById(`current--${curPlayer}`));
  document.getElementById(`current--${curPlayer}`).textContent = 0;
  curPlayer = curPlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  console.log(`Now is playing player ${curPlayer}`);
}

// Hold current score
function holdScore() {
  if (curPlayer === 0) {
    scoreP0 += currentScore;
    player0El.textContent = scoreP0;
    curScoreP0.textContent = 0;
    console.log(player0El.textContent);
  } else if (curPlayer === 1) {
    scoreP1 += currentScore;
    player1El.textContent = scoreP1;
    curScoreP1.textContent = 0;
    console.log(player1El.textContent);
  }
  switchPlayer();
}

function onGameOver() {
  console.log(`Player ${curPlayer} won!!!`);
  player0El.classList.remove("player--active");
  player1El.classList.remove("player--active");
}

btnRoll.addEventListener("click", rollDice);

//btnHold.addEventListener("click", holdScore);

btnHold.addEventListener("click", function () {
  scores[curPlayer] += currentScore;
  document.getElementById(`score--${curPlayer}`).textContent =
    scores[curPlayer];
  if (scores[curPlayer] >= 21) {
    onGameOver();
  } else switchPlayer();
});

btnNewGame.addEventListener("click", resetGame);
