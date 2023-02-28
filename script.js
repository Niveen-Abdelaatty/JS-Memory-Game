const playerConfigOverlayElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');

const cards = document.querySelectorAll('.card');
const level = document.getElementById('level');
const mediumLvlCards = document.querySelectorAll('.medium');
const startBtn = document.getElementById('start');
const refreshBtn = document.getElementById('refresh');
const scoreElement = document.getElementById('score');
const resultsElement = document.querySelector('.results');

let isFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard, playername;
let matches = 0;
let levelCards;
// let levelCardArray = [];

function levelSelect() {
  const value = level.value;
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

function resetBoard() {
  [isFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function displayLvlCards() {
  const lvl = levelSelect();
  console.log(lvl);
  if (lvl === 'medium') {
    mediumLvlCards.forEach((card) => (card.style.display = 'block'));
  }else{
    mediumLvlCards.forEach((card) => (card.style.display = 'none'));
  }
}
function shuffle() {
  matches = 0;
  scoreElement.textContent = 'Score';
  displayLvlCards();
  openPlayerConfig();
  resetBoard();
  // console.log(cards);
  cards.forEach((card) => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
    let randomOrder = Math.floor(Math.random() * 48);
    card.style.order = randomOrder;
  });
}

function openPlayerConfig() {
  playerConfigOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
}

function whoWins() {
  if (matches === levelCards/2) {
    playerConfigOverlayElement.style.display = 'none';

    resultsElement.style.display = 'block';
    backdropElement.style.display = 'none';

    console.log('you win');
  }
}

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});

level.addEventListener('change', levelSelect);
startBtn.addEventListener('click', shuffle);
refreshBtn.addEventListener('click', shuffle);
