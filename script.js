const playerConfigOverlayElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');

const cards = document.querySelectorAll('.card');
const startBtn = document.getElementById('start');

const scoreElement = document.getElementById('score');
const resultsElement = document.querySelector('.results');

let isFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard, playername;
let matches = 0;
let levelCards = 8;

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

function shuffle() {
  openPlayerConfig();
  resetBoard();
  cards.forEach((card) => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
    let randomOrder = Math.floor(Math.random() * 16);
    card.style.order = randomOrder;
  });
}

function openPlayerConfig() {
  playerConfigOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
}

function whoWins() {
  if (matches === levelCards) {
    playerConfigOverlayElement.style.display = 'none';

    resultsElement.style.display = 'block';
    backdropElement.style.display = 'block';

    console.log('you win');
  }
}

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});

startBtn.addEventListener('click', shuffle);
