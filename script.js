const cards = document.querySelectorAll('.card');

let isFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
  this.classList.add('flip');

  if (!isFlippedCard) {
    isFlippedCard = true;
    firstCard = this;
    // firstCard.removeEventListener('click', flipCard);
  } else {
    isFlippedCard = false;
    secondCard = this;

    if (firstCard.dataset.card === secondCard.dataset.card) {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      console.log('matching');
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
      }, 1500);
    }
  }
}
cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});
