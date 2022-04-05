'use strict';
/* NOTES
//Selects the whole element
console.log(document.querySelector('.message'));

//Selects the text portion of the element only
console.log(document.querySelector('.message').textContent);

//Set text content of an element
document.querySelector('.message').textContent = 'Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

//For an input field you need to get the value not textContent
document.querySelector('.guess').value = 13;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 50) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  // document.querySelector('.left').querySelector('.message').textContent =
  //   message;
  // document.querySelector('.right').querySelector('.message').textContent =
  //   message;
  const messages = document.querySelectorAll('.message');
  messages.forEach(msg => {
    msg.textContent = message;
  });
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
  document.querySelector('.score').style.color = '#FFA500';
};

const displayNumber = function (number, width) {
  document.querySelector('.number').textContent = number;
  document.querySelector('.number').style.width = width;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //   console.log(guess, typeof guess);

  //If no number is entered
  if (!guess) {
    displayMessage('❌ No number!');
  }
  //If player wins
  else if (guess === secretNumber && score >= 1) {
    document.querySelector('body').style.backgroundColor = '#60b347';
    displayMessage('🎉 Correct Number!');
    displayNumber(secretNumber, '30rem');
    if (highscore < score) {
      document.querySelector('.highscore').textContent = score;
      highscore = score;
    }
  } //Gues is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High' : '📉 Too Low');
      score--;
      displayScore(score);
      /*alternative method to decrease score
        document.querySelector('.score').textContent =
          document.querySelector('.score').textContent - 1;*/
    } else {
      displayMessage('💥 Game Over!');
      displayScore(0);
    }
  }
});

const newGames = document.querySelectorAll('.again');

newGames.forEach(newGame => {
  newGame.addEventListener('click', function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 50) + 1;
    displayScore(score);
    document.querySelector('.score').style.color = '#fff';
    displayMessage('Start guessing...');
    displayNumber('?', '15rem');
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.guess').value = '';
  });
});

/* Longer Method
  //If guess is too low
  else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too Low';
      score--;
      document.querySelector('.score').textContent = score;
    // alternative method to decrease score
    // document.querySelector('.score').textContent =
    // document.querySelector('.score').textContent - 1;
    } else {
      document.querySelector('.message').textContent = '💥 Game Over!';
      document.querySelector('.score').textContent = 0;
    }
  }
  // When guess is too high
  else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Too High';
      score--;
      document.querySelector('.score').textContent = score;
    // alternative method to decrease score
    // document.querySelector('.score').textContent =
    // document.querySelector('.score').textContent - 1;
    } else {
      document.querySelector('.message').textContent = '💥 Game Over!';
      document.querySelector('.score').textContent = 0;
    }
  } */
