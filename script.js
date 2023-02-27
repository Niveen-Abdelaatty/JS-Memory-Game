const cards = document.querySelectorAll('.card');
const startBtn = document.getElementById('start');

let isFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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
}

const cardsMatching = () => {
  const isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCard() : unflipCards();
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
  resetBoard();
  cards.forEach((card) => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
    let randomOrder = Math.floor(Math.random() * 16);
    card.style.order = randomOrder;
  });
}

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});

startBtn.addEventListener('click', shuffle);
