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

//initialization
let curPlayer = 0;
let currentScore = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

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
    currentScore = 0;
    document.getElementById(`current--${curPlayer}`).textContent = 0;
    curPlayer = curPlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  }
}

btnRoll.addEventListener("click", rollDice);
