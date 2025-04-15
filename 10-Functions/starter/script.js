'use strict';

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
};

const displayPoll = function (str) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('poll-container');
  const newHeading = document.createElement('h2');
  newHeading.textContent = str;
  newDiv.appendChild(newHeading);
  // document.querySelector('.container').appendChild(newDiv);
  document
    .querySelector('.container')
    .insertAdjacentElement('afterend', newDiv);
};

const getListedOptions = function () {
  let str = Object.values(poll.options);

  //str.replaceAll(/:/g, '').trim();
  // console.log(str);
  console.log(str[0]);
};
getListedOptions();

displayPoll('Javascript');
/*
const insertPoll = function () {
  const options = poll.options.split;

  const tmp = [...poll.options];

  for (let i = 0; i < 4; ) {
    const pollItem = prompt(
      `What is the #${i + 1} in your poll?`,
      tmp.join(', ')
    );
    i++;

    pollItem = Number(pollItem);

    console.log(typeof pollItem);
    if (typeof pollItem === 'number' && !NaN(pollItem)) {
      if (pollItem >= 0 && pollItem <= 3) {
        console.log('Valid option!');
      }
    }
  }
};
*/
