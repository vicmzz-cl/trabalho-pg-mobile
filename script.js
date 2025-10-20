const gameBoard = document.getElementById('gameBoard');
let cards = [];
let flippedCards = [];
let matchedCards = 0;

const cardValues = ['🇯🇵', '🇩🇪', '🇬🇷', '🇫🇷', '🇪🇸', '🇮🇹', '🇩🇰', '🇧🇷'];
const allCards = [...cardValues, ...cardValues];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(allCards);
    allCards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards++;

        if (matchedCards === cardValues.length) {
            setTimeout(() => alert('Parabéns! Você venceu!'), 500);
        }

        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedCards = 0;
    createBoard();
}

// Inicializando o jogo
createBoard();
