const board = document.getElementById('game-board');

// Cartas e suas imagens
const cardsArray = [
    'Paris', 'Lyon',
    'Madrid', 'Barcelona',
    'São Paulo', 'Belo Horizonte',
    'Roma', 'Turim',
    'Atenas', 'Santorini',
    'Acapulco', 'Cancún',
    'Toronto', 'Vancouver',
    'Sydney', 'Perth',
];

// Embaralhar as cartas
function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]; // Troca
    }
}

let flippedCards = [];
let matchedCards = [];

function createBoard() {
    shuffle(cardsArray);
    cardsArray.forEach((cardValue, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = cardValue;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    flippedCards = [];

    if (matchedCards.length === cardsArray.length) {
        setTimeout(() => alert('Parabéns! Você venceu!'), 500);
    }
}

createBoard();
