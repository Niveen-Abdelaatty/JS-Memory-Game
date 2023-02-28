const playerConfigOverlayElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');
const cards = document.querySelectorAll('.card');
const level = document.getElementById('level');
const mediumLvlCards = document.querySelectorAll('.medium');
const startBtn = document.getElementById('start');
const refreshBtn = document.getElementById('refresh');
const timerBtn = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const resultsElement = document.querySelector('.results');
const loseElement = document.querySelector('.lose');

let isFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard, playername;
let seconds = 0, minutes = 0;
let levelCards, value;
let matches = 0;
let interval;

// let levelCardArray = [];

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //Format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;

  timerBtn.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;

  if (value === 'easy' && seconds === 5 || value === 'medium' && seconds === 15) {
    playerConfigOverlayElement.style.display = 'none';
    loseElement.style.display = 'block';
    backdropElement.style.display = 'none';
  }
};

function levelSelect() {
  value = level.value;
  if (value === 'easy') {
    levelCards = 16;
  } else if (value === 'medium') {
    levelCards = 32;
  } else {
    levelCards = 48;
  }
  return value;
}

function flipCard() {
  if (lockBoard) return;

  this.classList.add('flip');

  if (!isFlippedCard) {
    isFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  cardsMatching();
  whoWins();
}

const cardsMatching = () => {
  const isMatch = firstCard.dataset.card === secondCard.dataset.card;
  if (isMatch) {
    disableCard();
    matches++;
    scoreElement.textContent = matches;
  } else {
    unflipCards();
  }
};

const disableCard = () => {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
};

const unflipCards = () => {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
};

const resetBoard = () => {
  [isFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

const displayLvlCards = () => {
  const lvl = levelSelect();
  console.log(lvl);
  if (lvl === 'medium') {
    mediumLvlCards.forEach((card) => (card.style.display = 'block'));
  } else {
    mediumLvlCards.forEach((card) => (card.style.display = 'none'));
  }
};

const shuffle = () => {
  [matches, seconds, minutes] = [0, 0, 0];

  scoreElement.textContent = 'Score';

  interval = setInterval(timeGenerator, 1000);

  displayLvlCards();
  openPlayerConfig();
  resetBoard();

  cards.forEach((card) => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
    let randomOrder = Math.floor(Math.random() * 48);
    card.style.order = randomOrder;
  });
};

const openPlayerConfig = () => {
  playerConfigOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
};

const whoWins = () => {
  if (matches === levelCards / 2) {
    clearInterval(interval);

    playerConfigOverlayElement.style.display = 'none';

    resultsElement.style.display = 'block';
    backdropElement.style.display = 'none';

    console.log('you win');
  }
};

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});

const refresh = () => {
  clearInterval(interval);
  [seconds, minutes] = [0, 0];

  shuffle();
};

level.addEventListener('change', levelSelect);
startBtn.addEventListener('click', shuffle);
refreshBtn.addEventListener('click', refresh);
